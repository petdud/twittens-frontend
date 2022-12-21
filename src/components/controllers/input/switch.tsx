import { Switch as SwitchComponent} from '@headlessui/react'
import { classNames } from '../../../utils'

interface ISwitchProps {
  label: string;
  value: boolean;
  hideLabel?: boolean;
  onChange?: (value: boolean) => void;
}

export const Switch = ({label, hideLabel, onChange, value}: ISwitchProps) => (
  <SwitchComponent.Group as="div" className="flex items-center">
    {!hideLabel && 
      <SwitchComponent.Label as="span" className="ml-3 mr-3">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
      </SwitchComponent.Label>
    } 
    <SwitchComponent
      checked={value}
      onChange={onChange}
      className={classNames(
        value ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      )}
    >
      {hideLabel && <span className="sr-only">{label}</span>}
      <span
        aria-hidden="true"
        className={classNames(
          value ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </SwitchComponent>
  </SwitchComponent.Group>
)
