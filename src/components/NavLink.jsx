"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props) {
  const pathname = usePathname();
  const active = pathname === props.path;

  //   hover:opacity-65

  return (
    <Link
      className={
        active
          ? "text-primary-600 text-center text-[16px] font-exo font-bold leading-normal bg-clip-text translate-y-[2px]"
          : " text-white text-center text-[16px] font-exo font-bold leading-normal  bg-clip-text hover:text-primary-600"
      }
      href={props.path}
      style={{
        textShadow: active ? "none" : "0px 2px 0px rgba(255,205,50,0.2)",
      }}
    >
      {props.text}
    </Link>
  );
}
