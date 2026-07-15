import Image from "next/image";

const MainSection = () => {
  return (
    <section className="max-w-7xl pt-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-extrabold text-6xl">
          Toma el control total de tu{" "}
          <span className="text-primary">futuro financiero</span>{" "}
        </h1>
        <p className="my-6">
          La inteligencia fiscal se une a la simplicidad absoluta. Visualiza tus
          gastos, optimiza tus ahorros y alcanza tus metas con una herramienta
          diseñada para la precisión y la claridad.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <Image
          className="object-contain w-full h-auto"
          src="/dashboard-hero-img.svg"
          width={1200}
          height={675}
          alt="Hero image Dashboard"
          sizes="(max-width: 640px) 100vw, 720px"
          priority
        />
      </div>
    </section>
  );
};

export default MainSection;
