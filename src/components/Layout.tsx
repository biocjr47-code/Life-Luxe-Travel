import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * Page chrome.
 *
 * `overlay` lets a page with a photographic hero put the header
 * over the image instead of above it. Pages without a hero get the
 * solid-ink bar, because a transparent header over cream is
 * unreadable.
 */
export function Layout({
  children,
  overlay = false,
}: {
  children: ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar overlay={overlay} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
