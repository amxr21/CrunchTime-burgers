"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { ICONS } from "@/lib/assets";
import { useCart } from "@/lib/cart/CartContext";

export default function Header() {
  const { itemCount, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-4 top-4 z-9999 rounded-lg border border-brand-white/10 bg-brand-black/70 px-4 py-4 shadow-lg backdrop-blur-md sm:inset-x-8 sm:px-6 lg:inset-x-28">
      <Container className="w-full items-center flex flex-col gap-2">
        <div className="w-full flex justify-between items-center pb-2 border-b border-brand-white/10 ">
          <Link href="/" className=" flex items-center ">
            <Image
              src={ICONS.logo}
              alt={siteConfig.name}
              width={160}
              height={29}
              priority
              className="h-auto w-32 sm:w-40"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <Button href="/find-us">Reach Us</Button>
            </div>

            <Button href="/cart" aria-label="View order">
              <Image src={ICONS.cartBag} alt="" width={20} height={18} />
              <span className="font-display text-lg">{hydrated ? itemCount : 0}</span>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
            >
              <span
                className={`block h-0.5 w-6 bg-brand-white transition-transform duration-300 ease-out ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-brand-white transition-opacity duration-300 ease-out ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-brand-white transition-transform duration-300 ease-out ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className="w-full gap-4 hidden sm:flex">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-2xl font-thin uppercase tracking-wide text-brand-white transition-colors hover:text-brand-yellow"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {menuOpen && (
          <nav className="flex w-full flex-col gap-1 pb-2 sm:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-brand-white/10 py-3 font-display text-2xl font-thin uppercase tracking-wide text-brand-white transition-colors hover:text-brand-yellow"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}
