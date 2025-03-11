import { Fredoka, Exo } from "next/font/google";
import "./globals.css";
import AdminNavigation from "../components/AdminNavigation";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export const metadata = {
  title: "Budapest Bitcoin Admin",
  description: "Budapest Bitcoin Admin panel",
  icons: {
    icon: "/bpconflogo.svg",
    shortcut: "/bpconflogo.svg",
    apple: "/bpconflogo.svg",
  },
};

export default async function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${exo.variable} antialiased bg-neutral-300`}
      >
        <AdminNavigation />
        <main className="pt-16 px-0 lg:px-6">{children}</main>
      </body>
    </html>
  );
}
