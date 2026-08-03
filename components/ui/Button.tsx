import Link from "next/link";

type ButtonPadding = "xs" | "sm" | "md";

export function Button({
  href,
  children,
  size,
}: {
  size: ButtonPadding;
  href: string;
  children: React.ReactNode;
}) {
  const sizeClasses = {
    xs: "px-2 py-1 font-medium text-[14px] rounded-lg",
    sm: "px-5 py-2.5 font-semibold text-[14px] rounded-2xl",
    md: "px-10 py-4 font-bold text-lg rounded-2xl",
  }[size];

  return (
    <Link className={`bg-black text-white ${sizeClasses}`} href={href}>
      {children}
    </Link>
  );
}
