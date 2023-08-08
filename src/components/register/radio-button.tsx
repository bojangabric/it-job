import { RadioGroup } from '@headlessui/react';
import { type ROLE } from 'components/register/fields';
import { type SVGProps } from 'react';

interface RadioButtonProps {
  values: string[];
  selected: string;
  onChange: (value: ROLE) => void;
}

export const RadioButton = ({
  values,
  selected,
  onChange
}: RadioButtonProps) => {
  return (
    <RadioGroup value={selected} onChange={onChange}>
      <div className="flex space-x-2">
        {values.map(value => (
          <RadioGroup.Option
            value={value}
            key={value}
            className={({ checked }) =>
              `${
                checked ? 'bg-white text-gray-800' : 'bg-gray-50 text-gray-500'
              } relative flex w-full cursor-pointer rounded-md border border-gray-300 p-3`
            }
          >
            {({ checked }) => (
              <div className="flex w-full items-center justify-between">
                <RadioGroup.Label as="p" className="uppercase">
                  {value}
                </RadioGroup.Label>
                {checked && <CheckIcon className="h-6 w-6" />}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#93c5fd" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#2563eb"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
