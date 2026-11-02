"use client";

import { useState } from "react";
import { dealer } from "@/config/dealer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * UI-only contact form. No backend.
 * - mode "mailto": opens the visitor's email app pre-filled to dealer.email
 * - mode "placeholder": just shows a success message (wire your API in handleSubmit)
 */
export function ContactForm({ vehicle }: { vehicle?: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    if (dealer.contactForm.mode === "mailto") {
      const subject = get("vehicle") ? `Inquiry: ${get("vehicle")}` : `Website inquiry from ${get("name")}`;
      const body = `Name: ${get("name")}\nEmail: ${get("email")}\nPhone: ${get("phone")}\nVehicle: ${get("vehicle")}\n\n${get("message")}`;
      window.location.href = `mailto:${dealer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    // TODO: replace with a POST to your form handler / CRM (e.g. fetch("/api/lead", ...))
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-xl border bg-muted/40 p-6">
        <p className="font-semibold">Thanks! We&apos;ll be in touch soon.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Need us now? Call <a className="underline" href={`tel:${dealer.phone.tel}`}>{dealer.phone.display}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-10" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required className="h-10" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="vehicle">Vehicle of interest (optional)</Label>
        <Input id="vehicle" name="vehicle" defaultValue={vehicle} className="h-10" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <Button type="submit" size="lg" className="h-11 px-6">Send message</Button>
    </form>
  );
}
