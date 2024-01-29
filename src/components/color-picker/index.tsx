import { RadioGroup } from '@headlessui/react';
import { h } from 'preact';

import { classNames } from '../../utils/helper-functions';


const ColorPicker = ({ selectedColor, setSelectedColor, uniqueColors }) => {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900">Color</h2>

      <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {uniqueColors.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color.id}
              className={({ active, checked }) =>
                classNames(
                  color.ring_color,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                )
              }
            >
              <label htmlFor={color.name} className="sr-only">{color.name}</label>
              <span
                aria-hidden="true"
                className={classNames(
                  color.bg_color,
                  'h-8 w-8 rounded-full border border-black border-opacity-10'
                )}
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default ColorPicker;