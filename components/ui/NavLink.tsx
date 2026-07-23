"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  name: string;
  icon_white: string;
  icon_gray: string;
};

export function NavLink({ href, name, icon_white, icon_gray }: NavLinkProps) {
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
          src={isActive ? icon_white : icon_gray}
          alt=""
          width={18}
          height={18}
        />
        {name}
      </Link>
    </li>
  );
}
