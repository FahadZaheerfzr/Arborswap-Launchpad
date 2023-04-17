import React from 'react'
import DisconnectSVG from 'svgs/Topbar/Disconnect'

export default function Dropdown() {
  return (
    <div className="absolute w-[250px] rounded-md border border-[#e7e3ff] dark:border-dim-text-dark bg-white dark:bg-dark-1">
      <div className="flex items-center text-gray dark:text-gray-dark cursor-pointer justify-between border border-gray hover:bg-primary-green hover:text-light dark:border-gray-dark border-opacity-20 px-4 py-4">
        <span className="font-medium">Wallet</span>

        <img src="/images/topbar/warning.svg" alt="warning" />
      </div>

      <div className="flex items-center text-gray dark:text-gray-dark cursor-pointer justify-between border border-gray hover:bg-primary-green hover:text-light dark:border-gray-dark border-opacity-20 px-4 py-4">
        <span className="font-medium">Transactions</span>
      </div>
      <div className="flex items-center text-gray dark:text-gray-dark cursor-pointer justify-between border border-gray hover:bg-primary-green hover:text-light dark:border-gray-dark border-opacity-20 px-4 py-4">
        <span className="font-medium">Make a Profile</span>

        <div className="rounded-full w-2 h-2 bg-[#e56060]" />
      </div>
      <div className="flex items-center text-gray dark:text-gray-dark cursor-pointer justify-between border border-gray hover:bg-primary-green hover:text-light dark:border-gray-dark border-opacity-20 px-4 py-4">
        <span className="font-medium">Disconnect</span>

        <DisconnectSVG className="fill-dark-text dark:fill-light-text" />
      </div>
    </div>
  )
}
