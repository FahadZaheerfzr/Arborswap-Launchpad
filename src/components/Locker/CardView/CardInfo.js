import React from 'react'

export default function CardInfo({ heading, value }) {
  return (
    <div className="flex justify-between items-center mt-5">
      <span className="font-gilroy text-gray dark:text-gray-dark text-sm font-medium">{heading}</span>

      <span className="font-gilroy text-dark-text dark:text-light-text font-semibold">{value}</span>
    </div>
  )
}
