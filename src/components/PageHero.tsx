import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * The photographic page opener.
 *
 * The type sits bottom-left inside the image rather than above it,
 * so the photograph owns the first viewport — which is the point of
 * a travel site. Two sizes: `full` for the homepage, `page` for
 * interior pages that should show content sooner.
 *
 * The veil is two gradients, not one. The angled one weights the
 * LEFT, where the type actually sits, so the headline gets its
 * contrast without flattening the whole photograph. The vertical
 * one guarantees a floor under the text whatever the image is
 * doing down there.
 */
export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  size = "page",
  /** object-position on the image, when the subject is off-centre. */
  focus = "center 42%",
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  imageAlt: string;
  size?: "full" | "page";
  focus?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`relative isolate flex items-end overflow-hidden ${
        size === "full"
          ? "min-h-[86svh] lg:min-h-[92svh]"
          : "min-h-[58svh] lg:min-h-[66svh]"
      }`}
    >
      <img
        src={image}
        alt={imageAlt}
        // The largest paint on the page. Never lazy-load it.
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
        style={{ objectPosition: focus }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(104deg, rgb(12 11 10 / .56) 0%, rgb(12 11 10 / .22) 40%, rgb(12 11 10 / 0) 62%)," +
            "linear-gradient(180deg, rgb(12 11 10 / .40) 0%, rgb(12 11 10 / .12) 30%, rgb(12 11 10 / .70) 68%, rgb(12 11 10 / .96) 100%)",
        }}
      />

      <Container className="relative w-full pt-28 pb-14 lg:pb-20">
        <h1
          className="font-display text-display text-white italic"
          style={{ textShadow: "0 2px 40px rgb(12 11 10 / .6)" }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className="mt-5 max-w-[34ch] font-display text-[clamp(1.0625rem,2vw,1.375rem)] text-brand-lift italic"
            style={{ textShadow: "0 1px 26px rgb(12 11 10 / .75)" }}
          >
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
