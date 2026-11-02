import type { Metadata } from "next";
import { dealer, fullAddress } from "@/config/dealer";
import { ContactForm } from "@/components/contact-form";
import { HoursList } from "@/components/hours-list";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${dealer.name} — call ${dealer.phone.display}, email us, or send a message about any vehicle.`,
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ vehicle?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { vehicle } = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <ContactForm vehicle={typeof vehicle === "string" ? vehicle : undefined} />
        <aside className="space-y-6">
          <div>
            <h2 className="font-semibold">Call or email</h2>
            <p className="mt-2"><a className="text-lg font-semibold text-primary underline" href={`tel:${dealer.phone.tel}`}>{dealer.phone.display}</a></p>
            <p><a className="underline" href={`mailto:${dealer.email}`}>{dealer.email}</a></p>
          </div>
          <div>
            <h2 className="font-semibold">Address</h2>
            <p className="mt-2">{fullAddress()}</p>
          </div>
          <div>
            <h2 className="font-semibold">Hours</h2>
            <HoursList className="mt-2 max-w-xs text-sm" />
          </div>
        </aside>
      </div>
    </div>
  );
}
