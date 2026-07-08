# FinTrack — Estructura de carpetas y archivos

Esta guía define la organización profesional del proyecto: rutas (`app/`), componentes (`components/`), capa de datos (`db/`, `lib/`) y archivos de configuración en la raíz.

## Árbol completo

```
fintrack/
├── app/
│   ├── layout.tsx                        # Root layout: ClerkProvider, fonts, header condicional
│   ├── page.tsx                          # Landing pública
│   ├── globals.css                       # Tailwind 4 + @theme inline
│   ├── (auth)/                           # Route group — no afecta la URL
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   └── dashboard/                        # Área protegida por Clerk middleware
│       ├── layout.tsx                    # Sincroniza usuario Clerk ↔ tabla users
│       ├── page.tsx                      # Resumen del mes: balance, gráfico
│       ├── expenses/
│       │   ├── page.tsx
│       │   └── actions.ts                # Server Actions: crear/editar/eliminar gasto
│       ├── categories/
│       │   ├── page.tsx
│       │   └── actions.ts
│       └── budgets/
│           ├── page.tsx
│           └── actions.ts
│
├── components/
│   ├── ui/                               # Genéricos, sin lógica de negocio
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   ├── features/                         # Módulos de negocio, agrupados por dominio
│   │   ├── expenses/
│   │   │   ├── ExpenseList.tsx
│   │   │   ├── ExpenseForm.tsx
│   │   │   ├── ExpenseItem.tsx
│   │   │   └── useExpenseFilters.ts
│   │   ├── categories/
│   │   │   ├── CategoryList.tsx
│   │   │   ├── CategoryForm.tsx
│   │   │   └── CategoryPicker.tsx
│   │   └── dashboard/
│   │       ├── BalanceCard.tsx
│   │       ├── CategoryPieChart.tsx
│   │       └── MonthlyBarChart.tsx
│   └── layout/                           # Estructura de navegación (conoce la app)
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── db/
│   ├── schema.ts                         # Tablas y relaciones Drizzle
│   └── migrations/                       # SQL generado por drizzle-kit
│
├── lib/
│   ├── db.ts                             # Conexión Drizzle + Neon
│   ├── validations.ts                    # Esquemas Zod compartidos
│   └── default-categories.ts             # Categorías precargadas al registrarse
│
├── public/                               # Assets estáticos
│
├── proxy.ts                              # Clerk middleware (protección de rutas)
├── drizzle.config.ts                     # Configuración de Drizzle Kit
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── pnpm-workspace.yaml
└── .env.local
```

## Reglas de dependencia entre capas

| Carpeta | Contiene | Puede importar de |
|---|---|---|
| `app/` | Rutas, layouts, Server Actions co-ubicadas | `components/`, `lib/`, `db/` |
| `components/features/` | Lógica de negocio por dominio | `components/ui/`, `lib/` |
| `components/ui/` | Piezas genéricas sin lógica | nada de tu app — agnóstico |
| `components/layout/` | Estructura de navegación | `components/ui/` |
| `lib/` | Conexión BD, validaciones, helpers | `db/` |
| `db/` | Schema y migraciones | nada |

La dependencia va en una sola dirección: `app/` → `features/` → `ui/`. Un componente en `ui/` nunca debe importar nada de `features/` — si eso ocurre, es señal de que el componente está mal ubicado.

## Notas de diseño

- **Route group `(auth)`**: agrupa `sign-in` y `sign-up` sin agregar un segmento a la URL. `/sign-in` sigue siendo `/sign-in`.
- **`actions.ts` co-ubicado por ruta**: cada subcarpeta de `dashboard/` (expenses, categories, budgets) tiene su propio archivo de Server Actions, manteniendo juntos la página y su lógica de mutación.
- **`components/layout/` separado de `components/ui/`**: `Header` y `Sidebar` conocen la estructura de la app (enlaces internos, `UserButton` de Clerk), por lo que no son 100% agnósticos como los componentes en `ui/`.
- **`lib/validations.ts`**: centraliza los esquemas Zod para no repetirlos en cada `actions.ts`.

## Ejemplo de flujo entre capas

```
app/dashboard/expenses/page.tsx
  → importa ExpenseForm y ExpenseList de components/features/expenses/
  → consulta datos directamente con db.query.expenses (Server Component)

components/features/expenses/ExpenseForm.tsx ('use client')
  → importa Button e Input de components/ui/
  → invoca crearGasto de app/dashboard/expenses/actions.ts

app/dashboard/expenses/actions.ts ('use server')
  → valida con expenseSchema de lib/validations.ts
  → escribe en la base de datos con db de lib/db.ts
  → revalidatePath('/dashboard/expenses')
```
