import Image from "next/image";

const transactions = [
  {
    icon: "/shopingcart-icon-circle.svg",
    title: "Supermercado Central",
    subtitle: "Hace dos horas · Colombia",
    amount: "-$64.20",
    amountClass: "text-text-red",
  },
  {
    icon: "/money-icon-circle.svg",
    title: "Transferencia Recibida",
    subtitle: "Ayer · Ingresos",
    amount: "+$1,200.00",
    amountClass: "text-text-green",
  },
];

export function ShowcaseCard() {
  return (
    <div className="bg-white p-6 rounded-3xl flex flex-col flex-1 max-w-124 gap-6 rotate-2 shadow-showcase-1">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Ultimos movimientos</h3>
        </div>
        <div>
          <Image
            src={"dots-icon.svg"}
            alt="Icono de puntos"
            width={16}
            height={4}
            sizes="16px"
          />
        </div>
      </div>
      {/* Aca empieza el contenedor de las tarjetas */}
      <div className="flex flex-col gap-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-cards p-3 rounded-2xl flex justify-between items-center"
          >
            <div className="flex gap-3">
              <Image
                src={transaction.icon}
                alt="Icono de carrito de compras"
                width={40}
                height={40}
                sizes="40px"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm">{transaction.title}</span>
                <span className="text-xs">{transaction.subtitle}</span>
              </div>
            </div>
            <div>
              <span
                className={`font-bold text-base ${transaction.amountClass}`}
              >
                {transaction.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 justify-center pt-4">
        <Image
          src={"/cruz-icon.svg"}
          alt="Icono de cruz"
          width={14}
          height={14}
          sizes="14px"
        />
        <span className="font-bold text-sm text-primary">
          Añadir Transaccion
        </span>
      </div>
    </div>
  );
}
