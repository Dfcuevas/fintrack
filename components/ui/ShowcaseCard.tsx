import Image from "next/image";

export function ShowcaseCard() {
  return (
    <div className="bg-white p-6 rounded-3xl flex flex-col flex-1 max-w-124 gap-6 rotate-2 shadow-(--showcaseCard-shadow-1)">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Ultimos movimientos</h1>
        </div>
        <div>
          <Image
            src={"dots-icon.svg"}
            alt="Icono de puntos"
            width={16}
            height={4}
          />
        </div>
      </div>
      {/* Aca empieza el contenedor de las tarjetas */}
      <div className="flex flex-col gap-4">
        <div className="bg-cards p-3 rounded-2xl flex justify-between items-center">
          <div className="flex gap-3">
            <Image
              src={"shopingcart-icon-circle.svg"}
              alt="Icono de carrito de compras"
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm">Supermercado Central</span>
              <span className="text-xs">Hace dos horas · Colombia</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-base text-text-red">-$64.20</span>
          </div>
        </div>

        <div className="bg-cards p-3 rounded-2xl flex justify-between items-center">
          <div className="flex gap-3">
            <Image
              src={"money-icon-circle.svg"}
              alt="Icono de carrito de compras"
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm">Transferencia Recibida</span>
              <span className="text-xs">Ayer · Ingresos</span>
            </div>
          </div>
          <div>
            <span className="font-bold text-base text-text-green">
              +$1,200.00
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 justify-center pt-4">
        <Image
          src={"/cruz-icon.svg"}
          alt="Icono de cruz"
          width={14}
          height={14}
        />
        <span className="font-bold text-sm text-primary">
          Añadir Transaccion
        </span>
      </div>
    </div>
  );
}
