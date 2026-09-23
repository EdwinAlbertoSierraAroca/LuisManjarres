import { NextResponse } from 'next/server';

/** Envuelve un handler de API para que cualquier error devuelva JSON con el motivo (en vez de un 500 vacío). */
export function withApiErrors<A extends unknown[]>(
  handler: (...args: A) => Promise<Response>
): (...args: A) => Promise<Response> {
  return async (...args: A) => {
    try {
      return await handler(...args);
    } catch (e) {
      console.error('[api] Error no controlado:', e);
      const message = e instanceof Error ? e.message : 'Error interno del servidor.';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  };
}
