import { dealer, fullAddress } from "@/config/dealer";
import { type Vehicle, vehicleSlug, vehicleTitle } from "@/lib/inventory";

const dayMap: Record<string, string> = {
  Monday: "Mo", Tuesday: "Tu", Wednesday: "We", Thursday: "Th", Friday: "Fr", Saturday: "Sa", Sunday: "Su",
};

export const absoluteUrl = (p = "/") => new URL(p, dealer.seo.siteUrl).toString();

export function autoDealerJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: dealer.name,
    url: dealer.seo.siteUrl,
    logo: absoluteUrl(dealer.logo),
    telephone: dealer.phone.tel,
    email: dealer.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: dealer.address.street,
      addressLocality: dealer.address.city,
      addressRegion: dealer.address.region,
      postalCode: dealer.address.postalCode,
      addressCountry: dealer.address.country,
    },
    ...(dealer.geo ? { geo: { "@type": "GeoCoordinates", ...dealer.geo } } : {}),
    openingHours: dealer.hours.filter((h) => h.open).map((h) => `${dayMap[h.day]} ${h.open}-${h.close}`),
    sameAs: Object.values(dealer.social).filter(Boolean),
    description: dealer.seo.description,
    hasMap: dealer.mapUrl || undefined,
    areaServed: fullAddress(),
  };
}

export function vehicleJsonLd(v: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": ["Car", "Product"],
    name: vehicleTitle(v),
    url: absoluteUrl(`/inventory/${vehicleSlug(v)}`),
    image: v.images,
    description: v.description,
    sku: v.stockNumber,
    vehicleIdentificationNumber: v.vin,
    brand: { "@type": "Brand", name: v.make },
    manufacturer: v.make,
    model: v.model,
    vehicleModelDate: String(v.year),
    bodyType: v.bodyStyle,
    color: v.exteriorColor,
    vehicleInteriorColor: v.interiorColor,
    vehicleTransmission: v.transmission,
    driveWheelConfiguration: v.drivetrain,
    fuelType: v.fuelType,
    vehicleEngine: v.engine ? { "@type": "EngineSpecification", name: v.engine } : undefined,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "SMI" },
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      price: v.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoDealer", name: dealer.name, telephone: dealer.phone.tel },
    },
  };
}

/** Safe JSON-LD serializer (escapes "<" to prevent script injection). */
export const jsonLdString = (obj: unknown) => JSON.stringify(obj).replace(/</g, "\\u003c");
