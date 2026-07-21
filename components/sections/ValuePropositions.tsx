import { ValuePropositionItem } from "../ui/ValuePropositionItem";

const valuePropositions = [
  {
    title: "Claridad Absoluta",
    description:
      "Analítica visual de alta fidelidad que transforma números complejos en gráficos intuitivos. Identifica patrones de gasto en segundos.",
    icon: "/first-icon-proposition.svg",
  },
  {
    title: "Seguridad de Grado Bancario",
    description:
      "Tus datos están encriptados y protegidos con los estándares más altos de la industria. Privacidad total como pilar fundamental.",
    icon: "/second-icon-proposition.svg",
  },
  {
    title: "Sin Distracciones",
    description:
      "Experiencia pura centrada en tus finanzas. Sin anuncios, sin ofertas irrelevantes y sin interrupciones. Solo tú y tus metas.",
    icon: "/third-icon-proposition.svg",
  },
];

export function ValuePropositions() {
  return (
    <section className="py-20">
      <div className="max-w-296 mx-auto px-4 md:px-8 grid lg:grid-cols-2 xl:grid-cols-3 gap-12">
        {valuePropositions.map((item) => (
          <ValuePropositionItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
