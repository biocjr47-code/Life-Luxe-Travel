import { createServerFn } from "@tanstack/react-start";
import { enquirySchema, type EnquiryInput } from "./leadconnector";

/**
 * Server route for the group-enquiry form.
 *
 * Runs on the server so the GHL private token is never shipped to
 * the browser. The token is read from the environment at call time,
 * never imported at module scope, so a missing variable cannot take
 * the whole bundle down.
 *
 * TO ACTIVATE: set GHL_API_KEY and GHL_LOCATION_ID in the AI Studio
 * project's server environment. Until then this returns
 * `configured: false` and the form shows its fallback — Terry's
 * email and the booking link — rather than silently swallowing a
 * lead, which is the worst possible failure for a contact form.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: EnquiryInput) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!token || !locationId) {
      return {
        ok: false as const,
        configured: false as const,
        message:
          "Enquiry form is not connected to the CRM yet. Set GHL_API_KEY and GHL_LOCATION_ID.",
      };
    }

    try {
      const res = await fetch(
        "https://services.leadconnectorhq.com/contacts/upsert",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locationId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            ...(data.phone ? { phone: data.phone } : {}),
            source: "Website — group enquiry",
            // ADD-only. Never send a tag array that would replace
            // the contact's existing tags.
            tags: ["website-group-enquiry"],
            customFields: [
              { key: "group_size", field_value: data.groupSize },
              { key: "occasion", field_value: data.occasion },
              ...(data.message
                ? [{ key: "enquiry_message", field_value: data.message }]
                : []),
            ],
          }),
        },
      );

      if (!res.ok) {
        // Log the status for the server operator; never return the
        // provider's raw body to the browser.
        console.error("GHL upsert failed", res.status, await res.text());
        return {
          ok: false as const,
          configured: true as const,
          message: "We could not save that just now. Please try again.",
        };
      }

      return { ok: true as const, configured: true as const };
    } catch (err) {
      console.error("GHL upsert threw", err);
      return {
        ok: false as const,
        configured: true as const,
        message: "We could not reach our booking system. Please try again.",
      };
    }
  });
