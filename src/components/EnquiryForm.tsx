import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Button } from "./Button";
import {
  GROUP_SIZES,
  enquirySchema,
  type EnquiryInput,
} from "~/integrations/leadconnector";
import { submitEnquiry } from "~/integrations/submitEnquiry";
import { LEADCONNECTOR, SITE } from "~/data/site";

const FIELD =
  "w-full border border-rule bg-white px-4 py-3.5 text-[0.9375rem] text-ink " +
  "transition-colors duration-200 placeholder:text-muted/70 " +
  "focus:border-brand focus:outline-none";
const LABEL = "block text-[0.8125rem] font-bold tracking-[0.1em] text-ink uppercase";
const ERROR = "mt-1.5 flex items-start gap-1.5 text-[0.8125rem] text-brand-deep";

export function EnquiryForm() {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
  });

  async function onSubmit(values: EnquiryInput) {
    try {
      const result = await submitEnquiry({ data: values });
      setState(result.ok ? "done" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-rule bg-brand-wash p-9 text-center"
      >
        <Check aria-hidden="true" className="mx-auto size-8 text-brand-deep" />
        <h3 className="mt-4 text-2xl">Thank you — that's with us.</h3>
        <p className="measure mx-auto mt-3 text-warm">
          Terry will be in touch personally. If your trip is time-sensitive,
          book a call and skip the queue.
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={LABEL}>
            First name
          </label>
          <input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            className={`${FIELD} mt-2`}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className={ERROR}>
              <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={LABEL}>
            Last name
          </label>
          <input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            className={`${FIELD} mt-2`}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className={ERROR}>
              <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={`${FIELD} mt-2`}
            {...register("email")}
          />
          {errors.email && (
            <p className={ERROR}>
              <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={LABEL}>
            Phone <span className="font-normal normal-case text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            className={`${FIELD} mt-2`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className={ERROR}>
              <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="groupSize" className={LABEL}>
          How many travellers
        </label>
        <select
          id="groupSize"
          defaultValue=""
          aria-invalid={!!errors.groupSize}
          className={`${FIELD} mt-2`}
          {...register("groupSize")}
        >
          <option value="" disabled>
            Choose a group size
          </option>
          {GROUP_SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.groupSize && (
          <p className={ERROR}>
            <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            {errors.groupSize.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="occasion" className={LABEL}>
          What is the trip for
        </label>
        <input
          id="occasion"
          placeholder="A 50th birthday, a church retreat, a team offsite…"
          aria-invalid={!!errors.occasion}
          className={`${FIELD} mt-2`}
          {...register("occasion")}
        />
        {errors.occasion && (
          <p className={ERROR}>
            <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            {errors.occasion.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Anything else{" "}
          <span className="font-normal normal-case text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Rough dates, destinations you have in mind, budget per person…"
          className={`${FIELD} mt-2 resize-y`}
          {...register("message")}
        />
      </div>

      {/* A failed submit must never strand a lead. Give the two
          routes that always work. */}
      {state === "failed" && (
        <div
          role="alert"
          className="rounded-[var(--radius-card)] border border-brand/35 bg-brand-wash p-5"
        >
          <p className="text-[0.9375rem] text-ink">
            That did not send. Please email{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-bold text-brand-deep"
            >
              {SITE.email}
            </a>{" "}
            or{" "}
            <a
              href={LEADCONNECTOR.bookingWidget}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-deep"
            >
              book a call directly
            </a>
            .
          </p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send my enquiry"
        )}
      </Button>
    </form>
  );
}
