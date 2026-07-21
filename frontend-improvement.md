# Informe de Mejora Frontend — FinTrack

## Resumen Ejecutivo

Este documento recoge observaciones sobre la estructura actual del frontend, oportunidades de mejora en organización de componentes, convenciones de código y buenas prácticas. Cada sección incluye el problema detectado, por qué es relevante, y cómo implementarlo.

---

## 1. Estructura de Componentes

### 1.1. Componentes `layout/` vs `ui/` — mezcla de responsabilidades

**Problema:** Actualmente la carpeta `components/layout/` contiene tanto componentes de layout puro (Header, Footer) como secciones de página completas (MainSection, ShowcaseSection, ValuePropositions, SocialProofStats). No hay una separación clara entre "qué es un layout" y "qué es una sección de contenido".

**Archivos afectados:**
- `components/layout/MainSection.tsx` — es una hero section, no un layout
- `components/layout/ShowcaseSection.tsx` — es una sección de contenido
- `components/layout/ValuePropositions.tsx` — es una sección de contenido
- `components/layout/SocialProofStats.tsx` — es una sección de contenido

**Propuesta:**

```
components/
├── layout/          # Solo estructura de layout puro
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── MainLayout.tsx  (opcional, si se necesita wrapper global)
├── sections/        # Secciones reutilizables de landing/page
│   ├── HeroSection.tsx
│   ├── ValuePropositionsSection.tsx
│   ├── ShowcaseSection.tsx
│   └── SocialProofStats.tsx
├── ui/              # Componentes atómicos reutilizables
│   ├── Button.tsx
│   ├── ShowcaseCard.tsx
│   └── ValuePropositionItem.tsx
└── features/        # Componentes de feature específico (futuro)
    ├── transactions/
    ├── budgets/
    └── analytics/
```

**Cómo implementar:**
1. Mover los archivos de sección a `components/sections/`
2. Actualizar imports en `app/page.tsx`
3. Renombrar `MainSection.tsx` → `HeroSection.tsx` (nombre más descriptivo)

### 1.2. Nombre de archivos — inconsistencia con PascalCase

**Problema:** En `components/ui/`, el componente `button.tsx` usa minúscula, mientras que `ShowcaseCard.tsx` y `ValuePropositionItem.tsx` usan PascalCase. En `components/layout/`, todos están en PascalCase.

**Convención recomendada:** PascalCase para archivos de componentes (`Button.tsx`, `ShowcaseCard.tsx`, etc.). Esto es el estándar en proyectos Next.js/React y coincide con el nombre del componente exportado.

**Archivos a renombrar:**
- `components/ui/button.tsx` → `components/ui/Button.tsx`

### 1.3. Header usa `"use client"` innecesariamente

**Problema:** `components/layout/Header.tsx` está marcado como Client Component (`"use client"`), pero no usa hooks de React ni estado. Solo renderiza JSX estático con `Link` e `Image`.

**Impacto:** Rendimiento. Los Client Components no pueden ser renderizados en el servidor, aumentando el JS enviado al cliente y bloqueando la hidratación.

**Cómo implementar:** Eliminar `"use client"` del Header. Si en el futuro se necesita interactividad (ej. menú hamburguesa, estado de autenticación), se puede convertir a Client Component en ese momento, o mejor aún, extraer solo la parte interactiva a un subcomponente con `"use client"`.

### 1.4. ShowcaseCard — estructura duplicada y datos hardcodeados

**Problema:** El componente `ShowcaseCard.tsx` tiene dos items de transacción hardcodeados con markup casi idéntico. Esto es propenso a errores y difícil de mantener.

**Cómo implementar:** Extraer los items a un array de datos y mapearlos:

```tsx
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
```

Mapear con `transactions.map(...)`. Esto prepara el componente para recibir datos reales desde una base de datos en el futuro.

---

## 2. Layout y Páginas

### 2.1. Root layout sin `<html>` lang dinámico

**Problema:** El `lang="en"` está hardcodeado. Si la app es en español (como sugieren los textos), debería ser `lang="es"`. Si es multilingüe, debería ser dinámico.

**Cómo implementar:** Cambiar a `lang="es"` o usar `params` de Next.js con `next-intl` o similar si se planea i18n.

### 2.2. Faltan meta tags esenciales

**Problema:** El metadata solo tiene `title` y `description`. Falta:
- `openGraph` tags (para compartir en redes sociales)
- `theme-color` (para el navegador móvil)

**Cómo implementar:** Enriquecer el objeto `metadata` en `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "FinTrack",
  description: "La plataforma definitiva para gestionar tus finanzas personales con inteligencia y estilo.",
  openGraph: {
    title: "FinTrack",
    description: "Gestiona tus finanzas personales con inteligencia y estilo.",
    type: "website",
  },
};
```

Los tags `robots` no se agregan en el layout raíz porque Next.js ya indexa por defecto. Solo tienen sentido en páginas específicas que deban bloquearse (ej. `sign-in`, `sign-up`), donde se puede agregar `robots: { index: false }` localmente.

### 2.3. Páginas de auth — inconsistencias visuales

**Problema:** Las páginas `sign-in/` y `sign-up/` tienen estilos ligeramente diferentes:
- `sign-in`: imagen de 257×508px a la derecha
- `sign-up`: imagen de 300×556px a la izquierda
- La imagen de sign-up tiene `alt="Login left image"` (copia de sign-in)

**Cómo implementar:** Crear un layout compartido para auth:

```
app/(auth)/
├── layout.tsx         # Layout común con imagen y estructura
├── sign-in/
│   └── page.tsx       # Solo el formulario
└── sign-up/
│   └── page.tsx       # Solo el formulario
```

El `layout.tsx` de `(auth)` envolvería ambas páginas con la estructura visual compartida, eliminando duplicación.

### 2.4. Alt texts mejorables

**Problema:** Varios `alt` en imágenes son genéricos o incorrectos:
- `alt="Just an check icon"` (error gramatical: "an check")
- `alt="Icono de carrito de compras"` en un icono de dinero
- `alt="Login left image"` en sign-up

Los `alt` textos deben ser descriptivos y únicos para accesibilidad y SEO.

---

## 3. Convenciones de Código

### 3.1. Preferir named exports sobre default exports

**Problema:** Actualmente hay mezcla de `export default function`, `export default () =>`, y `export function` (named). Esto genera fricción: al importar, el nombre puede no coincidir con el componente, y los refactors son más riesgosos.

**Recomendación:** Usar **named exports** para todo componente que no sea page/layout/loading/error de Next.js (que por convención de framework sí requieren `default export`).

Para el resto (HeroSection, ShowcaseCard, ValuePropositionItem, Button, etc.):

```tsx
// ✅ Preferido
export function HeroSection() { ... }
// import { HeroSection } from "./HeroSection";

// ❌ Evitar
export default function HeroSection() { ... }
// import CualquierNombre from "./HeroSection";  // el nombre puede no coincidir
```

Beneficios: mejor autocompletado en el editor, refactors más seguros (renombrar no rompe imports), consistencia con la recomendación de Airbnb/ESLint `react/function-component-definition`.

### 3.2. Fragment en page.tsx

**Problema:** En `app/page.tsx`, el contenido está envuelto en un fragment `<>...</>`. Dado que solo hay un `<main>` y elementos adyacentes (`<Header />`, `<Footer />`), el fragment es necesario, pero se puede estructurar mejor.

**Cómo implementar:** Crear un layout específico para el landing page o simplemente mantener el fragment, pero asegurar que el `<main>` esté semánticamente correcto.

### 3.3. Header con margen horizontal inconsistente

**Problema:** El Header usa `px-8` en el `header` y `max-w-7xl mx-auto` en el contenedor interno. El `<main>` de la landing page usa `px-12`. Esto significa que el padding horizontal del header no coincide con el del main.

```tsx
// Header
<header className="px-8 py-4 max-w-7xl mx-auto shadow-(--header-shadow)">

// Main (page.tsx)
<main className="max-w-7xl mx-auto px-12 bg-accent">
```

**Cómo implementar:** Unificar el padding: quitar `px-8` del header y ponerlo solo en el contenedor interno, o sincronizar ambos. Mejor aún: definir el padding a nivel de layout para que sea consistente en toda la app.

### 3.4. Background-color en main en lugar de sección

**Problema:** `app/page.tsx` asigna `bg-accent` al `<main>`. Esto hace que toda el área del main tenga ese color, pero probablemente solo ciertas secciones deberían tenerlo (por ejemplo, cada sección define su propio fondo en su componente).

Actualmente `MainSection.tsx` **no** tiene bg definido (hereda el `bg-accent` del main), y `ShowcaseSection.tsx` sí define `bg-background-showcase`. Esto es confuso porque el fondo de MainSection viene del padre.

**Cómo implementar:** Quitar `bg-accent` del `<main>` y asignar fondos específicos a cada sección. Cada sección debe ser autónoma en su estilo.

---

## 4. Estilos y Tailwind

### 4.1. Uso de valores mágicos en Tailwind

**Problema:** Se usan clases como `max-w-296`, `max-w-124`, `gap-16` que no están definidas en el tema de Tailwind. Estas clases no producen ningún efecto porque Tailwind 4 no tiene esos valores por defecto.

**Archivos afectados:**
- `ShowcaseSection.tsx`: `max-w-296`, `gap-16`
- `ShowcaseCard.tsx`: `max-w-124`
- `ValuePropositions.tsx`: `max-w-296`

**Cómo implementar:** Definir estos valores en `globals.css` bajo `@theme`:

```css
@theme inline {
  /* ...existing tokens... */
  --container-296: 74rem;   /* 1184px */
  --container-124: 31rem;   /* 496px */
  --spacing-16: 4rem;       /* 64px */
}
```

O, alternativamente, usar clases estándar de Tailwind como `max-w-7xl` o `max-w-6xl`.

### 4.2. Propiedades CSS --header-shadow y --showcaseCard-shadow duplicadas

**Problema:** Las variables `--header-shadow` y `--showcaseCard-shadow-1`/`--showcaseCard-shadow-2` están definidas en `:root` como variables CSS planas, pero podrían integrarse en el tema `@theme` de Tailwind para ser usadas con la sintaxis `shadow-(--name)`.

Actualmente ya se usan así (`shadow-(--header-shadow)`), lo cual funciona, pero es más limpio definirlas como tokens del tema:

```css
@theme inline {
  --shadow-header: 0px 4px 12px 0px rgba(15, 23, 42, 0.05);
  --shadow-showcase-1: 0px 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-showcase-2: 0px 8px 10px -6px rgba(0, 0, 0, 0.01);
}
```

Y usarlas: `shadow-header` en lugar de `shadow-(--header-shadow)`.

### 4.3. Sin soporte de modo oscuro

**Problema:** No hay indicación de que el proyecto soporte modo oscuro. Los colores están hardcodeados para un tema claro.

**Cómo implementar:** Si se planea dark mode, considerar usar `dark:` variantes de Tailwind o CSS custom properties que cambien según `prefers-color-scheme`.

---

## 5. Rendimiento y SEO

### 5.1. Imágenes sin `sizes` en ShowcaseCard y ValuePropositionItem

**Problema:** Varias imágenes en ShowcaseCard y ValuePropositionsSection no especifican el atributo `sizes`. Esto puede provocar que el navegador descargue imágenes más grandes de lo necesario.

**Archivos afectados:** `ShowcaseCard.tsx` (todos los `Image`), `ValuePropositionItem.tsx`

**Cómo implementar:** Agregar `sizes` a todas las imágenes. Para iconos pequeños (40×40 o 56×56), `sizes` no es crítico, pero es buena práctica incluirlo.

### 5.2. Lighthouse: Estructura de títulos (headings)

**Problema:** En la landing page, tanto `HeroSection` como `ShowcaseSection` y `ValuePropositionItem` usan `<h1>`. Solo debería haber un `<h1>` por página.

**Cómo implementar:**
- `HeroSection`: `<h1>` (el título principal de la página)
- `ShowcaseSection`: `<h2>` (subtítulo de sección)
- `ValuePropositionItem`: `<h3>` (ítem dentro de una sección)
- `ShowcaseCard`: `<h2>` (o `<h3>` si está dentro de ShowcaseSection)

### 5.3. Componentes sin `<section>` semántico

**Problema:** `ValuePropositions.tsx` usa un `<section>`, pero `ShowcaseSection.tsx` también usa `<section>` — correcto. Sin embargo, ambas están dentro de un `<main>` que ya tiene `bg-accent`, y `ShowcaseSection` sobrescribe con su propio bg.

No hay problema grave aquí, pero vale la pena verificar que la jerarquía semántica sea correcta: `main > section > article` es correcto para `ValuePropositionsSection > ValuePropositionItem`.

---

## 6. Organización de Código Futuro

### 6.1. Falta carpeta `features/`

**Problema:** Cuando la app crezca (dashboard, transacciones, presupuestos, analytics), los componentes relacionados a cada feature estarán dispersos.

**Propuesta:** Adoptar una estructura basada en features:

```
components/
├── features/
│   ├── dashboard/
│   │   └── BalanceWidget.tsx
│   ├── transactions/
│   │   ├── TransactionList.tsx
│   │   └── TransactionForm.tsx
│   └── budgets/
│       ├── BudgetCard.tsx
│       └── BudgetProgress.tsx
├── sections/
├── ui/
└── layout/
```

Esto mantiene los componentes cerca de su dominio y facilita la navegación.

### 6.2. Barrel exports — no implementar (o muy selectivo)

**Decisión:** No se recomienda usar barrel files (`index.ts` que re-exportan todo) en este proyecto.

Los barrel files tienen un problema documentado en 2026: rompen tree-shaking y ralentizan el dev server, especialmente con Turbopack/Webpack en proyectos que crecen. Cada import desde un barrel obliga al bundler a resolver el archivo completo aunque solo necesites un componente.

En su lugar, se mantienen los **imports directos** como ya están:

```tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
```

Si el ruido visual de múltiples imports molesta, el auto-import del editor (VS Code, Zed) resuelve los componentes automáticamente al escribir el nombre. Barrel exports solo tendrían sentido en `ui/` si esa carpeta se mantiene pequeña y estable — no en `sections/` o `features/` que van a crecer.

---

## 7. Resumen de Acciones Prioritarias

| Prioridad | Acción | Archivos afectados | Dificultad |
|-----------|--------|-------------------|------------|
| 🔴 Alta | Reorganizar `layout/` → `sections/` | 5 archivos | Baja |
| 🔴 Alta | Corregir clases Tailwind inexistentes (`max-w-296`, etc.) | 3 archivos + globals.css | Baja |
| 🔴 Alta | Unificar fondos (quitar `bg-accent` del main) | `app/page.tsx`, secciones | Baja |
| 🟡 Media | Eliminar `"use client"` de Header | `Header.tsx` | Baja |
| 🟡 Media | Estandarizar PascalCase en nombres de archivo | `button.tsx` | Baja |
| 🟡 Media | Extraer datos hardcodeados en ShowcaseCard | `ShowcaseCard.tsx` | Baja |
| 🟡 Media | Migrar a named exports (excepto page/layout de Next.js) | Todos los componentes | Media |
| 🟢 Baja | Jerarquía de headings (h1, h2, h3) | 3 componentes | Baja |
| 🟢 Baja | Enriquecer metadata SEO (openGraph) | `app/layout.tsx` | Baja |
| 🟢 Baja | Layout compartido para auth | `app/(auth)/` | Media |
| 🟢 Baja | Agregar tokens de tema faltantes | `globals.css` | Baja |

---

## 8. Conclusión

El proyecto tiene una base sólida: buen uso de Server Components, Drizzle ORM bien configurado, Clerk integrado correctamente, y una estructura de carpetas limpia en términos generales. Las mejoras propuestas se centran en:

1. **Consolidar la estructura de componentes** con una separación clara entre layout, secciones y UI atómica
2. **Corregir inconsistencias** de estilos (clases Tailwind inválidas, fondos, paddings)
3. **Mejorar convenciones** (named exports, PascalCase en archivos, consistencia)
4. **Preparar para escalar** con una estructura basada en features, evitando barrel files
