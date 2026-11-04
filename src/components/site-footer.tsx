import Link from "next/link";
import { dealer, fullAddress } from "@/config/dealer";
import { HoursList } from "@/components/hours-list";

const socialLabels: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", x: "X (Twitter)", youtube: "YouTube" };

export function SiteFooter() {
  const socials = Object.entries(dealer.social).filter(([, url]) => url);
  return (
    <footer className="mt-16 border-t bg-red-700 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-base font-semibold">{dealer.name}</p>
          <p className="mt-2 text-white/90">{dealer.tagline}</p>
        </div>
        <address className="not-italic">
          <p className="font-semibold">Visit us</p>
          <p className="mt-2">{fullAddress()}</p>
          <p className="mt-2"><a className="underline" href={`tel:${dealer.phone.tel}`}>{dealer.phone.display}</a></p>
          <p><a className="underline" href={`mailto:${dealer.email}`}>{dealer.email}</a></p>
          {dealer.mapUrl && (
            <p className="mt-2"><a className="underline" href={dealer.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a></p>
          )}
        </address>
        <div>
          <p className="font-semibold">Hours</p>
          <HoursList className="mt-2 text-white/90" />
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/#inventory" className="underline">Inventory</Link></li>
            <li><Link href="/about" className="underline">About</Link></li>
            <li><Link href="/contact" className="underline">Contact</Link></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3" aria-label="Social media">
              {socials.map(([k, url]) => (
                <li key={k}><a href={url} target="_blank" rel="noopener noreferrer" className="underline">{socialLabels[k] ?? k}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className="border-t py-4 text-center text-xs text-white/90">
        © {new Date().getFullYear()} {dealer.legalName}. All rights reserved. Prices exclude tax, title and fees.
      </p>
    </footer>
  );
}
