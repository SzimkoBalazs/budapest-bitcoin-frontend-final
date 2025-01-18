const ContentWrapper = ({ children, className, styleProp }) => {
  return (
    <div className={`w-full ${className || ""}`} style={styleProp}>
      <div className="max-w-[1440px] mx-auto px-[40px]">{children}</div>
    </div>
  );
};

export default ContentWrapper;
