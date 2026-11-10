import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Button } from "./Button";
import {
  GROUP_SIZES,
  TRAVEL_TYPES,
  checklistSchema,
  type ChecklistInput,
} from "~/integrations/leadconnector";
import { submitEnquiry } from "~/integrations/submitEnquiry";
import { LEADCONNECTOR, SITE } from "~/data/site";

/**
 * The Group Trip Planning Checklist opt-in.
 *
 * This replaces a GoHighLevel iframe embed. The embed worked, but it
 * arrived with its own typeface, its own rounded inputs and its own
 * blue focus ring, so the one place on the page asking for a
 * commitment was the one place that did not look like the site.
 *
 * It posts through the SAME server function as the group enquiry, so
 * there is one path to the CRM rather than two. Until GHL_API_KEY
 * and GHL_LOCATION_ID are set, that function returns
 * `configured: false` and the form shows Terry's email and the
 * booking link instead of pretending to have sent something. A form
 * that silently swallows a lead is worse than no form.
 */
const FIELD =
  "llt-field w-full border border-rule bg-white px-4 py-3 text-[0.9375rem] text-ink " +
  "transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70";
const LABEL =
  "block text-[0.75rem] font-bold tracking-[0.12em] text-ink uppercase";
const OPTIONAL = "font-normal normal-case tracking-normal text-muted";
const ERROR = "mt-1.5 flex items-start gap-1.5 text-[0.8125rem] text-brand-deep";

export function ChecklistForm() {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChecklistInput>({
    resolver: zodResolver(checklistSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ChecklistInput) {
    // Mapped onto the existing enquiry payload so there is a single
    // server route. The trip-shape answers travel as the message,
    // because the CRM has no field for them yet.
    const [firstName, ...restName] = values.fullName.split(/\s+/);
    const notes = [
      values.destination ? `Destination: ${values.destination}` : null,
      values.dates ? `Dates: ${values.dates}` : null,
      values.extraordinary ? `Hopes: ${values.extraordinary}` : null,
      "Source: homepage checklist opt-in",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const result = await submitEnquiry({
        data: {
          firstName: firstName || values.fullName,
          lastName: restName.join(" ") || "—",
          email: values.email,
          phone: values.phone,
          groupSize: values.groupSize,
          occasion: values.travelType,
          message: notes,
        },
      });
      setState(result.ok ? "done" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="border border-rule bg-white p-9 text-center"
      >
        <Check aria-hidden="true" className="mx-auto size-8 text-brand-deep" />
        <h3 className="mt-4 font-display text-[1.75rem] text-ink">
          It&apos;s on its way.
        </h3>
        <p className="measure mx-auto mt-3 text-warm">
          Check your inbox for the checklist. If a trip is already taking
          shape, book a call and we will start on it.
        </p>
        <div className="mt-7">
          <Button href={LEADCONNECTOR.bookingWidget} size="sm">
            Book a consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-rule bg-white p-7 lg:p-9"
    >
      <div className="space-y-5">
        <div>
          <label className={LABEL} htmlFor="cl-name">
            Full name
          </label>
          <input
            id="cl-name"
            type="text"
            autoComplete="name"
            placeholder="Terry Powell"
            aria-invalid={errors.fullName ? true : undefined}
            className={`mt-2 ${FIELD}`}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className={ERROR}>
              <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="cl-email">
              Email
            </label>
            <input
              id="cl-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? true : undefined}
              className={`mt-2 ${FIELD}`}
              {...register("email")}
            />
            {errors.email ? (
              <p className={ERROR}>
                <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className={LABEL} htmlFor="cl-phone">
              Phone <span className={OPTIONAL}>(optional)</span>
            </label>
            <input
              id="cl-phone"
              type="tel"
              autoComplete="tel"
              placeholder="(470) 993-0955"
              aria-invalid={errors.phone ? true : undefined}
              className={`mt-2 ${FIELD}`}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className={ERROR}>
                <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="cl-type">
              Kind of trip
            </label>
            <select
              id="cl-type"
              defaultValue=""
              aria-invalid={errors.travelType ? true : undefined}
              className={`mt-2 ${FIELD}`}
              {...register("travelType")}
            >
              <option value="" disabled>
                Choose one
              </option>
              {TRAVEL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.travelType ? (
              <p className={ERROR}>
                <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {errors.travelType.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className={LABEL} htmlFor="cl-size">
              How many travelling
            </label>
            <select
              id="cl-size"
              defaultValue=""
              aria-invalid={errors.groupSize ? true : undefined}
              className={`mt-2 ${FIELD}`}
              {...register("groupSize")}
            >
              <option value="" disabled>
                Choose a range
              </option>
              {GROUP_SIZES.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            {errors.groupSize ? (
              <p className={ERROR}>
                <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {errors.groupSize.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="cl-dest">
              Destination <span className={OPTIONAL}>(if known)</span>
            </label>
            <input
              id="cl-dest"
              type="text"
              placeholder="Or simply 'open to ideas'"
              className={`mt-2 ${FIELD}`}
              {...register("destination")}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="cl-dates">
              Travel dates <span className={OPTIONAL}>(optional)</span>
            </label>
            <input
              id="cl-dates"
              type="text"
              placeholder="A month, a season, or 'flexible'"
              className={`mt-2 ${FIELD}`}
              {...register("dates")}
            />
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="cl-extra">
            What would make this trip extraordinary?{" "}
            <span className={OPTIONAL}>(optional)</span>
          </label>
          <textarea
            id="cl-extra"
            rows={3}
            placeholder="The one thing your group would talk about afterwards."
            className={`mt-2 resize-y ${FIELD}`}
            {...register("extraordinary")}
          />
        </div>

        {/* Unticked by default. A pre-ticked box is not consent. */}
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-warm">
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-[var(--color-brand)]"
              aria-invalid={errors.consent ? true : undefined}
              {...register("consent")}
            />
            <span>
              I agree to be contacted by {SITE.name} about this enquiry.
            </span>
          </label>
          {errors.consent ? (
            <p className={ERROR}>
              <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        {state === "failed" ? (
          <div role="alert" className="border border-brand/35 bg-brand-wash p-5">
            <p className="text-[0.9375rem] text-ink">
              We could not send that just now. Email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-bold text-brand-deep"
              >
                {SITE.email}
              </a>{" "}
              or{" "}
              <a
                href={LEADCONNECTOR.bookingWidget}
                className="font-bold text-brand-deep"
              >
                book a call
              </a>{" "}
              and we will get the checklist to you.
            </p>
          </div>
        ) : null}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send me the checklist"
          )}
        </Button>
      </div>
    </form>
  );
}
