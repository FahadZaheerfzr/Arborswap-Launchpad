import React from 'react'

export default function   PreviewDetails({ name, value, icon, verified }) {
  return (
    <div className="py-5 flex gap-x-5 justify-between border-b border-dashed border-dim-text border-opacity-30">
      <span className="font-gilroy text-sm font-medium text-gray dark:text-gray-dark">{name}</span>

      <div className="flex items-center break-all">
        {icon && <img className="w-5 h-5 mr-1" src={icon} alt="chain-icon" />}
        <span className="font-gilroy  text-sm font-bold text-dark-text dark:text-light-text">{value}</span>
 
        {verified && (
          <img className="w-[14px] h-[14px] ml-1" src="/images/home/collections/cards/verified.svg" alt="verified" />
        )}
      </div>
    </div>
  )
}
