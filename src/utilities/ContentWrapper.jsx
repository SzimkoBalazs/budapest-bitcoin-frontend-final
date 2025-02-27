import { cln } from '@/utilities/classnames';

const ContentWrapper = ({ children, className, styleProp, maxWidth }) => {
  return (
    <div
      className={cln(
        'relative mx-auto px-[16px] sm:px-[40px]',
        className,
        maxWidth ? maxWidth : 'max-w-[1128px]',
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
