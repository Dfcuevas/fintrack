"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "#features", label: "Funciones" },
  { href: "#pricing", label: "Planes" },
  { href: "#about", label: "Nosotros" },
];

export default function Header() {
  return (
    <header className="px-8 py-4">
      <div className="mx-auto flex h-16 items-center justify-between">
        <Link href="/" aria-label="Ir al inicio">
          <Image
            src="/Container.svg"
            alt="Logo Fintrack"
            width="100"
            height="50"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
