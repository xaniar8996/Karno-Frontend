"use client";

type LoaderVariant = "large" | "mini";

interface LoaderProps {
  variant?: LoaderVariant;
  className?: string;
}

const loaderClassByVariant = {
  large: "loader",
  mini: "miniloader",
} as const;

function Loader({ variant = "large", className }: LoaderProps) {
  return (
    <div className={`w-full flex justify-center items-center ${variant === "large" && "h-dvh"}`}>
      <div className={`${loaderClassByVariant[variant]} ${className}`} />
    </div>
  );
}

export default Loader;

export const MiniLoader = (props: Omit<LoaderProps, "variant">) => (
  <Loader variant="mini" {...props} />
);