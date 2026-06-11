import Image from "next/image";
import Link from "next/link";
import {
  cityLocations,
  footerLinks,
  siteConfig,
  socialLinks,
} from "@/lib/site-config";
import Container from "@/components/layout/Container";
import FooterLinkColumn from "@/components/layout/FooterLinkColumn";
import Reveal from "@/components/ui/Reveal";
import { ICONS } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="relative left-1/2 right-1/2 mx-[-50vw] w-screen border-t border-brand-white/10 bg-linear-to-t from-black to-transparent text-brand-white">
      <Container className="px-6 py-12 sm:px-12 lg:px-28 lg:py-16">
        <Reveal className="flex flex-col flex-wrap items-start justify-between gap-y-10 sm:flex-row" stagger>
          <div className="w-full max-w-xs">
            <Image
              src={ICONS.logo}
              alt={siteConfig.name}
              width={160}
              height={29}
              className="h-auto w-40"
            />
            <p className="mt-4 max-w-xs text-2xl text-brand-white/70">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex gap-16">
            <FooterLinkColumn title="Links" links={footerLinks.links} />
            <FooterLinkColumn title="Privacy" links={footerLinks.privacy} />
          </div>

          <div>
            <h3 className="font-display text-4xl uppercase tracking-wide">Enlighten Us!</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {cityLocations.map((city) => (
                <li key={city} className="text-2xl text-brand-white/70">
                  {city}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-4xl uppercase tracking-wide">Say Hi!!</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    className="text-2xl text-brand-white/70 transition-colors duration-300 ease-out hover:text-brand-yellow"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>

      <div className="border-t border-brand-white/10 px-6 py-4 sm:px-12 lg:px-28">
        <p className="text-center text-sm uppercase tracking-wide text-brand-white/50">
          {siteConfig.name} is a registered brandmark, all rights reserved
        </p>
      </div>
    </footer>
  );
}
