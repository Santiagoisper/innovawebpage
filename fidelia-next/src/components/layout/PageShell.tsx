import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <>
      <Header />
      <main id="main-content" className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
