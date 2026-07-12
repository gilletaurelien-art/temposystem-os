import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase pointé sur le projet DU PASSEPORT (base France, qikris…).
 * Indispensable : c'est ce projet qui a émis la session — on ne peut la poser
 * (setSession) et lire les claims (passport_me) que contre le MÊME projet.
 * La clé anon est publique. Un jour où temposystem aurait sa propre base, il
 * faudrait Third-Party Auth (JWKS). Client DÉDIÉ au passeport, distinct de la
 * config supabase de l'OS (src/lib/supabase.ts).
 */
const url =
  (import.meta.env.VITE_PASSPORT_SUPABASE_URL as string) ||
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://qikrisvfxiuqwskkznkd.supabase.co';
const anon =
  (import.meta.env.VITE_PASSPORT_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpa3Jpc3ZmeGl1cXdza2t6bmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNDQ1ODIsImV4cCI6MjA5NjYyMDU4Mn0.qXhI2CukSdYsnGbchm1Q7UfY_QaAafk9-hDX_xnY6EE';

export const supabase = createClient(url, anon);
