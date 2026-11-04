"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogIn, Menu, Phone, X } from "lucide-react";
import { dealer } from "@/config/dealer";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#inventory", label: "Inventory" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-red-700 text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold" aria-label={`${dealer.name} home`}>
          <Image src={dealer.logo} alt="" width={36} height={36} priority />
          <span className="text-lg">{dealer.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/90 hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Link
            href="/admin/login"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white/90 hover:bg-white/10 hover:text-white")}
            aria-label="Dealer sign-in"
            title="Dealer sign-in"
          >
            <LogIn aria-hidden />
          </Link>
          <a
            href={`tel:${dealer.phone.tel}`}
            className={cn(buttonVariants({ size: "lg" }), "h-10 bg-white px-3 text-red-700 shadow-sm hover:bg-white/90 hover:shadow-md")}
            aria-label={`Call ${dealer.name} at ${dealer.phone.display}`}
          >
            <Phone aria-hidden />
            <span className="hidden sm:inline">{dealer.phone.display}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "md:hidden")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block py-3 font-medium" onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
