import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="max-w-7xl py-24">
      <div className="max-w-3xl mx-auto text-center pb-16">
        <h1 className="font-extrabold text-6xl">
          Toma el control total de tu{" "}
          <span className="text-primary">futuro financiero</span>{" "}
        </h1>
        <p className="my-6 text-xl text-secondary">
          La inteligencia fiscal se une a la simplicidad absoluta. Visualiza tus
          gastos, optimiza tus ahorros y alcanza tus metas con una herramienta
          diseñada para la precisión y la claridad.
        </p>
        <div className="flex gap-4 justify-center items-center pt-4">
          <Button href="/" size="md">
            Comienza Gratis
          </Button>
          <Link
            href={"/"}
            className="border py-4 px-10 rounded-2xl border-stroke font-semibold"
          >
            Ver Demo
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <Image
          className="object-contain w-full h-auto"
          src="/dashboard-hero-img.svg"
          width={1200}
          height={675}
          alt="Hero image Dashboard"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
      </div>
    </section>
  );
}
