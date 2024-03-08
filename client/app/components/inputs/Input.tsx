import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  defaultValue?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  textarea?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  onChange?: (id: string, value: string) => void;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  defaultValue,
  value,
  type,
  disabled,
  textarea,
  formatPrice,
  required,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={18} className="text-gray-400 absolute top-5 left-2" />
      )}
      {textarea ? (
        <textarea
          id={id}
          disabled={disabled}
          placeholder=""
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange && onChange(id, e.target.value)}
          className={`peer w-full p-1 pt-6 px-4 h-48 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${errorMessage ? "border-red-300" : "border-gray-300"} 
    `}
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          placeholder=""
          defaultValue={defaultValue}
          value={value}
          type={type}
          onChange={(e) => onChange && onChange(id, e.target.value)}
          className={`peer w-full p-1 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
    ${formatPrice ? "pl-9" : " pl-4"}
    ${errorMessage ? "border-red-300" : "border-gray-300"} 
    `}
        />
      )}
      <label
        className={`absolute bg-white text-sm duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
    ${formatPrice ? "left-9" : "left-4"}
    peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:-translate-y-4
    ${errorMessage ? "text-red-400" : "text-zinc-400"} 
    `}
      >
        {label}
      </label>
      {errorMessage && <p className="text-red-400 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default Input;
