import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "spectrum" | "outline" | "ghost";
type Size = "md" | "lg";

const BASE =
  "relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium " +
  "whitespace-nowrap transition-all duration-300 ease-[var(--ease-out-quint)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const SIZES: Record<Size, string> = {
  md: "px-6 py-3 text-[13px]",
  lg: "px-8 py-4 text-sm",
};

const VARIANTS: Record<Variant, string> = {
  spectrum:
    "bg-spectrum text-white shadow-[0_10px_40px_-12px_rgba(255,45,143,0.55)] " +
    "hover:shadow-[0_14px_50px_-10px_rgba(255,45,143,0.75)] hover:-translate-y-0.5",
  outline:
    "border border-line-strong text-paper hover:border-cyan hover:text-cyan",
  ghost: "text-muted hover:text-paper",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

/** Кнопка-посилання. Використовуйте для переходів і зовнішніх лінків. */
export function ButtonLink({
  variant = "spectrum",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Звичайна кнопка для дій на сторінці. */
export function Button({
  variant = "spectrum",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
