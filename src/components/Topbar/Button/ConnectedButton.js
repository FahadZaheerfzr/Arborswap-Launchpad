import { shortenAddress, useEthers } from '@usedapp/core'
import React from 'react'

const ConnectedButton = () => {
  const { account } = useEthers()
  return (
    <button className="hidden h-full md:flex border-2 rounded-md border-primary-green border-opacity-50 items-center justify-between bg-white dark:bg-dark-1 ml-8">
      <img className="ml-5" src="/images/topbar/wallets/metamask.svg" alt="metamask" />

      <span className=" font-gilroy font-medium ml-2 dark:text-light">{shortenAddress(account)}</span>
      <div className="flex ml-3 mr-6">
        <div className="w-1 h-1 rounded-full bg-primary-green mr-[2px]" />
        <div className="w-1 h-1 rounded-full bg-primary-green mr-[2px]" />
        <div className="w-1 h-1 rounded-full bg-primary-green" />
      </div>
    </button>
  )
}

export default ConnectedButton
