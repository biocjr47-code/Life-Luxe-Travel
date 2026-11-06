import type { ReactNode } from "react";

/**
 * A section opener: the pink rule, then the heading.
 *
 * There is no eyebrow slot and there will not be one — the heading
 * carries its own weight. The rule is the site's single repeating
 * motif and the only thing allowed above a heading.
 */
export function SectionHeading({
  title,
  lede,
  align = "left",
  tone = "light",
  voice = false,
  as: Tag = "h2",
}: {
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Italic, for the headings that speak rather than label. */
  voice?: boolean;
  as?: "h1" | "h2";
}) {
  const centred = align === "center";
  return (
    <div className={centred ? "text-center" : ""}>
      <hr
        aria-hidden="true"
        className={`rule-mark ${tone === "dark" ? "rule-mark-lift" : ""} ${
          centred ? "mx-auto" : ""
        } mb-7`}
      />
      <Tag
        className={`text-title ${voice ? "italic" : ""} ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={`measure mt-5 text-lede ${centred ? "mx-auto" : ""} ${
            tone === "dark" ? "text-white/80" : "text-warm"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
