# Guía de Estilos — FinTrack + Tailwind CSS 4

## 1. Filosofía

- **Utility-first**: construye componentes combinando clases atómicas en el JSX. No escribas CSS personalizado a menos que sea estrictamente necesario.
- **Mobile-first**: diseña primero para móvil y usa prefijos `sm:`, `md:`, `lg:` para expandir.
- **Consistencia**: todo tamaño, color o espaciado debe venir del sistema de diseño (tema), no de valores "inventados".

---

## 2. Tailwind CSS 4 — Lo nuevo

Este proyecto usa **Tailwind v4** con PostCSS (`@tailwindcss/postcss`). Las diferencias clave respecto a v3:

| Concepto | v3 | v4 |
|---|---|---|
| Init | `tailwind.config.ts` | `@import "tailwindcss"` en CSS |
| Tema | `theme.extend` en JS | `@theme inline` en CSS |
| Plugins | plugins de PostCSS | `@tailwindcss/postcss` |
| Variantes | `dark:` | `dark:` sigue igual |
| Fuentes | `fontFamily` en config | CSS variables vía `@theme` |

**NO crees un `tailwind.config.ts`** — todo se configura desde `globals.css`.

---

## 3. Sistema de Tema — `@theme inline`

### Ubicación: `app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  /* --- Colores primarios --- */
  --color-primary: oklch(0.55 0.2 260);       /* azul */
  --color-primary-light: oklch(0.7 0.15 260);
  --color-primary-dark: oklch(0.4 0.2 260);

  /* --- Neutros --- */
  --color-surface: oklch(0.98 0 0);            /* fondo */
  --color-surface-alt: oklch(0.95 0 0);        /* fondo alternativo */
  --color-border: oklch(0.88 0 0);
  --color-text: oklch(0.15 0 0);
  --color-text-muted: oklch(0.45 0 0);

  /* --- Semántica --- */
  --color-success: oklch(0.6 0.2 145);
  --color-warning: oklch(0.7 0.2 85);
  --color-danger: oklch(0.55 0.25 30);

  /* --- Tipografía --- */
  --font-sans: "Geist", sans-serif;
  --font-mono: "Geist Mono", monospace;

  /* --- Espaciado (opcional, Tailwind ya trae el default) --- */
  /* Solo si necesitas valores extra */
  --spacing-section: 6rem;

  /* --- Sombras --- */
  --shadow-card: 0 1px 3px oklch(0 0 0 / 0.1);

  /* --- Bordes --- */
  --radius-box: 0.75rem;
}
```

### Uso en componentes

```tsx
<div className="bg-primary text-white rounded-box p-4 shadow-card">
  Hola
</div>
```

Las variables `--color-*`, `--font-*`, `--radius-*`, `--shadow-*` expuestas en `@theme` se convierten automáticamente en **utility classes** (ej. `bg-primary`, `text-white`, `rounded-box`, `shadow-card`, `font-sans`, `font-mono`).

---

## 4. Tipografía — Variables CSS y Geist

Las fuentes se cargan en `app/layout.tsx` como **CSS variables**:

```tsx
// layout.tsx
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

<html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
```

### Conectar al tema en `globals.css`

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### Uso

```tsx
<p className="font-sans text-base text-text">Párrafo normal</p>
<code className="font-mono text-sm">código</code>
```

### Tailwind usa rem para todo

| Class | Tamaño |
|---|---|
| `text-xs` | 0.75rem (12px) |
| `text-sm` | 0.875rem (14px) |
| `text-base` | 1rem (16px) |
| `text-lg` | 1.125rem (18px) |
| `text-xl` | 1.25rem (20px) |
| `text-2xl` | 1.5rem (24px) |
| `text-3xl` | 1.875rem (30px) |

**Regla**: `text-base` para cuerpo, `text-sm` para labels/secundario, `text-xs` para metadata.

---

## 5. Layout

### Contenedores

```tsx
{/* Contenido centrado con padding horizontal */}
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  ...
</div>
```

### Flexbox (preferir `gap` sobre `margin`)

```tsx
<div className="flex items-center gap-3">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### Grid

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <div>card</div>
  <div>card</div>
  <div>card</div>
</div>
```

---

## 6. Responsive Design

Breakpoints por defecto:

| Prefijo | Min-width |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

**Patrón mobile-first siempre**:

```tsx
{/* Móvil: 1 columna → md: 2 → lg: 3 */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

---

## 7. Dark Mode

El proyecto no tiene dark mode aún, pero si se agrega se usa la variante `dark:`:

```css
/* globals.css */
@import "tailwindcss";
@variant dark (&:where(.dark, .dark *));

@theme inline {
  /* colores light */
}
```

```tsx
<div className="bg-white dark:bg-gray-900 text-text dark:text-gray-100">
```

---

## 8. Buenas Prácticas

### 8.1 Orden de clases (convención)

Sigue este orden consistente:

```
1. Layout/positioning:  flex, grid, hidden, relative, absolute, z-*
2. Display:              block, inline-flex, hidden
3. Sizing:               w-full, h-16, max-w-*, min-h-*
4. Spacing:              p-*, m-*, gap-*, space-x-*
5. Typography:           text-*, font-*, leading-*, tracking-*
6. Visual:               bg-*, text-*, rounded-*, shadow-*, border
7. Interactive:          cursor-pointer, transition-*, hover:*, focus:*
```

```tsx
{/* Ejemplo */}
<button className="
  inline-flex items-center justify-center
  h-10 px-4
  gap-2
  text-sm font-medium
  bg-primary text-white rounded-lg
  hover:bg-primary-dark transition-colors
">
```

### 8.2 Componentes > utilidades repetidas

Si ves un patrón que se repite 3+ veces, extraelo a un componente:

```tsx
// ✅ Bien
<Card>...</Card>
<Card>...</Card>
<Card>...</Card>

// ❌ Mal
<div className="bg-white rounded-xl shadow-sm p-4 border">...</div>
<div className="bg-white rounded-xl shadow-sm p-4 border">...</div>
```

### 8.3 Preferir `gap` sobre `margin`

- `gap` en flex/grid → espaciado entre hijos
- `margin` solo cuando necesitas empujar un elemento contra su padre o separarlo de algo fuera de su contenedor flex/grid

### 8.4 Evitar `@apply` innecesario

`@apply` existe pero no abuses. Si usas `@apply` para todo, pierdes el beneficio de tener los estilos visibles en el JSX. Úsalo solo para:

- Componentes base muy repetitivos (botones, inputs)
- Cuando necesitas sobreescribir estilos de una librería externa

```css
/* Úsalo con moderación */
.btn {
  @apply inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors;
}
```

### 8.5 `cn()` para combinar clases condicionales

Instala `clsx` + `tailwind-merge` y crea un helper:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
<button className={cn("bg-primary text-white", isDanger && "bg-danger")}>
```

### 8.6 Colores semánticos sobre colores fijos

| Preferir | Evitar |
|---|---|
| `bg-primary` | `bg-blue-600` |
| `text-text-muted` | `text-gray-500` |
| `bg-danger` | `bg-red-600` |

Si usas colores fijos como `blue-600` directamente, cambiar de tema requiere buscar y reemplazar en todo el proyecto.

### 8.7 Espaciado responsivo

```tsx
<div className="p-4 sm:p-6 lg:p-8">   <!-- padding crece -->
<div className="gap-2 sm:gap-4">        <!-- gap crece -->
```

---

## 9. Patrones Comunes

### Card

```tsx
<div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-border">
```

### Input

```tsx
<input
  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm
             placeholder:text-text-muted
             focus:border-primary focus:ring-2 focus:ring-primary/20
             disabled:opacity-50 disabled:cursor-not-allowed"
/>
```

### Button primario

```tsx
<button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white
                   hover:bg-primary-dark transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed">
```

### Button secundario

```tsx
<button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-text
                   hover:bg-surface-alt transition-colors">
```

### Table

```tsx
<div className="overflow-x-auto rounded-xl border border-border">
  <table className="w-full text-sm">
    <thead className="bg-surface-alt text-text-muted">
      <tr>
        <th className="px-4 py-3 text-left font-medium">Columna</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-t border-border hover:bg-surface/50">
        <td className="px-4 py-3">Valor</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Page layout estándar

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
      {/* contenido */}
    </div>
  );
}
```

---

## 10. Checklist para revisar PRs de estilos

- [ ] ¿Usa colores del tema (`bg-primary`, `text-text`) en vez de valores raw (`bg-blue-600`)?
- [ ] ¿Es mobile-first (clase base = móvil, prefijo = desktop)?
- [ ] ¿Usa `gap` en vez de `margin` para espaciar hijos?
- [ ] ¿Sigue el orden de clases definido?
- [ ] ¿Evita `@apply` innecesario?
- [ ] ¿Usa `font-sans`/`font-mono` de las variables?
- [ ] ¿Los valores `px-*`, `py-*`, `text-*` son los correctos para el contexto?
