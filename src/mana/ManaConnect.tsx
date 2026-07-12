import { useEffect, useState, type CSSProperties } from 'react';
import { signInWithMana, completeManaSignIn, getManaPassport, type ManaPassport } from './manaAuth';

/**
 * Le widget « Se connecter avec MANA » dans le header (os-header) de
 * temposystem.fr. Au chargement : consomme un éventuel retour du passeport
 * (session dans le fragment) puis lit les claims. Déconnecté → bouton ;
 * connecté → puce @handle. Présentation locale (inline styles, couleurs MANA) —
 * logique portée telle quelle depuis manaAuth.
 */
const btn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '7px 14px',
  borderRadius: 999,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 12,
  color: '#fff',
  background: 'linear-gradient(to right, #234E97, #B060D2)',
  whiteSpace: 'nowrap',
};
const chip: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 12px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  color: '#c9a6ff',
  border: '1px solid rgba(176,96,210,0.45)',
  background: 'rgba(176,96,210,0.12)',
  whiteSpace: 'nowrap',
};

export function ManaConnect({ lang }: { lang: 'fr' | 'en' }) {
  const [passport, setPassport] = useState<ManaPassport | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await completeManaSignIn();
      setPassport(await getManaPassport());
      setReady(true);
    })().catch(() => setReady(true));
  }, []);

  if (!ready) return null;

  if (passport) {
    return (
      <span style={chip} title={`@${passport.handle}`}>
        ✦ {passport.display_name || `@${passport.handle}`}
      </span>
    );
  }

  const label = lang === 'en' ? 'Sign in with MANA' : 'Se connecter avec MANA';
  return (
    <button type="button" style={btn} onClick={() => signInWithMana()}>
      {label}
    </button>
  );
}
