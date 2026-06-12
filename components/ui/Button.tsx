import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const sizeClasses = {
  md: "px-3 py-1 text-lg",
  lg: "px-5 py-2 text-xl",
};

const baseClasses =
  "inline-flex items-center justify-center gap-3 bg-brand-red font-display uppercase tracking-wide text-brand-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-200 ease-out hover:bg-brand-red/80 active:scale-95 active:bg-brand-black active:text-brand-red active:shadow-[2px_2px_0_0_rgba(0,0,0,1)]";

type CommonProps = {
  size?: keyof typeof sizeClasses;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button({ size = "md", className = "", children, ...props }: ButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`.trim();

  if (props.href !== undefined) {
    return (
      <Link {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
