import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen p-4 gap-4">
      <div className="hidden md:block relative w-[300px] h-[556px] rounded-3xl overflow-hidden">
        <Image
          className="object-cover"
          src="/bg-right-signup.png"
          fill
          loading="eager"
          alt="Login left image"
        />
      </div>
      <div className="flex items-center justify-center">
        <SignUp />
      </div>
    </section>
  );
}
