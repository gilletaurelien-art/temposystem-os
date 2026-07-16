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
  border: '1px solid rgba(92, 146, 137, .38)',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 12,
  color: '#286b64',
  background: 'rgba(255, 255, 255, .64)',
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
  color: '#286b64',
  border: '1px solid rgba(92,146,137,.38)',
  background: 'rgba(92,146,137,.1)',
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
