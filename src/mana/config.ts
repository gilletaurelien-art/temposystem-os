/**
 * « Se connecter avec MANA » sur temposystem.fr — config du monde consommateur.
 *
 * PASSPORT_ORIGIN = l'autorité d'identité (Passeport MANA). Aujourd'hui servie
 * par l'app France sur mana.bzh/passeport ; pointera sur id.manahome.org via
 * VITE_PASSPORT_ORIGIN dès que le domaine sera actif.
 */
export const PASSPORT_ORIGIN: string =
  ((import.meta.env.VITE_PASSPORT_ORIGIN as string) || 'https://mana.bzh').replace(/\/$/, '');
