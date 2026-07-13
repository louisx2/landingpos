'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Loader2, Copy, Check, X, PlayCircle } from 'lucide-react';

interface DemoResult {
  email: string;
  password: string;
  companyName: string;
  expiresAt: string;
}

declare global {
  interface Window {
    onTurnstileVerified?: (token: string) => void;
    turnstile?: { reset: (widgetId?: string) => void };
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ProbarPlataforma({ posUrl }: { posUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [copied, setCopied] = useState<'email' | 'password' | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.onTurnstileVerified = (token: string) => setTurnstileToken(token);
    return () => {
      delete window.onTurnstileVerified;
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTurnstileToken(null);
    setError(null);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!turnstileToken || !SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/demo-provision`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ turnstileToken }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data?.error ?? 'No se pudo generar el acceso de prueba.');
        window.turnstile?.reset();
        setTurnstileToken(null);
        return;
      }
      setResult(data);
    } catch {
      setError('No se pudo conectar con el servidor. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const copy = (value: string, field: 'email' | 'password') => {
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  };

  const expiresLabel = result
    ? new Date(result.expiresAt).toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-medium hover:bg-gray-50 transition-colors"
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        Probar Plataforma
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            {!result ? (
              <>
                <h3 className="text-xl font-bold mb-2">Prueba SellAlleS gratis</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Te generamos una empresa de prueba con datos de ejemplo, lista para
                  usar. Se borra sola en 2 horas.
                </p>

                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
                {TURNSTILE_SITE_KEY ? (
                  <div
                    ref={widgetRef}
                    className="cf-turnstile mb-4"
                    data-sitekey={TURNSTILE_SITE_KEY}
                    data-callback="onTurnstileVerified"
                  />
                ) : (
                  <p className="text-xs text-amber-600 mb-4">
                    Verificación anti-bots no configurada (falta NEXT_PUBLIC_TURNSTILE_SITE_KEY).
                  </p>
                )}

                {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

                <button
                  onClick={handleGenerate}
                  disabled={!turnstileToken || loading}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-white shadow hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Generar acceso de prueba
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2">¡Listo, {result.companyName}!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Esta cuenta y sus datos se borran automáticamente a las{' '}
                  <strong>{expiresLabel}</strong> (2 horas). Inicia sesión con:
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                    <span className="text-sm font-mono truncate">{result.email}</span>
                    <button onClick={() => copy(result.email, 'email')} className="text-gray-400 hover:text-primary shrink-0 ml-2">
                      {copied === 'email' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                    <span className="text-sm font-mono truncate">{result.password}</span>
                    <button onClick={() => copy(result.password, 'password')} className="text-gray-400 hover:text-primary shrink-0 ml-2">
                      {copied === 'password' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <a
                  href={`${posUrl}/login`}
                  className="block w-full text-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-white shadow hover:bg-accent-hover transition-colors"
                >
                  Iniciar sesión
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
