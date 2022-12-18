interface IInputProps {
  id: string;
  label: string;
  type?: "text" | "number";
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
}

export const Input = ({id, disabled, type = "text", label, placeholder, value}: IInputProps) => (
  <>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-400 pb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      className="dark:bg-neutral-900 dark:text-white dark:border-neutral-500 dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </>
)
