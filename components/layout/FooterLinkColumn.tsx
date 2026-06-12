import Link from "next/link";

type FooterLinkColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

export default function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
  return (
    <div className="w-24 sm:w-40">
      <h3 className="font-display text-4xl uppercase tracking-wide">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-xl text-brand-white/70 transition-colors duration-300 ease-out hover:text-brand-yellow"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
