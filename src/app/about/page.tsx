import type { Metadata } from "next";
import { dealer, fullAddress } from "@/config/dealer";
import { HoursList } from "@/components/hours-list";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${dealer.name}, an independent used car dealer in ${dealer.address.city}, ${dealer.address.region}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">About {dealer.name}</h1>
      <h2 className="mt-6 text-xl font-semibold text-primary">{dealer.about.heading}</h2>
      <div className="mt-4 space-y-4 leading-relaxed">
        {dealer.about.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <section aria-labelledby="loc">
          <h2 id="loc" className="text-lg font-semibold">Location</h2>
          <p className="mt-2">{fullAddress()}</p>
          {dealer.mapUrl && <a className="mt-2 inline-block underline" href={dealer.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a>}
        </section>
        <section aria-labelledby="hrs">
          <h2 id="hrs" className="text-lg font-semibold">Hours</h2>
          <HoursList className="mt-2 max-w-xs" />
        </section>
      </div>
    </div>
  );
}
