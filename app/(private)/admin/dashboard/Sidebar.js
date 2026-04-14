"use client";

import Link from "next/link";
import {
  HomeIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import ThemeToggle from "@/components/ThemeToggle";

// Admin sidebar navigation options
const sidebarOptions = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/admin/dashboard/users",
    label: "Users",
    icon: UsersIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* Mobile overlay — click to close sidebar */}
      <label
        htmlFor="my-drawer-2"
        className="fixed inset-0 z-30 bg-black/50 hidden peer-checked:block lg:hidden cursor-pointer"
      />

      {/* Sidebar panel */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-base-200 text-base-content -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0">
        {/* Main nav items */}
        <ul className="flex flex-col gap-1 p-4 flex-1">
          {sidebarOptions.map((option) => {
            const isActive = pathname === option.href;
            return (
              <li key={option.href}>
                <Link
                  href={option.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  {option.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Theme toggle + Logout — desktop only */}
        <div className="p-4 pt-0 hidden lg:flex lg:flex-col lg:gap-1">
          <div className="flex items-center gap-2 px-4 py-2">
            <ThemeToggle />
            <span className="text-sm text-base-content/60">Toggle theme</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg w-full text-error hover:bg-error/20 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
