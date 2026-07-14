"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";

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
        <Link href="/dashboard" aria-label="Ir al dashboard">
          Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-bold text-primary hover:text-gray-900"
          >
            Sign In
          </Link>
          <Button href="/sign-up">Crear Cuenta</Button>
        </div>
      </div>
    </header>
  );
}
