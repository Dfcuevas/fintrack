import Link from "next/link";

type ButtonPadding = "sm" | "md";

const Button = ({
  href,
  children,
  size,
}: {
  size: ButtonPadding;
  href: string;
  children: React.ReactNode;
}) => {
  const sizeClasses = {
    sm: "px-5 py-2.5 font-semibold text-[14px]",
    md: "px-10 py-4 font-bold text-lg",
  }[size];

  return (
    <Link
      className={`bg-black text-white rounded-2xl ${sizeClasses}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Button;
