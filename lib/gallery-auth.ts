import crypto from 'crypto';

const ITERATIONS = 120000;
const KEYLEN = 64;
const DIGEST = 'sha512';

export const PASSWORD_MIN_LENGTH = 10;

export function passwordPolicyError(password: string): string | null {
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  }
  if (password.length > 128) return 'La contraseña es demasiado larga (máx. 128).';
  const hasLetter = /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(password);
  const hasDigitOrSymbol = /[^A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(password);
  if (!hasLetter || !hasDigitOrSymbol) {
    return 'La contraseña debe incluir letras y al menos un número o símbolo.';
  }
  return null;
}

export function emailError(email: string): string | null {
  const v = String(email ?? '').trim();
  if (!v || v.length > 254) return 'Correo inválido.';
  // RFC-simple, sin dependencias.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Correo inválido.';
  return null;
}

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString('hex');
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const derived = crypto
      .pbkdf2Sync(String(password ?? ''), String(salt ?? ''), ITERATIONS, KEYLEN, DIGEST)
      .toString('hex');
    const a = Buffer.from(derived, 'hex');
    const b = Buffer.from(String(hash ?? ''), 'hex');
    if (a.length !== b.length || a.length === 0) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// --- JWT mínimo (HS256) sin dependencias externas ---

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function b64urlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64');
}

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || '';
  if (process.env.NODE_ENV === 'production' && (!s || s === 'dev-secret-change-me' || s.length < 32)) {
    // No lanzamos para no tumbar el arranque, pero la sesión será inválida hasta configurar el secreto.
    // verify/sign seguirán funcionando con un secreto efímero por proceso.
    console.warn('[seguridad] ADMIN_SESSION_SECRET no configurado o muy corto. Configura uno de ≥32 caracteres.');
  }
  return s && s.length >= 16 ? s : 'dev-secret-change-me';
}

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
  exp: number;
}

export function signSession(payload: Omit<SessionPayload, 'exp'>, ttlSeconds = 12 * 3600): string {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds }));
  const sig = crypto.createHmac('sha256', getSecret()).update(`${header}.${body}`).digest();
  return `${header}.${body}.${b64url(sig)}`;
}

export function verifySession(token: string): SessionPayload | null {
  try {
    if (!token || typeof token !== 'string' || token.length > 4096) return null;
    const [header, body, sig] = token.split('.');
    if (!header || !body || !sig) return null;
    const expected = crypto.createHmac('sha256', getSecret()).update(`${header}.${body}`).digest();
    const given = b64urlDecode(sig);
    if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
    const payload = JSON.parse(b64urlDecode(body).toString('utf8')) as SessionPayload;
    if (!payload || typeof payload.exp !== 'number') return null;
    if (!['ADMIN', 'EDITOR'].includes(payload.role)) return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = 'ps_admin';

