/**
 * La landing es un sitio estatico, pero ademas atiende los enlaces de los
 * comprobantes que el POS manda por WhatsApp:
 *
 *     https://sellalles.com/michelle-autoservices/c/7Kq2Wp
 *
 * El primer segmento es el nombre del negocio y sirve para que el cliente vea
 * de quien es el comprobante antes de abrirlo; no se usa para resolver nada.
 * El secreto es el codigo, y quien lo canjea es la Edge Function `c`, que
 * comprueba el vencimiento y redirige al PDF firmado.
 *
 * Va en este dominio y no en el de Supabase por confianza: al cliente le llega
 * un enlace por WhatsApp pidiendole que descargue un archivo, y
 * `qwpjclqinruhtxgkrxwr.supabase.co` parece cualquier cosa menos su ferreteria.
 */
const RESOLUTOR = 'https://qwpjclqinruhtxgkrxwr.supabase.co/functions/v1/c/';

export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }): Promise<Response> {
    const { pathname } = new URL(request.url);
    const partes = pathname.split('/').filter(Boolean);

    // Solo /<algo>/c/<codigo>. Exigir que el segundo segmento sea exactamente
    // "c" evita chocar con cualquier pagina que tenga la landing ahora o
    // despues: /precios, /blog/lo-que-sea, etc. siguen yendo a los archivos.
    const esComprobante = partes.length === 3 && partes[1] === 'c';
    if (!esComprobante) return env.ASSETS.fetch(request);

    try {
      // redirect: 'manual' para reenviar el 302 tal cual y que sea el navegador
      // del cliente quien vaya a Storage, en vez de descargar el PDF aqui y
      // pagarlo dos veces.
      return await fetch(RESOLUTOR + encodeURIComponent(partes[2]), {
        redirect: 'manual',
      });
    } catch (e) {
      // Si Supabase no responde, la landing no se cae con ella.
      console.error('comprobante:', e instanceof Error ? e.message : String(e));
      return new Response(
        'No se pudo abrir el comprobante en este momento. Intentalo de nuevo en unos minutos.',
        { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      );
    }
  },
};
