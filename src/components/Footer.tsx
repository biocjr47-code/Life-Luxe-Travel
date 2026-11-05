import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon, SOCIAL_ICONS } from "./BrandIcons";
import { Container } from "./Container";
import { NAV, SITE, SOCIAL } from "~/data/site";
import { AMAZON_DISCLOSURE } from "~/data/content";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <img
              src="/images/llt-logo.png"
              alt=""
              width={72}
              height={72}
              className="size-[72px] object-contain"
            />
            <p className="measure mt-6 text-[0.9375rem] leading-relaxed text-white/70">
              {SITE.tagline} We partner with group leaders who want to bring
              people together — and who would rather not spend six months
              buried in logistics to do it.
            </p>
            <ul className="mt-7 flex flex-wrap gap-4">
              {SOCIAL.map((s) => {
                const Icon =
                  SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS];
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${SITE.name} on ${s.name}`}
                      className="inline-flex size-10 items-center justify-center border border-white/20 text-white/70 transition-colors duration-300 hover:border-brand-lift hover:text-brand-lift"
                    >
                      {Icon ? <Icon className="size-[18px]" /> : s.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-bold tracking-[0.16em] text-white uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-1 lg:space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-white/70 no-underline transition-colors hover:text-brand-lift lg:min-h-9"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold tracking-[0.16em] text-white uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-1 lg:space-y-2">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] text-white/70 no-underline transition-colors hover:text-brand-lift lg:min-h-9"
                >
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] break-all text-white/70 no-underline transition-colors hover:text-brand-lift lg:min-h-9"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lifeluxetravel1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] text-white/70 no-underline transition-colors hover:text-brand-lift lg:min-h-9"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  @lifeluxetravel1
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/12 pt-8">
          <div className="flex flex-col gap-4 text-[0.8125rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {YEAR} {SITE.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-5">
              <a
                href="https://lifeluxetravel.com/privacy-policy"
                className="inline-flex min-h-11 items-center text-white/55 transition-colors hover:text-brand-lift lg:min-h-0"
              >
                Privacy Policy
              </a>
              <a
                href="https://lifeluxetravel.com/terms-and-conditions"
                className="inline-flex min-h-11 items-center text-white/55 transition-colors hover:text-brand-lift lg:min-h-0"
              >
                Terms &amp; Conditions
              </a>
            </div>
          </div>
          {/* FTC requires this wherever the affiliate links appear. */}
          <p className="mt-4 text-[0.8125rem] text-white/45">
            {AMAZON_DISCLOSURE}
          </p>
        </div>
      </Container>
    </footer>
  );
}
