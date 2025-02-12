import { cln } from '@/utilities/classnames';

export default function InputLabel({
  name,
  dataSource,
  children,
  type,
  onChange,
  required = true,
}) {
  return (
    <div className="flex relative w-full sm:w-[calc(50%-8px)]">
      <input
        id={name}
        type={type}
        name={name}
        value={dataSource[name]}
        onChange={onChange}
        className={cln(
          dataSource[name].length === 0 ? 'border-neutral-300' : 'border-green-600',
          'peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none',
        )}
        placeholder=" "
        required={required}
      />
      <label
        htmlFor={name}
        className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out"
      >
        {children}
      </label>
    </div>
  );
}
