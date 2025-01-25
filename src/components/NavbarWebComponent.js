import React from "react";
import NavLink from "./NavLink";

const NavbarWebComponent = ({ navLinks, locale }) => {
  return (
    <nav
      style={{
        boxShadow:
          "-1px 1px 0px 0px #000, -2px 2px 0px 0px #000, -3px 3px 0px 0px #000, -4px 4px 0px 0px #000",
      }}
      className="flex h-[56px] justify-center items-center px-[8px] py-[8px] rounded-[10px] border-[2px] border-white bg-black"
    >
      <ul className="flex justify-center items-center gap-[8px] xl:gap-[32px] px-4 xl:px-[32px] py-[8px] transition-all duration-200 ease-in-out">
        {navLinks.map((navLink) => (
          <li key={navLink.id}>
            <NavLink
              text={navLink.MenuItemText} // A megfelelő adatot használjuk
              path={navLink.url} // Az URL mezőt használjuk
              locale={locale}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarWebComponent;
