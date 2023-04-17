import React from 'react'

export default function Tooltip({ text }) {
  return (
    <div className="group flex">
      <img src="/images/lists/question.svg" alt="info" className="ml-2" />

      <div
        id="tooltip-right"
        role="tooltip"
        className="hidden group-hover:block -mt-3 ml-7 absolute  z-10 py-2 px-3 font-medium bg-light dark:bg-dark-3 dark:text-light-text border-opacity-50 text-sm rounded-md"
      >
        {text}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  )
}
