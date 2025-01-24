import {cln} from "@/utilities/classnames";

const ContentWrapper = ({ children, className, styleProp, insideClassName }) => {
  return (
    <div className={` ${className || ""}`} style={styleProp}>
      <div className={cln("max-w-[1440px] mx-auto px-[16px] sm:px-[40px]", insideClassName)}>{children}</div>
    </div>
  );
};

export default ContentWrapper;
