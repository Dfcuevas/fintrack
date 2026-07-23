"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  name: string;
  iconWhite: string;
  iconGray: string;
};

export function NavLink({ href, name, iconWhite, iconGray }: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li
      className={`rounded-md px-3 py-3 text-sm font-medium flex gap-2  ${isActive ? "text-white bg-primary" : "text-secondary"}`}
    >
      <Link className="flex items-center gap-2 cursor-pointer" href={href}>
        <Image
          src={isActive ? iconWhite : iconGray}
          alt=""
          width={18}
          height={18}
        />
        {name}
      </Link>
    </li>
  );
}
