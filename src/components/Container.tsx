import type { ReactNode } from "react";

/** The shared content rail. One max-width across the whole site. */
export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Galleries need more room than prose does. */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-11 ${
        wide ? "max-w-[1480px]" : "max-w-[1180px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
