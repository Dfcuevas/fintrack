"use client";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export function SignOutControl() {
  return (
    <SignOutButton redirectUrl="/">
      <button type="button" className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/logout-icon.svg"
          alt=""
          width={18}
          height={18}
        />
        Sign Out
      </button>
    </SignOutButton>
  );
}
