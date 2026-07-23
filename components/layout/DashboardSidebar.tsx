import { NavLink } from "../ui/NavLink";
import { SignOutControl } from "./SignOutControl";

const SidebarLink = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon_white: "/dashboard-icon-white.svg",
    icon_gray: "/dashboard-icon-gray.svg",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon_white: "/transactions-icon-white.svg",
    icon_gray: "/transactions-icon-gray.svg",
  },
  {
    name: "Settings",
    href: "/settings",
    icon_white: "/settings-icon-white.svg",
    icon_gray: "/settings-icon-gray.svg",
  },
];

export const DashboardSidebar = () => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="pt-2 pb-8">
        <h3 className="font-extrabold text-2xl">FinTrack</h3>
        <span className="text-base text-secondary">Premium Finance</span>
      </div>
      {/* Contenedor de los enlaces del sidebar */}
      <div className="flex flex-col justify-between flex-1">
        <ul className="flex-col gap-4 flex">
          {SidebarLink.map((link) => (
            <NavLink key={link.name} {...link} />
          ))}
        </ul>
        <SignOutControl />
      </div>
    </div>
  );
};
