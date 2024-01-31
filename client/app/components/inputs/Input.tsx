interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
}) => {
  return (
    <div className="w-full relative ">
      <input
        id={id}
        disabled={disabled}
        placeholder=""
        type={type}
        className={`peer w-full p-1 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
    ${formatPrice ? "pl-9" : " pl-4"}
    `}
      />
      <label
        className={`absolute text-sm duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
    ${formatPrice ? "left-9" : "left-4"}
    peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0
    peer-focus:scale-75
    peer-focus:-translate-y-4
    text-zinc-400
    `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
