import React from "react";


const Partner = ({children, href}) => {
  return (
      <a
        className="flex items-center justify-center w-[160px] h-[120px]"
        href={href}
        target="_blank"
      >
          {children}
      </a>
  );
};

export default Partner;
