import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="max-w-7xl mx-auto bg-background-showcase">
      <section className="px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-6 col-span-2">
          <h3 className="font-extrabold text-2xl">FinTrack</h3>
          <p className="text-base text-secondary ">
            La plataforma definitiva para gestionar tus finanzas personales con
            inteligencia y estilo.
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Image
                src="/share-icon.svg"
                alt="Share Icon"
                width={40}
                height={40}
              />
            </Link>
            <Link href="/">
              <Image
                src="/links-icon.svg"
                alt="Links Icon"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-base mb-4">Producto</h3>
          <ul className="text-sm text-secondary flex flex-col gap-2 ">
            <li>Funcionalidades</li>
            <li>Seguridad</li>
            <li>Empresas</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-base mb-4">Legal</h3>
          <ul className="text-sm text-secondary flex flex-col gap-2 ">
            <li>Funcionalidades</li>
            <li>Seguridad</li>
            <li>Empresas</li>
          </ul>
        </div>
      </section>
      <section className="px-12 py-8 flex justify-between">
        <div>
          <span className="text-sm text-secondary">
            © 2024 FinTrack Intelligence. Todos los derechos reservados.
          </span>
        </div>
        <div>
          <span className="text-sm text-secondary">
            Hecho con ❤️ por Diego Cuevas
          </span>
          </div>
      </section>
    </footer>
  );
};
