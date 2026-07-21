import Image from "next/image";
import { ShowcaseCard } from "../ui/ShowcaseCard";

export function ShowcaseSection() {
  return (
    <section className="py-24 bg-background-showcase rounded-3xl">
      <div className="max-w-296 px-16 mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Aca va el texto de showcase izquierda */}
        <div className="flex flex-col flex-1 gap-8">
          <h2 className="font-extrabold text-4xl ">
            Registro instantáneo, balance inteligente.
          </h2>
          <p className="text-lg text-secondary">
            Añadir una transacción es tan natural como enviar un mensaje.
            FinTrack categoriza automáticamente tus movimientos y actualiza tu
            balance neto en tiempo real.
          </p>
          <ul>
            <li className="flex gap-3 mb-4">
              <Image
                src={"/Icon-check.svg"}
                alt="Just a check icon"
                width="20"
                height="20"
              />
              <span>Categorizacion automatica por IA</span>
            </li>
            <li className="flex gap-3 mb-4">
              <Image
                src={"/Icon-check.svg"}
                alt="Just a check icon"
                width="20"
                height="20"
              />
              <span>Sincronizacion multi-dispositivo</span>
            </li>
            <li className="flex gap-3 mb-4">
              <Image
                src={"/Icon-check.svg"}
                alt="Just an check icon"
                width="20"
                height="20"
              />
              <span>Reportes semanales personalizados</span>
            </li>
          </ul>
        </div>
        {/* Aca va la tarjeta de showcase derecha */}
        <ShowcaseCard />
      </div>
    </section>
  );
}
