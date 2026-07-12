/**
 * « Se connecter avec MANA » — module CONSOMMATEUR (Passeport §4), porté sur
 * temposystem.fr. Copié du patron de référence de manafrance-app
 * (src/passport/manaAuth.ts) ; seuls les 2 imports locaux changent (client +
 * config). Motif : « logique portable, présentation locale ».
 */
import { supabase } from './client';
import { PASSPORT_ORIGIN } from './config';

const AUTHORIZE_PATH = '/passeport';

/** Redirige vers l'autorité d'identité. `returnTo` = où revenir (défaut : ici). */
export function signInWithMana(returnTo: string = window.location.href): void {
  const url = `${PASSPORT_ORIGIN}${AUTHORIZE_PATH}?return=${encodeURIComponent(returnTo)}`;
  window.location.assign(url);
}

/**
 * À appeler au chargement de la page de retour. Si l'autorité a renvoyé une
 * session (jetons dans le fragment), l'établit puis efface les jetons de l'URL.
 * Renvoie true si une session a été posée.
 */
export async function completeManaSignIn(): Promise<boolean> {
  const raw = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
  if (!raw) return false;
  const p = new URLSearchParams(raw);
  const access_token = p.get('access_token');
  const refresh_token = p.get('refresh_token');
  if (!access_token || !refresh_token) return false;

  const { error } = await supabase.auth.setSession({ access_token, refresh_token });
  history.replaceState(null, '', window.location.pathname + window.location.search);
  return !error;
}

export interface ManaPassport {
  mana_id: string;
  handle: string;
  display_name: string | null;
  avatar_url: string | null;
  locale: string | null;
  trust_tier: 'inscrit' | 'verifie' | 'certifie';
}

/** Le passeport (claims) de la session courante, ou null si non connecté. */
export async function getManaPassport(): Promise<ManaPassport | null> {
  const { data } = await supabase.rpc('passport_me');
  const row = Array.isArray(data) ? data[0] : data;
  return (row as ManaPassport) ?? null;
}
