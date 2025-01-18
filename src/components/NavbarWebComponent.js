import React from "react";
import NavLink from "./NavLink";

const NavbarWebComponent = () => {
  return (
    <div className="flex h-[56px] justify-center items-center gap-[32px] px-[32px] py-[8px] rounded-[10px] border-[2px] border-white bg-black shadow-[-1px_1px_0px_0px_#000,_-2px_2px_0px_0px_#000,_-3px_3px_0px_0px_#000,_-4px_4px_0px_0px_#000]">
      <ul className="flex justify-center items-center gap-[32px] px-[32px] py-[8px] transition-all duration-200 ease-in-out">
        <li>
          <NavLink text="Speakers" path="/speakers" />
        </li>
        <li>
          <NavLink text="Agenda" path="/agenda" />
        </li>
        <li>
          <NavLink text="What to expect" path="/what-to-expect" />
        </li>
        <li>
          <NavLink text="Tickets" path="/tickets" />
        </li>
      </ul>
    </div>
  );
};

export default NavbarWebComponent;
