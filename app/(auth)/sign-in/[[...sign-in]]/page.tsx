import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen p-4 gap-4">
      <div className="flex items-center justify-center">
        <SignIn />
      </div>
      <div className="hidden md:block relative w-[257px] h-[508px] rounded-3xl overflow-hidden">
        <Image
          className="object-cover"
          src="/login-left-image.png"
          fill
          loading="eager"
          alt="Login left image"
        />
      </div>
    </section>
  );
}
