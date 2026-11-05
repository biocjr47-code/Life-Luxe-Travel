import { Reveal } from "./Reveal";
import type { Photo } from "~/data/journeys";

/**
 * The gallery grid.
 *
 * Mixed spans, not a uniform tile wall — a grid of identical
 * rectangles reads as a contact sheet, and a gallery whose job is
 * to make someone want to travel cannot afford that. "wide" photos
 * take two columns on desktop.
 *
 * Each tile reserves its own aspect ratio. Without that, lazily
 * loaded images grow the document under the reader and push later
 * sections past their own reveal trigger.
 */
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {photos.map((photo, i) => (
        <Reveal
          as="li"
          key={photo.src}
          delay={Math.min(i, 5) * 70}
          className={photo.span === "wide" ? "lg:col-span-2" : ""}
        >
          <figure className="group relative h-full overflow-hidden rounded-[var(--radius-card)] bg-sand">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04] ${
                photo.span === "wide"
                  ? "aspect-[3/2]"
                  : "aspect-[3/4]"
              }`}
            />
            {/* Dark only under the caption, so the photograph keeps
                its brightness everywhere else.
                Measured against real pixels, the first version of
                this reached only 2.72:1 on a phone — the tiles are
                small there, so the caption sits higher up the
                gradient where it had barely started. Taller and
                deeper, with the steep part moved up to meet it. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
              style={{
                background:
                  "linear-gradient(180deg, rgb(12 11 10 / 0) 0%, rgb(12 11 10 / .30) 40%, rgb(12 11 10 / .55) 75%, rgb(12 11 10 / .66) 100%)",
              }}
            />
            {/* The caption carries its own floor rather than relying
                on the tile gradient above. A tile's height changes
                with the breakpoint, so a gradient scaled to the tile
                puts the text at a different point on the ramp each
                time — which is how "The Grand Mosque courtyard"
                ended up at 2.99:1 on a phone, over white marble.
                Anchoring the dark part to the TEXT box instead makes
                it independent of tile size. */}
            <figcaption
              className="absolute inset-x-0 bottom-0 px-4 pt-10 pb-4 lg:px-5 lg:pb-5"
              style={{
                background:
                  "linear-gradient(180deg, rgb(12 11 10 / 0) 0%, rgb(12 11 10 / .74) 34%, rgb(12 11 10 / .88) 100%)",
              }}
            >
              <p
                className="font-display text-[1.0625rem] leading-tight text-white lg:text-[1.1875rem]"
                style={{ textShadow: "0 1px 12px rgb(12 11 10 / .8)" }}
              >
                {photo.caption}
              </p>
              <p
                className="mt-1 text-[0.75rem] tracking-[0.12em] text-white/85 uppercase"
                style={{ textShadow: "0 1px 10px rgb(12 11 10 / .85)" }}
              >
                {photo.place}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
