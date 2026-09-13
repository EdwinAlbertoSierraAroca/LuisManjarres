// Rate-limit en memoria (por proceso) para endpoints sensibles como /api/admin/login.
// En producción multi-instancia se recomienda Redis/KV; aquí evita fuerza bruta básica.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cur = buckets.get(key);
  if (!cur || cur.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  cur.count += 1;
  if (cur.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((cur.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

export function clientKey(req: Request): string {
  const xf = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return xf || 'unknown';
}
