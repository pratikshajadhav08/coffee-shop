// Single source of truth for contact details used across the site
// (navbar, CTA buttons, footer). Update these once, they propagate
// everywhere. Swap in your real phone number and address.

const PHONE_DISPLAY = "+91 20 1234 5678";
const PHONE_DIGITS = "+912012345678";
const ADDRESS = "12 Lane 4, Koregaon Park, Pune 411001";

export const SITE = {
  phoneDisplay: PHONE_DISPLAY,
  phoneHref: `tel:${PHONE_DIGITS}`,
  address: ADDRESS,
  mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    ADDRESS
  )}`,
};