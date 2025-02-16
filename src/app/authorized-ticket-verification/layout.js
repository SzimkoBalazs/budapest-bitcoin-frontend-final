import { Fredoka, Exo } from "next/font/google";
import "./globals.css";

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
  title: "Budapest Bitcoin Ticket Verification",
  description: "Budapest Bitcoin Ticket Verification",
  icons: {
    icon: "/bpconflogo.svg",
    shortcut: "/bpconflogo.svg",
    apple: "/bpconflogo.svg",
  },
};

export default async function TicketVerificationLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${exo.variable} antialiased bg-neutral-300`}
      >
        <main className="pt-8 px-6">{children}</main>
      </body>
    </html>
  );
}
