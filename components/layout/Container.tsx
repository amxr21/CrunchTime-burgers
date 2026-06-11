import { type ElementType, type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Centered 12-column grid container.
 * Columns: 5.625rem (90px) | Gutter: 1.25rem (20px) | Max width: 81.25rem (1300px)
 */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={` ${className}`}
    >
      {children}
    </Tag>
  );
}
