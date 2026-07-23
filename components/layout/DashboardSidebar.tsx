import { NavLink } from "../ui/NavLink";
import { SignOutControl } from "./SignOutControl";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    iconWhite: "/dashboard-icon-white.svg",
    iconGray: "/dashboard-icon-gray.svg",
  },
  {
    name: "Transactions",
    href: "/transactions",
    iconWhite: "/transactions-icon-white.svg",
    iconGray: "/transactions-icon-gray.svg",
  },
  {
    name: "Settings",
    href: "/settings",
    iconWhite: "/settings-icon-white.svg",
    iconGray: "/settings-icon-gray.svg",
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
          {sidebarLinks.map((link) => (
            <NavLink key={link.name} {...link} />
          ))}
        </ul>
        <SignOutControl />
      </div>
    </div>
  );
};
