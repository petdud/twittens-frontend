interface ICheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({id, label, checked, onChange}: ICheckboxProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center flex-row-reverse">
        <label htmlFor={id} className="cursor-pointer font-light text-gray-700 dark:text-gray-500 px-1">
          {label}
        </label>
        <input
          id={id}
          name={id}
          checked={checked}
          onChange={onChange}
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
    </div>
  )
}