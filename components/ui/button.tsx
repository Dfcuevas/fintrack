import Link from "next/link";

const Button = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      className="bg-black text-white font-semibold px-5 py-2.5 rounded-2xl"
      href={href}
    >
  {children}
    </Link>
  );
};

export default Button;
