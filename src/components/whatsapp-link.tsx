'use client';

import { useEffect, useState, type ReactNode } from 'react';

// La landing es un export estático (next.config.ts → output: 'export'), así que
// no puede resolver el número en el servidor. Se renderiza con el valor por
// defecto horneado en el HTML — nunca hay un botón sin destino — y al montar se
// consulta platform_settings para tomar el número vigente. Cambiar el número
// desde Configuración de la Plataforma no requiere redesplegar la landing.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Mismo valor que la semilla de platform_settings. */
const FALLBACK_NUMBER = '18299333226';

interface WhatsAppLinkProps {
  message: string;
  className?: string;
  children: ReactNode;
}

export function WhatsAppLink({ message, className, children }: WhatsAppLinkProps) {
  const [number, setNumber] = useState(FALLBACK_NUMBER);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
    let cancelled = false;

    fetch(
      `${SUPABASE_URL}/rest/v1/platform_settings?select=support_whatsapp_enabled,support_whatsapp_number&limit=1`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } },
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((rows) => {
        if (cancelled || !Array.isArray(rows) || rows.length === 0) return;
        const row = rows[0];
        if (typeof row.support_whatsapp_number === 'string' && row.support_whatsapp_number) {
          setNumber(row.support_whatsapp_number);
        }
        setEnabled(row.support_whatsapp_enabled !== false);
      })
      // Si falla, se queda el valor por defecto: preferible el número viejo a
      // ningún botón.
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  if (!enabled) return null;

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
