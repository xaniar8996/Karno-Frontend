import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { clx } from "@utils/classnames";

type Variant = "contained" | "outlined" | "text";

type Color =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "default";

type Size = "xs" | "sm" | "md" | "lg" | "xl";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  color?: Color;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean
}

const buttonBaseStyles =
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  contained: {
    primary:
      "bg-primary-600 text-white shadow-sm",
    secondary:
      "bg-secondary-600 text-white shadow-sm",
    error:
      "bg-error-600 text-white shadow-sm",
    warning:
      "bg-warning-500 text-white shadow-sm",
    default:
      "bg-default-900 text-surface",
  },

  outlined: {
    primary:
      "border border-primary-500 text-primary-700 ",
    secondary:
      "border border-secondary-500 text-secondary-700 ",
    error:
      "border border-error-500 text-error-700 ",
    warning:
      "border border-warning-500 text-warning-700",
    default:
      "border border-neutral-300 text-default-900",
  },

  text: {
    primary:
      "text-primary-700",
    secondary:
      "text-secondary-700",
    error:
      "text-error-700",
    warning:
      "text-warning-700",
    default:
      "text-default-900 ",
  },
} as const;

const sizes = {
  xs: "py-1 px-1 text-xs",
  sm: "py-3 px-5 text-sm",
  md: "py-4 px-6 text-base",
  lg: "py-5 px-7 text-lg",
  xl: "py-6 px-8 text-xl"
} as const;

export const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  icon,
  ...props
}) => {
  return (
    <button
      className={clx(
        buttonBaseStyles,
        variants[variant][color],
        sizes[size],
        fullWidth && "w-full",
        className,
        "gap-2"
      )}
      {...props}
    >
      {icon && icon}{children}
    </button>
  );
};