# Guía de Estilos — FinTrack (Tailwind CSS v4)

> Esta guía está adaptada a la configuración real del proyecto:
> Tailwind CSS v4, Next.js 16 (App Router), fuentes variables de Google Fonts (Geist).

---

## Índice

1. [¿Cómo funciona Tailwind?](#1-cómo-funciona-tailwind)
2. [Tailwind v4 vs v3 — diferencias clave](#2-tailwind-v4-vs-v3--diferencias-clave)
3. [El archivo globals.css — tu centro de control](#3-el-archivo-globalscss--tu-centro-de-control)
4. [Fuentes variables (ya configuradas en el proyecto)](#4-fuentes-variables-ya-configuradas-en-el-proyecto)
5. [Temas y tokens de diseño con @theme](#5-temas-y-tokens-de-diseño-con-theme)
6. [Dark mode](#6-dark-mode)
7. [Responsive design](#7-responsive-design)
8. [Estados interactivos](#8-estados-interactivos)
9. [Componentes con clases reutilizables (@apply)](#9-componentes-con-clases-reutilizables-apply)
10. [Espaciado y layout](#10-espaciado-y-layout)
11. [Tipografía](#11-tipografía)
12. [Colores](#12-colores)
13. [Animaciones y transiciones](#13-animaciones-y-transiciones)
14. [Buenas prácticas y errores comunes](#14-buenas-prácticas-y-errores-comunes)
15. [Referencia rápida de clases más usadas](#15-referencia-rápida-de-clases-más-usadas)

---

## 1. ¿Cómo funciona Tailwind?

Tailwind es un framework **utility-first**: en vez de escribir CSS en archivos separados,
aplicas pequeñas clases utilitarias directamente en tu HTML/JSX.

```tsx
// ❌ CSS tradicional
<button className="btn-primary">Guardar</button>

// ✅ Tailwind utility-first
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
  Guardar
</button>
```

**Ventajas:**
- No tienes que inventar nombres de clases CSS.
- No hay archivos CSS que crecer sin control.
- El CSS final generado solo incluye las clases que realmente usas (tree-shaking automático).

---

## 2. Tailwind v4 vs v3 — diferencias clave

Este proyecto usa **Tailwind CSS v4**, que tiene diferencias importantes respecto a v3.

| Característica | v3 | v4 (tu proyecto) |
|---|---|---|
| Config principal | `tailwind.config.js` | `globals.css` con `@theme` |
| Import en CSS | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Definir tokens | `theme.extend` en JS | `@theme` en CSS |
| Plugin PostCSS | `tailwindcss` | `@tailwindcss/postcss` |
| Paleta de colores | Incluida por defecto | Solo OKLCH por defecto |

> **Regla de oro en v4:** todo se configura en `globals.css`, no en un archivo JS.

---

## 3. El archivo globals.css — tu centro de control

Este es el estado actual de tu `globals.css`. Está casi vacío — aquí es donde debes
definir todos los tokens de tu diseño.

```css
/* Estado actual */
@import "tailwindcss";

:root {
}

@theme inline {
}

body {
  font-family: Arial, Helvetica, sans-serif; /* ⚠️ mejorar (ver sección 4) */
}
```

La estructura recomendada es:

```css
@import "tailwindcss";

/* 1. Tokens de diseño (colores, fuentes, espaciado...) */
@theme inline {
  /* aquí van tus variables de diseño */
}

/* 2. Variables CSS globales si necesitas */
:root {
}

/* 3. Estilos base para elementos HTML */
@layer base {
}

/* 4. Componentes reutilizables */
@layer components {
}

/* 5. Utilidades personalizadas */
@layer utilities {
}
```

---

## 4. Fuentes variables (ya configuradas en el proyecto)

En tu `layout.tsx` ya tienes configuradas las fuentes **Geist** (sans) y **Geist Mono**
como fuentes variables de Google Fonts. Esto expone variables CSS: `--font-geist-sans`
y `--font-geist-mono`.

El problema actual: `globals.css` usa `Arial` en `body` en vez de las fuentes cargadas.

### Cómo conectarlas correctamente

**Paso 1 — Registra las fuentes en `@theme`:**

```css
/* globals.css */
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

@layer base {
  body {
    font-family: var(--font-sans);
  }
}
```

**Paso 2 — Usar en componentes:**

```tsx
// Fuente sans (predeterminada)
<p className="font-sans">Texto normal</p>

// Fuente mono (para código, cifras financieras)
<span className="font-mono">$1.250.000</span>
```

### ¿Qué son las fuentes variables?

Una fuente variable es un único archivo de fuente que contiene **todos los pesos y estilos**
(thin, regular, bold, italic...) en lugar de un archivo por variante.

```tsx
// Con una fuente variable puedes usar cualquier peso
<p className="font-thin">100</p>
<p className="font-normal">400</p>
<p className="font-semibold">600</p>
<p className="font-black">900</p>

// Incluso pesos intermedios no estándar con CSS
<p style={{ fontWeight: 550 }}>peso intermedio</p>
```

---

## 5. Temas y tokens de diseño con @theme

`@theme` es donde defines el **sistema de diseño** del proyecto: colores, fuentes, tamaños,
sombras, bordes redondeados, etc. Cada variable que defines aquí se convierte
automáticamente en una clase Tailwind utilizable.

### Colores

```css
@theme inline {
  /* Colores de marca */
  --color-primary:   oklch(55% 0.2 250);   /* azul */
  --color-secondary: oklch(70% 0.15 180);  /* verde */
  --color-accent:    oklch(65% 0.22 30);   /* naranja */

  /* Semánticos (para finanzas) */
  --color-income:    oklch(60% 0.18 145);  /* verde ingreso */
  --color-expense:   oklch(55% 0.22 25);   /* rojo gasto */
  --color-neutral:   oklch(50% 0.01 260);  /* gris neutro */

  /* Fondos y superficies */
  --color-background: oklch(98% 0.005 260);
  --color-surface:    oklch(100% 0 0);
  --color-border:     oklch(88% 0.01 260);

  /* Texto */
  --color-text-primary:   oklch(15% 0.01 260);
  --color-text-secondary: oklch(45% 0.01 260);
  --color-text-muted:     oklch(65% 0.01 260);
}
```

Ahora puedes usar en JSX:
```tsx
<div className="bg-background text-text-primary border border-border">
  <span className="text-income">+$500.000</span>
  <span className="text-expense">-$120.000</span>
</div>
```

### ¿Qué es OKLCH?

Es el espacio de color moderno que usa Tailwind v4. Es más preciso y perceptualmente
uniforme que HEX o HSL.

```
oklch(Luminosidad% Croma Matiz)
```

- **Luminosidad**: 0% = negro, 100% = blanco
- **Croma**: 0 = gris sin color, ~0.37 = máximo saturado
- **Matiz**: 0-360 grados (0=rojo, 120=verde, 240=azul...)

Puedes usar [oklch.com](https://oklch.com) para elegir colores visualmente.

### Tamaños de borde redondeado

```css
@theme inline {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
}
```

```tsx
<button className="rounded-md">Botón</button>
<div className="rounded-xl">Card</div>
<span className="rounded-full">Badge</span>
```

### Sombras personalizadas

```css
@theme inline {
  --shadow-card: 0 1px 3px oklch(0% 0 0 / 8%), 0 4px 12px oklch(0% 0 0 / 5%);
  --shadow-modal: 0 8px 32px oklch(0% 0 0 / 20%);
}
```

```tsx
<div className="shadow-card">Card financiera</div>
```

---

## 6. Dark mode

En Tailwind v4, el dark mode se activa con el prefijo `dark:`. Puedes configurarlo
de dos formas:

### Opción A — Por preferencia del sistema (recomendada para empezar)

```css
/* globals.css */
@import "tailwindcss";

/* Tailwind detecta prefers-color-scheme automáticamente */
```

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Contenido
</div>
```

### Opción B — Por clase (recomendada para apps con toggle manual)

```css
/* globals.css */
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));
```

Con esto activas el modo oscuro poniendo `className="dark"` en el `<html>`:

```tsx
// layout.tsx
<html className={`${geistSans.variable} ${geistMono.variable} dark`}>
```

### Tokens para dark mode

La forma más limpia es definir tokens semánticos con variables CSS:

```css
@layer base {
  :root {
    --bg: oklch(98% 0.005 260);
    --fg: oklch(15% 0.01 260);
    --surface: oklch(100% 0 0);
  }

  .dark {
    --bg: oklch(12% 0.01 260);
    --fg: oklch(95% 0.005 260);
    --surface: oklch(18% 0.01 260);
  }
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-surface: var(--surface);
}
```

```tsx
<body className="bg-bg text-fg">
  <div className="bg-surface">Card</div>
</body>
```

---

## 7. Responsive design

Tailwind usa **mobile-first**: sin prefijo = todos los tamaños, con prefijo = ese tamaño
en adelante.

### Breakpoints por defecto

| Prefijo | Mínimo | Equivale a... |
|---|---|---|
| (ninguno) | 0px | móvil |
| `sm:` | 640px | tablet pequeña |
| `md:` | 768px | tablet |
| `lg:` | 1024px | laptop |
| `xl:` | 1280px | desktop |
| `2xl:` | 1536px | pantalla grande |

```tsx
// Una columna en móvil, tres en desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>

// Texto pequeño en móvil, grande en desktop
<h1 className="text-2xl lg:text-4xl font-bold">FinTrack</h1>

// Padding progresivo
<section className="px-4 md:px-8 lg:px-16">
```

### Breakpoints personalizados

```css
@theme inline {
  --breakpoint-xs: 480px;
  --breakpoint-3xl: 1920px;
}
```

```tsx
<div className="xs:flex-row">
```

---

## 8. Estados interactivos

Los modificadores de estado se ponen como prefijo antes de la clase.

### Hover, focus, active

```tsx
<button className="
  bg-primary
  hover:bg-primary/90        /* hover: 90% opacidad */
  active:scale-95            /* active: se encoge */
  focus:outline-none
  focus:ring-2
  focus:ring-primary
  focus:ring-offset-2
  transition-all
  duration-150
">
  Guardar
</button>
```

### Disabled

```tsx
<button
  disabled
  className="bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
>
  Guardando...
</button>
```

### Inputs

```tsx
<input className="
  border border-border
  rounded-md
  px-3 py-2
  text-text-primary
  placeholder:text-text-muted
  focus:outline-none
  focus:border-primary
  focus:ring-1
  focus:ring-primary
  transition-colors
" />
```

### Group hover (hover en padre afecta al hijo)

```tsx
<div className="group flex items-center gap-2 p-3 rounded-lg hover:bg-surface cursor-pointer">
  <Icon className="text-text-muted group-hover:text-primary transition-colors" />
  <span className="group-hover:font-medium transition-all">Categoría</span>
</div>
```

### Peer (estado de un elemento afecta al siguiente)

```tsx
<input type="checkbox" className="peer hidden" id="toggle" />
<label htmlFor="toggle" className="cursor-pointer p-2 peer-checked:text-primary">
  Activo
</label>
```

---

## 9. Componentes con clases reutilizables (@apply)

Cuando un conjunto de clases se repite mucho, puedes extraerlo con `@apply`.

```css
/* globals.css */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-150 cursor-pointer;
  }

  .btn-primary {
    @apply btn bg-primary text-white hover:bg-primary/90 active:scale-95 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none;
  }

  .btn-outline {
    @apply btn border border-border text-text-primary hover:bg-surface;
  }

  .btn-ghost {
    @apply btn text-text-secondary hover:bg-surface hover:text-text-primary;
  }

  .card {
    @apply bg-surface rounded-xl border border-border shadow-card p-4;
  }

  .input {
    @apply w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors;
  }

  .badge-income {
    @apply inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-income/10 text-income;
  }

  .badge-expense {
    @apply inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-expense/10 text-expense;
  }
}
```

```tsx
// Uso limpio en JSX
<button className="btn-primary">Agregar gasto</button>
<div className="card">...</div>
<span className="badge-income">+Ingreso</span>
```

> **Tip**: No abuses de `@apply`. Úsalo solo para patrones que se repiten 3+ veces.
> Para uso único, las clases en JSX son preferibles.

---

## 10. Espaciado y layout

### Sistema de espaciado de Tailwind

Tailwind usa una escala de espaciado donde **1 unidad = 4px**.

| Clase | Valor |
|---|---|
| `p-1` | 4px |
| `p-2` | 8px |
| `p-4` | 16px |
| `p-6` | 24px |
| `p-8` | 32px |
| `p-12` | 48px |
| `p-16` | 64px |

### Padding y margin

```tsx
// Todos los lados
<div className="p-4 m-2">

// Ejes
<div className="px-6 py-3">  {/* horizontal / vertical */}

// Lados individuales
<div className="pt-2 pb-4 pl-3 pr-3">

// Margin auto (centrar)
<div className="mx-auto max-w-4xl">
```

### Flexbox

```tsx
// Fila centrada
<div className="flex items-center justify-between gap-4">

// Columna
<div className="flex flex-col gap-3">

// Centrar absolutamente
<div className="flex items-center justify-center min-h-screen">

// Wrap en móvil
<div className="flex flex-wrap gap-2">
```

### Grid

```tsx
// Grid fijo
<div className="grid grid-cols-3 gap-4">

// Grid auto-responsive (sin media queries)
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">

// Grid con áreas
<div className="grid grid-cols-[240px_1fr] grid-rows-[64px_1fr] min-h-screen">
  <header className="col-span-2">Header</header>
  <aside>Sidebar</aside>
  <main>Contenido</main>
</div>
```

### Valores arbitrarios

Cuando necesitas un valor exacto que no está en la escala de Tailwind:

```tsx
<div className="w-[380px] h-[calc(100vh-64px)] top-[72px]">
```

---

## 11. Tipografía

### Escala de tamaños

| Clase | Tamaño |
|---|---|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-3xl` | 30px |
| `text-4xl` | 36px |

### Pesos

```tsx
<p className="font-thin">100 — Muy delgado</p>
<p className="font-light">300 — Ligero</p>
<p className="font-normal">400 — Normal</p>
<p className="font-medium">500 — Medio</p>
<p className="font-semibold">600 — Seminegrita</p>
<p className="font-bold">700 — Negrita</p>
<p className="font-extrabold">800 — Extra negrita</p>
<p className="font-black">900 — Negra</p>
```

### Jerarquía tipográfica para FinTrack

```tsx
// Título de página
<h1 className="text-3xl font-bold text-text-primary">Mis gastos</h1>

// Título de sección
<h2 className="text-xl font-semibold text-text-primary">Enero 2025</h2>

// Subtítulo / label
<h3 className="text-sm font-medium text-text-secondary uppercase tracking-wide">Categoría</h3>

// Cuerpo
<p className="text-base text-text-primary leading-relaxed">Descripción...</p>

// Texto auxiliar
<p className="text-sm text-text-muted">Hace 3 días</p>

// Monto financiero (usa font-mono)
<span className="text-2xl font-bold font-mono text-income">$1.250.000</span>
```

### Line height y letter spacing

```tsx
<p className="leading-none">    // 1
<p className="leading-tight">   // 1.25
<p className="leading-normal">  // 1.5
<p className="leading-relaxed"> // 1.625
<p className="leading-loose">   // 2

<p className="tracking-tight">  // -0.05em
<p className="tracking-normal"> // 0
<p className="tracking-wide">   // 0.025em
<p className="tracking-widest"> // 0.1em
```

---

## 12. Colores

### Modificador de opacidad

```tsx
// Color con opacidad — sintaxis /valor
<div className="bg-primary/10">     // fondo al 10% opacidad
<div className="bg-primary/50">     // fondo al 50% opacidad
<p className="text-primary/80">     // texto al 80% opacidad
<div className="border-border/40">  // borde al 40% opacidad
```

Esto es muy útil para badges y overlays:
```tsx
<span className="bg-income/10 text-income px-2 py-0.5 rounded-full text-xs">
  Ingreso
</span>
```

### Colores de la paleta base de Tailwind v4

Tailwind v4 incluye por defecto una paleta moderna. Algunos útiles para finanzas:

```tsx
// Usando colores base de Tailwind (sin personalizar)
<div className="bg-emerald-500 text-white">  // verde ingresos
<div className="bg-rose-500 text-white">     // rojo gastos
<div className="bg-amber-400 text-black">    // amarillo advertencia
<div className="bg-sky-500 text-white">      // azul info
<div className="bg-slate-100 text-slate-900"> // fondos neutros
```

---

## 13. Animaciones y transiciones

### Transiciones básicas

```tsx
// transition-colors — solo colores (más eficiente)
<button className="bg-primary hover:bg-primary/90 transition-colors duration-150">

// transition-all — todos los cambios
<div className="hover:scale-105 transition-all duration-200">

// transition con easing
<div className="transition-transform duration-300 ease-out hover:translate-y-[-2px]">
```

### Duraciones útiles

| Clase | Duración |
|---|---|
| `duration-75` | 75ms (microinteracciones) |
| `duration-150` | 150ms (hover rápido, recomendado) |
| `duration-200` | 200ms (hover normal) |
| `duration-300` | 300ms (slide in/out) |
| `duration-500` | 500ms (animaciones visibles) |

### Animaciones predefinidas

```tsx
<div className="animate-spin">    // rotación infinita (loading)
<div className="animate-ping">    // efecto ping (notificación)
<div className="animate-pulse">   // pulso suave (skeleton)
<div className="animate-bounce">  // rebote
```

**Skeleton loader para tarjetas financieras:**
```tsx
<div className="card animate-pulse">
  <div className="h-4 bg-border rounded w-3/4 mb-3"></div>
  <div className="h-8 bg-border rounded w-1/2 mb-2"></div>
  <div className="h-3 bg-border rounded w-1/3"></div>
</div>
```

### Animaciones personalizadas

```css
/* globals.css */
@theme inline {
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

```tsx
<div className="animate-fade-in">Aparece con fade</div>
<div className="animate-slide-up">Aparece desde abajo</div>
```

---

## 14. Buenas prácticas y errores comunes

### ✅ Buenas prácticas

**1. Ordena las clases con un patrón consistente:**
```
Layout → Display → Posición → Tamaño → Espaciado → Tipografía → Color → Bordes → Efectos → Estados
```

```tsx
// ✅ Ordenado
<div className="flex items-center gap-3 w-full px-4 py-3 text-sm text-text-primary bg-surface border border-border rounded-lg hover:bg-border/50 transition-colors">
```

**2. Usa el plugin `prettier-plugin-tailwindcss` para ordenar automáticamente:**
```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

**3. Extrae variantes con `cn()` (clsx + tailwind-merge):**
```bash
pnpm add clsx tailwind-merge
```
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
```tsx
// Uso: merge inteligente sin conflictos
<div className={cn("p-4 bg-surface", isActive && "bg-primary text-white", className)}>
```

**4. Prefiere `gap` sobre margin para separar elementos hijos:**
```tsx
// ❌ margin en hijos
<div>
  <Card className="mb-4" />
  <Card className="mb-4" />
</div>

// ✅ gap en el padre
<div className="flex flex-col gap-4">
  <Card />
  <Card />
</div>
```

**5. Usa `min-h-screen` en el root, no `h-screen`:**
```tsx
// ❌ Corta el contenido si es más largo que la pantalla
<main className="h-screen">

// ✅ Se expande si el contenido lo necesita
<main className="min-h-screen">
```

---

### ❌ Errores comunes

**1. Concatenar clases dinámicas con template literals:**
```tsx
// ❌ Tailwind no puede detectar esta clase en build
const color = "blue";
<div className={`text-${color}-500`}>   // NUNCA
```

```tsx
// ✅ Usar objetos o mapas con clases completas
const colorMap = { blue: "text-blue-500", red: "text-red-500" };
<div className={colorMap[color]}>       // SIEMPRE
```

**2. No usar `tailwind-merge` y tener conflictos:**
```tsx
// ❌ Ambas clases se aplican, la segunda puede no ganar
<div className={`p-4 ${className}`}>  // si className="p-2", hay conflicto

// ✅ tailwind-merge resuelve el conflicto
<div className={cn("p-4", className)}>  // "p-2" gana correctamente
```

**3. Olvidar `transition-` al hacer hover:**
```tsx
// ❌ Cambio brusco
<button className="bg-blue-500 hover:bg-blue-700">

// ✅ Cambio suave
<button className="bg-blue-500 hover:bg-blue-700 transition-colors duration-150">
```

**4. Usar `absolute` sin `relative` en el padre:**
```tsx
// ❌ Se posiciona respecto al viewport
<div>
  <span className="absolute top-0 right-0">Badge</span>
</div>

// ✅ Se posiciona respecto al padre
<div className="relative">
  <span className="absolute top-0 right-0">Badge</span>
</div>
```

---

## 15. Referencia rápida de clases más usadas

### Layout

```tsx
flex items-center justify-between gap-4
flex flex-col gap-3
grid grid-cols-3 gap-4
relative / absolute / fixed / sticky
top-0 left-0 right-0 bottom-0
z-10 / z-50
overflow-hidden / overflow-auto
```

### Sizing

```tsx
w-full / w-auto / w-fit
max-w-sm / max-w-md / max-w-lg / max-w-xl / max-w-4xl / max-w-screen-xl
h-full / min-h-screen
aspect-square / aspect-video
```

### Espaciado

```tsx
p-4 px-6 py-3 pt-2
m-4 mx-auto mt-8
gap-2 gap-4 gap-6 gap-8
space-y-4 (alternativa a gap en flex-col)
```

### Tipografía

```tsx
text-sm / text-base / text-lg / text-xl / text-2xl / text-3xl
font-normal / font-medium / font-semibold / font-bold
text-text-primary / text-text-secondary / text-text-muted
leading-tight / leading-normal / leading-relaxed
tracking-wide / tracking-tight
truncate / text-ellipsis / line-clamp-2
text-left / text-center / text-right
```

### Colores y fondos

```tsx
bg-background / bg-surface / bg-primary
text-primary / text-income / text-expense
border-border
bg-primary/10 (opacidad)
```

### Bordes

```tsx
border border-border
rounded-md / rounded-lg / rounded-xl / rounded-full
ring-2 ring-primary ring-offset-2
```

### Efectos

```tsx
shadow-sm / shadow-md / shadow-lg / shadow-card
opacity-50 / opacity-0
blur-sm / backdrop-blur-sm
```

### Estados

```tsx
hover:bg-surface
focus:outline-none focus:ring-2 focus:ring-primary
active:scale-95
disabled:opacity-50 disabled:cursor-not-allowed
group / group-hover:text-primary
```

### Transiciones

```tsx
transition-colors duration-150
transition-all duration-200 ease-out
animate-pulse / animate-spin
```

---

> **Recurso oficial:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
> **Paleta OKLCH:** [oklch.com](https://oklch.com)
> **Playground:** [play.tailwindcss.com](https://play.tailwindcss.com)
