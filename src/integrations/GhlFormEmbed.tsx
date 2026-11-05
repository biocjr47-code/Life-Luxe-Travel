import { useEffect, useRef, useState } from "react";
import { LEADCONNECTOR } from "~/data/site";

/**
 * A hosted LeadConnector form, embedded.
 *
 * WHY AN IFRAME AND NOT A NATIVE FORM
 * Submissions land directly in the GoHighLevel CRM, which means the
 * existing workflows, tags and automations fire exactly as they do
 * today. A hand-rolled form posting to the GHL API would need the
 * private token on a server we control — a token that currently has
 * full access to contacts, conversations and payments. The embed
 * needs no credential at all, so there is nothing here to leak.
 *
 * The trade is that we do not control the form's own styling. It is
 * framed below so it still sits inside the page's design.
 */
export function GhlFormEmbed({
  formUrl = LEADCONNECTOR.checklistForm,
  title,
  /** Fallback height before the embed script reports its own. */
  minHeight = 560,
}: {
  formUrl?: string;
  title: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // The embed script resizes the iframe to its content. Load it
    // once per page, not once per form.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${LEADCONNECTOR.formEmbedScript}"]`,
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = LEADCONNECTOR.formEmbedScript;
    s.async = true;
    s.onerror = () => setFailed(true);
    document.body.appendChild(s);
  }, []);

  // A blocked third-party script must not leave an empty box with no
  // way forward. Give the visitor the form's own URL instead.
  if (failed) {
    return (
      <div className="rounded-[var(--radius-card)] border border-rule bg-cream p-8 text-center">
        <p className="text-warm">
          The form could not load — an extension or network policy may be
          blocking it.
        </p>
        <a
          href={formUrl}
          className="mt-4 inline-block font-bold tracking-wide text-brand-deep"
        >
          Open the form in a new tab
        </a>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <div className="overflow-hidden border border-rule bg-white shadow-[0_4px_20px_rgba(12,11,10,0.06)]">
        {/* Until the iframe paints, this sits behind it so the column
            is never an empty bordered rectangle. */}
        {!loaded && (
          <div
            className="flex items-center justify-center px-6 text-center text-[0.9375rem] text-muted"
            style={{ minHeight }}
          >
            Loading the form…
          </div>
        )}
        <iframe
          src={formUrl}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="w-full border-0"
          style={{ minHeight, display: loaded ? "block" : "none" }}
        />
      </div>
      {/* Always present, not only on failure. Ad blockers and strict
          privacy modes drop third-party iframes silently — with no
          error to catch — so the way out has to be in the page
          already rather than rendered in response to a failure that
          never fires. */}
      <p className="mt-3 text-center text-[0.8125rem] text-muted">
        Form not showing?{" "}
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-brand-deep"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
