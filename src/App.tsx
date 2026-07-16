import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { CouncilPage } from "./features/council/CouncilPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DecisionsPage } from "./pages/DecisionsPage";
import { HomePage } from "./pages/HomePage";
import { ManaPage } from "./pages/ManaPage";
import { VisionPage } from "./pages/VisionPage";
import { MotionProvider } from "./lib/motion";

type Route = "home" | "conseil" | "manifeste" | "moteur" | "memoire" | "applications";

/** Anciennes routes → nouvelles (refonte 07/2026) : les liens historiques survivent. */
const LEGACY: Record<string, Route> = {
  council: "conseil",
  vision: "manifeste",
  architecture: "moteur",
  decisions: "memoire",
  mana: "applications",
};

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace("#/", "");

  if (hash in LEGACY) return LEGACY[hash];
  if (
    hash === "conseil" ||
    hash === "manifeste" ||
    hash === "moteur" ||
    hash === "memoire" ||
    hash === "applications"
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
    conseil: <CouncilPage />,
    manifeste: <VisionPage />,
    moteur: <ArchitecturePage />,
    memoire: <DecisionsPage />,
    applications: <ManaPage />,
  }[route];

  return (
    <MotionProvider>
      <AppShell activeRoute={route}>{page}</AppShell>
    </MotionProvider>
  );
}
