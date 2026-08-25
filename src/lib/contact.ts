// Single source of truth for Sushi Travels' contact numbers and the
// WhatsApp deep-link format used across cards, floats, forms and pages.
// Previously this literal phone number (and the `https://wa.me/...` URL
// pattern) was copy-pasted independently in ~10 files — centralizing it
// here means a future number change is a one-line edit, not a grep-and-
// replace across the whole codebase.

/** WhatsApp/tel number in bare digits-only form, e.g. for `wa.me/<number>`. */
export const WHATSAPP_NUMBER = '919071660099';

/** Same number in `tel:`-ready E.164 form with a leading `+`. */
export const PHONE_NUMBER = '+919071660099';

/**
 * Builds a `https://wa.me/...` deep link that opens WhatsApp with the given
 * message pre-filled. `message` is URL-encoded automatically.
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
