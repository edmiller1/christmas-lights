import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@acme/ui";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "font-heading text-pretty text-4xl font-semibold tracking-tight text-zinc-800 sm:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
