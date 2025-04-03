"use client";

import { usePathname, useRouter } from "next/navigation";
import { cln } from "@/utilities/classnames";

export default function NavLink({ path, text, locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const newpath = path.slice(1);

  const activePaths = ["our-team"]; //speakers deleted until sale

  const handleClick = (e) => {
    e.preventDefault();

    // Ellenőrizzük, hogy a homepage-en vagyunk-e
    if (pathname === "/" || pathname === "/en" || pathname === "/hu") {
      // Ha aktiv a subpage akkor navigaljunk oda ha nem akkor csak gorgessunk le a homepagen
      if (activePaths.includes(newpath)) {
        router.push(path);
      } else {
        const section = document.getElementById(path.slice(1));
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      if (activePaths.includes(newpath)) {
        router.push(path);
      } else {
        // Navigálás a home oldalra, majd hash érték hozzáadása a görgetéshez
        router.push(`/${locale || "en"}#${newpath}`);
      }
    }
  };

  return (
    <a href={path} onClick={handleClick}>
      <div
        className={cln(
          "py-3 px-2 text-nowrap text-center text-[16px] font-exo font-bold leading-normal bg-clip-text bg-neutral-700 lx:bg-opacity-0 cursor-pointer rounded-md",
          pathname.includes(path)
            ? "text-primary-600"
            : "text-white hover:text-primary-600"
        )}
        style={{
          textShadow: pathname.includes(path)
            ? "none"
            : "0px 2px 0px rgba(255,205,50,0.2)",
        }}
      >
        {text}
      </div>
    </a>
  );
}
