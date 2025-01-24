"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cln } from "@/utilities/classnames";

export default function NavLink(props) {
  const pathname = usePathname();
  const active = pathname === props.path;

  const href = props.path.slice(1);

  //   hover:opacity-65

  return (
    <a href={`#${href}`}>
      <div
        className={cln(
          "py-3 px-2 text-nowrap text-center text-[16px] font-exo font-bold leading-normal bg-clip-text bg-neutral-700 lx:bg-opacity-0 cursor-pointer rounded-md",
          active ? "text-primary-600" : "text-white hover:text-primary-600"
        )}
        style={{
          textShadow: active ? "none" : "0px 2px 0px rgba(255,205,50,0.2)",
        }}
      >
        {props.text}
      </div>
    </a>
  );
}
