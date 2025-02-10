"use client";

import AdminNavigation from "../components/AdminNavigation";
import { logout } from "../login/actions";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result?.redirectTo) {
      router.push(result.redirectTo);
    }
  };

  return (
    <div className="p-6 pt-20">
      <AdminNavigation onLogout={handleLogout} />
      <h1 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
      <p className="text-gray-400">Manage everything from here.</p>
    </div>
  );
}
