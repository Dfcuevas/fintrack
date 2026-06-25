# FinTrack — Guía de Arquitectura y Convenciones

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Lenguaje | TypeScript 5 (strict) |
| Auth | Clerk (`@clerk/nextjs`) |
| Base de datos | PostgreSQL (Neon serverless) |
| ORM | Drizzle ORM + `drizzle-orm/neon-http` |
| Migraciones | Drizzle Kit |
| Paquete | pnpm (workspace) |
| Linter | ESLint 9 (flat config) |

## Estructura del Proyecto

```
.
├── app/                    # App Router de Next.js
│   ├── layout.tsx          # Root layout (ClerkProvider, fonts, header)
│   ├── page.tsx            # Página principal
│   └── globals.css         # Tailwind + variables CSS
├── db/                     # Capa de base de datos
│   ├── schema.ts           # Definición de tablas y relaciones Drizzle
│   └── migrations/         # Migraciones SQL generadas por drizzle-kit
├── lib/                    # Utilidades compartidas
│   ├── db.ts               # Conexión a Neon con Drizzle
│   └── default-categories.ts  # Categorías precargadas
├── public/                 # Assets estáticos
├── proxy.ts                # Clerk middleware (protección de rutas)
├── drizzle.config.ts       # Configuración de Drizzle Kit
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── pnpm-workspace.yaml
```

## Arquitectura

### Routing y Layout
- El `RootLayout` en `app/layout.tsx` envuelve toda la app con `ClerkProvider`.
- El header muestra botones condicionales según estado de auth usando el componente `<Show>` de Clerk.
- Las rutas se organizan por el sistema de carpetas de Next.js App Router.

### Autenticación
- Clerk middleware global en `proxy.ts` vía `clerkMiddleware()`.
- Matcher estándar que ignora archivos estáticos y `_next`, pero protege API routes y rutas de Clerk.
- UI de login/signup con los componentes `<SignInButton>`, `<SignUpButton>`, `<UserButton>` de Clerk.

### Base de Datos
- Conexión en `lib/db.ts` usando `@neondatabase/serverless` + `drizzle-orm/neon-http`.
- Schema definido en `db/schema.ts` con `pgTable` y relaciones explícitas con `relations()`.
- Migraciones manejadas con Drizzle Kit (dialecto PostgreSQL).
- Path alias `@/` configurado para imports.

## Modelo de Datos

### Tablas

**users**
| Columna | Tipo | Notas |
|---|---|---|
| id | uuid | PK, defaultRandom |
| email | text | UNIQUE, NOT NULL |
| name | text | NOT NULL |
| currency | text | Default 'COP' |
| created_at | timestamp | Default now |

**categories**
| Columna | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → users (cascade) |
| name | text | |
| icon | text | Emoji |
| color | text | Hex |
| type | text | 'expense' \| 'income' |
| is_default | boolean | |

**expenses**
| Columna | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → users (cascade) |
| category_id | uuid | FK → categories |
| amount | numeric(12,2) | |
| description | text | |
| type | text | 'expense' \| 'income' |
| date | date | |
| notes | text | nullable |
| created_at | timestamp | |

**budgets**
| Columna | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → users (cascade) |
| category_id | uuid | FK → categories |
| amount | numeric(12,2) | |
| period | text | 'monthly' \| 'yearly' |
| month | integer | nullable |
| year | integer | |
| created_at | timestamp | |

### Relaciones
```
users ──< categories
users ──< expenses
users ──< budgets
categories ──< expenses
categories ──< budgets
```

## Convenciones de Código

### Generales
- TypeScript estricto (`strict: true` en tsconfig).
- Imports absolutos con el prefijo `@/` (ej: `import { db } from "@/lib/db"`).
- camelCase para variables, funciones y archivos.
- snake_case para nombres de columnas en la base de datos.

### Componentes React
- Componentes funcionales con tipos explícitos en props.
- Layouts anidados según la estructura de carpetas de Next.js App Router.
- Preferir Server Components por defecto; usar `"use client"` solo cuando sea necesario.

### Base de Datos
- Definir tablas en `db/schema.ts` con `pgTable`.
- Declarar relaciones con `relations()` para habilitar `db.query.*`.
- Las migraciones se generan con `drizzle-kit generate` y se aplican con `drizzle-kit migrate`.
- Usar `@neondatabase/serverless` para la conexión serverless a PostgreSQL.

### Estilos
- Tailwind CSS 4 utility-first.
- Variables CSS y tokens de tema definidos en `globals.css` con `@theme inline`.
- Preferir `gap` sobre margin para espaciado entre elementos.

### Autenticación
- El estado de auth se maneja con Clerk (`useAuth`, `useUser`, `<Show>`).
- El middleware Clerk protege rutas automáticamente.
- Los datos del usuario se sincronizan entre Clerk y la BD local (tabla `users`).

### Scripts Disponibles
- `pnpm dev` — desarrollo
- `pnpm build` — build de producción
- `pnpm start` — iniciar servidor de producción
- `pnpm lint` — ESLint
