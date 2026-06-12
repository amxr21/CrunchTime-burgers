import Link from "next/link";

type FooterLinkColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

export default function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="w-28 sm:w-40">
      <h3 className="font-display text-xl uppercase tracking-wide sm:text-3xl">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-base text-brand-white/70 transition-colors duration-300 ease-out hover:text-brand-yellow sm:text-lg"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
