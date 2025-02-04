"use client";

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
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
