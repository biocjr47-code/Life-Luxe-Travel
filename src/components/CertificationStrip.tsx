import { Container } from "./Container";
import { CERTIFICATIONS } from "~/data/site";

/**
 * Real accreditations. Shown small and quiet — these are proof,
 * not decoration, and blowing them up would make the page look
 * like it is pleading.
 */
export function CertificationStrip() {
  return (
    <section className="border-y border-rule bg-ivory py-10">
      <Container>
        <h2 className="text-center text-[0.75rem] font-bold tracking-[0.2em] text-muted uppercase">
          Travel professional certifications
        </h2>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto object-contain opacity-80 mix-blend-multiply transition-opacity duration-300 hover:opacity-100 lg:h-11"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
