import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { CouncilPage } from "./features/council/CouncilPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DecisionsPage } from "./pages/DecisionsPage";
import { HomePage } from "./pages/HomePage";
import { ManaPage } from "./pages/ManaPage";
import { VisionPage } from "./pages/VisionPage";

type Route = "home" | "council" | "vision" | "architecture" | "decisions" | "mana";

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace("#/", "");

  if (
    hash === "council" ||
    hash === "vision" ||
    hash === "architecture" ||
    hash === "decisions" ||
    hash === "mana"
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
    council: <CouncilPage />,
    vision: <VisionPage />,
    architecture: <ArchitecturePage />,
    decisions: <DecisionsPage />,
    mana: <ManaPage />,
  }[route];

  return <AppShell activeRoute={route}>{page}</AppShell>;
}
