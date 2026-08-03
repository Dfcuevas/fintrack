"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export function useDebouncedSearch(
  paramName: string = "q",
  delayMs: number = 400,
) {
  const router = useRouter(); // useRouter permite de forma programática navegar entre páginas y actualizar la URL sin recargar la página completa.
  const pathname = usePathname(); // usePathname devuelve la ruta actual de la página, lo que permite construir URLs relativas y mantener la navegación dentro de la aplicación.
  const searchParams = useSearchParams(); // useSearchParams devuelve un objeto URLSearchParams que representa los parámetros de búsqueda actuales en la URL, lo que permite leer y modificar los parámetros de búsqueda de manera reactiva.
  const [isPending, startTransition] = useTransition(); // useTransition permite diferir la actualización de la interfaz de usuario mientras se realiza una transición, lo que mejora la experiencia del usuario al evitar bloqueos de renderizado durante operaciones costosas.

  const currentValue = searchParams.get(paramName) ?? "";

  const setValue = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router, paramName],
  );
  return { value: currentValue, setValue, isPending };
}
