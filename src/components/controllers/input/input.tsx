interface IInputProps {
  autoComplete?: string;
  disabled?: boolean;
  id: string;
  label: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "number" | "password" | "email";
  value: string | number;
}

export const Input = ({
  autoComplete,
  disabled,
  id,
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: IInputProps) => (
  <>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-400 pb-2">
      {label}
    </label>
    <input
      autoComplete={autoComplete}
      className="dark:bg-neutral-900 dark:text-white dark:border-neutral-500 dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      disabled={disabled}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      required={required}
    />
  </>
);
