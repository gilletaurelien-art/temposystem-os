import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DecisionsPage } from "./pages/DecisionsPage";
import { HomePage } from "./pages/HomePage";
import { ManaPage } from "./pages/ManaPage";
import { PricingPage } from "./pages/PricingPage";
import { CreateTempoPage } from "./pages/CreateTempoPage";
import { OfferDetailPage } from "./pages/OfferDetailPage";
import { VisionPage } from "./pages/VisionPage";
import { MotionProvider } from "./lib/motion";

type Route = "home" | "manifeste" | "moteur" | "memoire" | "applications" | "tarifs" | "creer" | "offre";

/** Anciennes routes → nouvelles (refonte 07/2026) : les liens historiques survivent. */
const LEGACY: Record<string, Route> = {
  vision: "manifeste",
  architecture: "moteur",
  decisions: "memoire",
  mana: "applications",
};

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace("#/", "").split("?")[0];

  if (hash.startsWith("offres/")) return "offre";

  if (hash in LEGACY) return LEGACY[hash];
  if (
    hash === "manifeste" ||
    hash === "moteur" ||
    hash === "memoire" ||
    hash === "applications"
    || hash === "tarifs"
    || hash === "creer"
  ) {
    return hash;
  }

  return "home";
};

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());

  useEffect(() => {
    const updateRoute = () => setRoute(routeFromHash());

    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  const page = {
    home: <HomePage />,
    manifeste: <VisionPage />,
    moteur: <ArchitecturePage />,
    memoire: <DecisionsPage />,
    applications: <ManaPage />,
    tarifs: <PricingPage />,
    creer: <CreateTempoPage />,
    offre: <OfferDetailPage />,
  }[route];

  return (
    <MotionProvider>
      <AppShell activeRoute={route}>{page}</AppShell>
    </MotionProvider>
  );
}
