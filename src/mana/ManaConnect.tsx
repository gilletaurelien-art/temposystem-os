import { useEffect, useState } from 'react';
import { signInWithMana, completeManaSignIn, getManaPassport, type ManaPassport } from './manaAuth';

/**
 * Le widget « Se connecter avec MANA » dans le header (os-header) de
 * temposystem.fr. Au chargement : consomme un éventuel retour du passeport
 * (session dans le fragment) puis lit les claims. Déconnecté → bouton ;
 * connecté → puce @handle. Présentation locale (inline styles, couleurs MANA) —
 * logique portée telle quelle depuis manaAuth.
 */
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
      <span className="os-mana-chip" title={`@${passport.handle}`}>
        ✦ {passport.display_name || `@${passport.handle}`}
      </span>
    );
  }

  const label = lang === 'en' ? 'Sign in with MANA' : 'Se connecter avec MANA';
  return (
    <button type="button" className="os-mana-connect" onClick={() => signInWithMana()}>
      {label}
    </button>
  );
}
