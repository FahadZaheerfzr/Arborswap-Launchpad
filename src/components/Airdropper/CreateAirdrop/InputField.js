import React from 'react'

export default function InputField({
  heading,
  value,
  disabled,
  placeholder,
  changeState,
}) {
  return (
    <div className="w-full lg:w-[100%]">
      <div className="flex items-center">
        <span className="font-gilroy font-semibold text-gray dark:text-gray-dark">
            {heading}
        </span>
      </div>
      <div className="flex items-center rounded-lg border-[1.5px] pr-7 border-dim-text border-opacity-50 justify-between mt-5">
        <input
          className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
          type={"text"}
          value={value}
          disabled={disabled}
          onChange={(e) => changeState(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
