import Image from "next/image";

interface ValuePropositionItemProps {
  title: string;
  description: string;
  icon: string;
}

export default function ValuePropositionItem({
  title,
  description,
  icon,
}: ValuePropositionItemProps) {
  return (
    <article className="flex flex-col gap-4">
      <Image src={icon} alt="Just an Icon" width="56" height="56" />
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-base text-secondary">{description}</p>
    </article>
  );
}
