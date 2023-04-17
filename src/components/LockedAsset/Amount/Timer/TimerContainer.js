import React from 'react'

export default function TimerContainer({ value, head }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-2xl font-bold text-gray dark:text-gray-dark">{value}</span>
      <span className="text-xs font-medium text-dim-text dark:text-dim-text-dark">{head}</span>
    </div>
  )
}
