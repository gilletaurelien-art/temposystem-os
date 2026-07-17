import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DecisionsPage } from "./pages/DecisionsPage";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { QuotePage } from "./pages/QuotePage";
import { PartnersPage } from "./pages/PartnersPage";
import { CreateTempoPage } from "./pages/CreateTempoPage";
import { OfferDetailPage } from "./pages/OfferDetailPage";
import { VisionPage } from "./pages/VisionPage";
import { MotionProvider } from "./lib/motion";

type Route = "home" | "manifeste" | "moteur" | "memoire" | "tarifs" | "partenaires" | "creer" | "devis" | "offre";

/** Anciennes routes → nouvelles (refonte 07/2026) : les liens historiques survivent. */
const LEGACY: Record<string, Route> = {
  vision: "manifeste",
  architecture: "moteur",
  decisions: "memoire",
  mana: "home",
  applications: "home",
};

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace("#/", "").split(/[?#]/)[0];

  if (hash.startsWith("offres/")) return "offre";

  if (hash in LEGACY) return LEGACY[hash];
  if (
    hash === "manifeste" ||
    hash === "moteur" ||
    hash === "memoire" ||
    hash === "tarifs"
    || hash === "partenaires"
    || hash === "creer"
    || hash === "devis"
  ) {
    return hash;
  }

  return "home";
};

/** Ancre demandée dans l'URL (partie après le 2e « # », ex. #/tarifs#territoires → "territoires"). */
const anchorFromHash = (): string | null => {
  const parts = window.location.hash.split("#"); // ["", "/tarifs", "territoires"]
  if (parts.length >= 3 && parts[2]) return parts[2].split("?")[0];
  return null;
};

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [nav, setNav] = useState(0);

  useEffect(() => {
    // Le navigateur restaure sinon la position de scroll mémorisée de la page
    // (d'où l'atterrissage au milieu/en bas) — on prend la main.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const updateRoute = () => {
      setRoute(routeFromHash());
      setNav((n) => n + 1); // relance la restauration du scroll à chaque navigation
    };

    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  // Restauration du scroll : vers la section demandée si ancre, sinon haut de page.
  // On scrolle immédiatement (après le commit du DOM) ET une frame plus tard
  // (filet, une fois la nouvelle page mise en page).
  useEffect(() => {
    const restore = () => {
      const anchor = anchorFromHash();
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          // décalage pour ne pas passer sous le header sticky (~72px)
          window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80));
          return;
        }
      }
      window.scrollTo(0, 0);
    };
    restore();
    const raf = requestAnimationFrame(restore);
    return () => cancelAnimationFrame(raf);
  }, [nav]);

  const page = {
    home: <HomePage />,
    manifeste: <VisionPage />,
    moteur: <ArchitecturePage />,
    memoire: <DecisionsPage />,
    tarifs: <PricingPage />,
    partenaires: <PartnersPage />,
    creer: <CreateTempoPage />,
    devis: <QuotePage />,
    offre: <OfferDetailPage />,
  }[route];

  return (
    <MotionProvider>
      <AppShell activeRoute={route}>{page}</AppShell>
    </MotionProvider>
  );
}
