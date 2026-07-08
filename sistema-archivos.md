# Sistema de Archivos — FinTrack

Estructura profesional del frontend organizada por **componentes**, **features** y **páginas**, diseñada para Next.js 16 App Router.

```
.
├── app/                                # App Router — define URLs, layouts, errores, loading
│   ├── (auth)/                         # Route group: rutas públicas (sin sidebar)
│   │   ├── layout.tsx                  # Layout centrado, minimalista (sin navegación)
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx            # Página de inicio de sesión (Clerk)
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.tsx            # Página de registro (Clerk)
│   │
│   ├── (dashboard)/                    # Route group: rutas protegidas (con sidebar)
│   │   ├── layout.tsx                  # Dashboard layout: sidebar + header + main
│   │   ├── page.tsx                    # Dashboard principal — resumen mensual
│   │   ├── expenses/
│   │   │   ├── page.tsx                # Lista de gastos/ingresos (tabla + filtros)
│   │   │   ├── new/
│   │   │   │   └── page.tsx            # Formulario de nuevo registro
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx        # Editar registro existente
│   │   ├── categories/
│   │   │   ├── page.tsx                # Gestión de categorías (CRUD)
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Detalle de categoría (gastos asociados)
│   │   ├── budgets/
│   │   │   ├── page.tsx                # Lista de presupuestos del período
│   │   │   ├── new/
│   │   │   │   └── page.tsx            # Crear nuevo presupuesto
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx        # Editar presupuesto
│   │   ├── reports/
│   │   │   └── page.tsx                # Reportes y estadísticas avanzadas
│   │   └── settings/
│   │       └── page.tsx                # Configuración del usuario (perfil, moneda)
│   │
│   ├── layout.tsx                      # Root layout: ClerkProvider, fonts, metadata
│   ├── page.tsx                        # Landing page pública — hero, features, CTA, footer
│   └── globals.css                     # Tailwind v4, variables CSS, tokens
│
├── components/                         # Componentes puramente UI (reutilizables, sin lógica de negocio)
│   ├── ui/                             # Design system — átomos y moléculas
│   │   ├── button.tsx                  # Botón con variantes (primary, ghost, danger, sizes)
│   │   ├── card.tsx                    # Contenedor tipo tarjeta
│   │   ├── input.tsx                   # Input de texto con label, error, icono
│   │   ├── select.tsx                  # Select nativo estilizado
│   │   ├── badge.tsx                   # Etiqueta de estado/categoría
│   │   ├── dialog.tsx                  # Modal/diálogo con overlay
│   │   ├── table.tsx                   # Tabla genérica con ordenamiento y estados
│   │   ├── spinner.tsx                 # Indicador de carga
│   │   ├── skeleton.tsx                # Skeleton loader para suspense
│   │   ├── tabs.tsx                    # Navegación por tabs
│   │   ├── toast.tsx                   # Notificaciones toast
│   │   └── progress-bar.tsx            # Barra de progreso (para presupuestos)
│   │
│   ├── layout/                         # Componentes estructurales de layout
│   │   ├── sidebar.tsx                 # Barra lateral con navegación
│   │   ├── sidebar-item.tsx            # Ítem individual del sidebar
│   │   ├── header.tsx                  # Barra superior: breadcrumb, UserButton, búsqueda
│   │   ├── dashboard-layout.tsx        # Wrapper: sidebar + header + main area
│   │   └── auth-layout.tsx             # Wrapper centrado para páginas de auth
│   │
│   └── shared/                         # Componentes compartidos con conocimiento mínimo del dominio
│       ├── logo.tsx                    # Logo de la app (reutilizable en landing, sidebar, footer)
│       ├── empty-state.tsx             # Estado vacío (icono + título + acción)
│       ├── error-state.tsx             # Estado de error con reintento
│       ├── loading-state.tsx           # Estado de carga con spinner o skeleton
│       ├── confirm-dialog.tsx          # Diálogo de confirmación destructiva
│       ├── page-header.tsx             # Encabezado de página (título + acciones)
│       ├── money-display.tsx           # Formateo de moneda con badge de tipo (ingreso/gasto)
│       └── date-picker.tsx             # Selector de fecha
│
├── features/                           # Módulos sellados por feature (cada uno es autónomo)
│   ├── auth/                           # Feature: autenticación
│   │   ├── components/
│   │   │   ├── sign-in-button.tsx       # Botón "Iniciar sesión" (Clerk)
│   │   │   ├── sign-up-button.tsx       # Botón "Registrarse" (Clerk)
│   │   │   └── user-button.tsx          # Menú de usuario (Clerk UserButton)
│   │   └── hooks/
│   │       └── use-user.ts             # Hook wrapper sobre Clerk (useUser + useAuth)
│   │
│   ├── landing/                        # Feature: landing page (pública, informativa)
│   │   ├── components/
│   │   │   ├── public-header.tsx       # Header con logo + nav + SignInButton / SignUpButton
│   │   │   ├── hero.tsx                # Sección principal: headline, subtítulo, CTA
│   │   │   ├── features-section.tsx    # Grid de tarjetas con funcionalidades de la app
│   │   │   └── footer.tsx             # Footer con links y copyright
│   │   └── hooks/                      # (opcional, si requiere interactividad)
│   │
│   ├── expenses/                       # Feature: gastos e ingresos
│   │   ├── components/
│   │   │   ├── expense-list.tsx         # Tabla/paginated list con filtros
│   │   │   ├── expense-card.tsx         # Tarjeta individual en mobile
│   │   │   ├── expense-form.tsx         # Formulario de creación/edición
│   │   │   ├── expense-summary.tsx      # Total del período (ingresos - gastos)
│   │   │   └── expense-filters.tsx      # Filtros por fecha, categoría, tipo, búsqueda
│   │   ├── hooks/
│   │   │   ├── use-expenses.ts          # Query: listar gastos con filtros
│   │   │   └── use-expense-mutations.ts # Mutations: crear, actualizar, eliminar
│   │   └── actions.ts                   # Server Actions: createExpense, updateExpense, deleteExpense
│   │
│   ├── categories/                     # Feature: categorías
│   │   ├── components/
│   │   │   ├── category-list.tsx        # Grid de categorías con icono y color
│   │   │   ├── category-card.tsx        # Tarjeta editable de categoría
│   │   │   ├── category-form.tsx        # Formulario crear/editar categoría
│   │   │   ├── category-picker.tsx      # Selector de categoría (para formularios)
│   │   │   └── category-badge.tsx       # Badge coloreado con icono
│   │   ├── hooks/
│   │   │   ├── use-categories.ts        # Query: obtener categorías del usuario
│   │   │   └── use-category-mutations.ts# Mutations: crear, actualizar, eliminar
│   │   └── actions.ts                   # Server Actions CRUD categorías
│   │
│   ├── budgets/                        # Feature: presupuestos
│   │   ├── components/
│   │   │   ├── budget-list.tsx          # Lista de presupuestos del período
│   │   │   ├── budget-card.tsx          # Tarjeta con progreso individual
│   │   │   ├── budget-form.tsx          # Formulario crear/editar presupuesto
│   │   │   ├── budget-progress.tsx      # Barra de progreso con porcentaje y alerta
│   │   │   └── budget-summary.tsx       # Resumen general: presupuestado vs gastado
│   │   ├── hooks/
│   │   │   ├── use-budgets.ts           # Query: presupuestos por período
│   │   │   └── use-budget-mutations.ts  # Mutations: crear, actualizar, eliminar
│   │   └── actions.ts                   # Server Actions CRUD presupuestos
│   │
│   ├── dashboard/                      # Feature: resumen del dashboard
│   │   ├── components/
│   │   │   ├── monthly-summary.tsx      # Ingresos, gastos, balance del mes
│   │   │   ├── recent-transactions.tsx  # Últimos 5 registros
│   │   │   ├── budget-overview.tsx      # Progreso general de presupuestos
│   │   │   ├── spending-chart.tsx       # Gráfico de gastos por categoría (chart)
│   │   │   └── quick-add.tsx            # Botón flotante o inline para añadir gasto rápido
│   │   └── hooks/
│   │       └── use-dashboard.ts         # Query: datos agregados del dashboard
│   │
│   ├── reports/                        # Feature: reportes y analíticas
│   │   ├── components/
│   │   │   ├── spending-by-category.tsx # Gasto acumulado por categoría (gráfico de torta)
│   │   │   ├── monthly-trends.tsx       # Tendencia mensual (gráfico de líneas)
│   │   │   ├── income-vs-expenses.tsx   # Comparación ingresos vs gastos (barras)
│   │   │   └── report-filters.tsx       # Filtros avanzados: rango de fechas, categorías
│   │   └── hooks/
│   │       └── use-reports.ts           # Query: datos para reportes
│   │
│   └── settings/                       # Feature: configuración del usuario
│       ├── components/
│       │   ├── profile-form.tsx         # Editar nombre, email
│       │   ├── currency-selector.tsx    # Selector de moneda preferida
│       │   └── category-manager.tsx     # Ordenar, ocultar, restablecer categorías
│       └── hooks/
│           └── use-settings.ts          # Query + mutation de configuración
│
├── lib/                                # Utilidades y servicios transversales (ya existe)
│   ├── db.ts                           # Conexión Neon + Drizzle
│   ├── default-categories.ts           # Categorías precargadas del sistema
│   ├── getOrCreateUser.ts              # Sincronización Clerk → DB local
│   └── utils.ts                        # Helpers genéricos (cn(), formatCurrency, formatDate)
│
├── db/                                 # Capa de datos (ya existe)
│   ├── schema.ts                       # Definición Drizzle de tablas y relaciones
│   └── migrations/                     # Migraciones SQL generadas por drizzle-kit
│
├── proxy.ts                            # Clerk middleware (protección de rutas)
├── drizzle.config.ts
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Principios Arquitectónicos

### 1. Separación de responsabilidades

| Carpeta | Responsabilidad | ¿Conoce el dominio? |
|---|---|---|
| `app/` | Rutas, layouts, loading/error boundaries | No |
| `components/ui/` | Design system atómico | No |
| `components/layout/` | Estructura visual de la app | No |
| `components/shared/` | Componentes compartidos con dominio genérico | Mínimo |
| `features/*/` | Lógica de negocio + UI específica | Sí |
| `lib/` | Utilidades transversales | Sí |
| `db/` | Definición de datos | Sí |

### 2. Reglas de dependencia

```
app/ → features/ → components/ → (ninguna)
  ↕                     ↕
 lib/                 lib/
```

- `app/` importa desde `features/`, `components/` y `lib/`
- `features/` importa desde `components/` y `lib/`
- `components/` NO importa desde `features/` ni `app/`
- `components/ui/` NO importa nada del proyecto (solo React/Tailwind)
- Las features entre sí NO se importan (independencia total)

### 3. Convenciones por archivo

| Archivo | Propósito |
|---|---|
| `page.tsx` | Server Component que orquesta datos y renderiza |
| `layout.tsx` | Layout compartido entre rutas hijas |
| `loading.tsx` | UI de carga (Suspense Boundary) |
| `error.tsx` | UI de error (Error Boundary) |
| `actions.ts` | Server Actions del feature |
| `hooks/*.ts` | Custom hooks (cliente) |
| `components/*.tsx` | Componentes del feature |

### 4. Server vs Client Components

- Por defecto: **Server Components**
- `"use client"` solo cuando sea estrictamente necesario:
  - Interactividad del usuario (onClick, onChange)
  - Hooks de React (useState, useEffect, useContext)
  - Hooks de Clerk del lado cliente (useUser)
  - Eventos del navegador
- Los Server Actions en `actions.ts` pueden ser importados tanto desde Server como desde Client Components

---

## Landing Page

### Árbol

```
app/page.tsx                              # Ruta raíz — monta las secciones de la landing
features/landing/components/
├── public-header.tsx                      # Logo + nav links + SignInButton / SignUpButton
├── hero.tsx                               # Título principal, subtítulo, CTA → /sign-up
├── features-section.tsx                   # Grid 3-4 tarjetas (icono + título + descripción)
└── footer.tsx                             # Links institucionales + copyright
```

### Flujo de render

```
app/layout.tsx                              ← ClerkProvider (compartido con toda la app)
└── app/page.tsx                            ← Server Component
    ├── PublicHeader
    │   ├── Logo                            ← components/shared/logo.tsx
    │   ├── Nav (Características, Precios, etc.)
    │   └── SignInButton + SignUpButton     ← features/auth/components/
    ├── Hero
    │   └── CTA → /sign-up
    ├── FeaturesSection
    └── Footer
```

### Reglas específicas

- **`public-header.tsx`** debe ser `"use client"` solo si los botones de Clerk (`<SignInButton/>`) lo requieren. Alternativa: header como Server Component y aislar los botones en un wrapper cliente pequeño.
- **`hero.tsx`**, **`features-section.tsx`** y **`footer.tsx`** son Server Components puros (JSX + Tailwind, sin interactividad).
- `app/page.tsx` está **fuera** de los route groups `(auth)` y `(dashboard)`, por lo que es pública por defecto y no hereda layouts de dashboard.
- La landing no necesita `loading.tsx` ni `error.tsx` propios (hereda del root layout).
