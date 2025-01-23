const ContentWrapper = ({ children, className, styleProp, id }) => {
  return (
    <div className={` ${className || ""}`} style={styleProp}>
      <div className="max-w-[1440px] mx-auto px-[16px] sm:px-[40px]">
        {children}
      </div>
    </div>
  );
};

export default ContentWrapper;
