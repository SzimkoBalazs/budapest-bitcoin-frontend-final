"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminNavigation({ onLogout }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/info/admin" },
    { name: "Tickets", href: "/info/admin/tickets" },
    { name: "Orders", href: "/info/admin/orders" },
    { name: "Coupons", href: "/info/admin/coupons" },
    { name: "Validation", href: "/info/admin/validation" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Menü ikon mobilon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigációs menü (Reszponzív) */}
          <div
            className={`lg:flex ${
              menuOpen ? "block" : "hidden"
            } w-full lg:w-auto`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0 mt-4 lg:mt-0">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition ${
                      pathname === item.href ? "font-bold text-blue-600" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout gomb */}
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition hidden lg:block"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
