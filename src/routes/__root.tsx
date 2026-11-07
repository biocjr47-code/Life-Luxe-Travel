import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { ContactBubble } from "~/components/ContactBubble";
import type { ReactNode } from "react";
import appCss from "~/styles.css?url";
import { SITE } from "~/data/site";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0c0b0a" },
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.legalName },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      // Preconnect before the font CSS so the two round trips overlap.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700;900&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Keyboard users land here first. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3.5 focus:text-sm focus:font-bold focus:tracking-[0.14em] focus:text-white focus:uppercase"
        >
          Skip to content
        </a>
        {children}
        {/* Pinned bottom-right on every page. Lives in the shell
            rather than in Layout because the homepage composes its
            own chrome. */}
        <ContactBubble />
        <Scripts />
      </body>
    </html>
  );
}
