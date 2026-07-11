import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/ui/CustomCursor";
import ScrollProgress from "../components/ui/ScrollProgress";

function consoleEasterEgg() {
  const styles = [
    "color: #3b82f6; font-size: 14px; font-family: monospace; font-weight: bold;",
    "color: #6b7a99; font-size: 12px; font-family: monospace;",
  ];
  console.log(
    `%c
 ██████╗ ███████╗
██╔════╝ ██╔════╝
██║  ███╗█████╗
██║   ██║██╔══╝
╚██████╔╝██║
 ╚═════╝ ╚═╝

 Anchal Gupta — Portfolio v1.0.0
%c
 Psst — looking at the console? You'll fit right in. 👀
 I'm open to opportunities. Reach out: anchal@example.com
 Source: github.com/anchalgupta/portfolio
`,
    styles[0],
    styles[1]
  );
}

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    consoleEasterEgg();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
