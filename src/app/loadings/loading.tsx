"use client";

type LoaderVariant = "large" | "mini";

const loaderClassByVariant: Record<LoaderVariant, string> = {
  large: "loader",
  mini: "miniloader",
};

function Loader({ variant = "large" }: { variant?: LoaderVariant }) {
  return (
    <div className={`w-full flex justify-center items-center ${variant === "large" ? "h-dvh" : "h-auto"}`}>
      <div className={loaderClassByVariant[variant]}></div>
    </div>
  );
}

export default Loader;
export const MiniLoader = () => <Loader variant="mini" />;