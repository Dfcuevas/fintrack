import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Columna izquierda - sidebar fijo */}
      <aside className="w-64 shrink-0 border-r border-stroke bg-softBlue h-full">
        <DashboardSidebar />
      </aside>

      {/* Columna derecha - contenido dinámico */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
