import React from 'react'
import { useModal } from 'react-simple-modal-provider'
import WalletSVG from 'svgs/Topbar/empty_wallet'

const DisconnectedButton = () => {
  const { open: openModal } = useModal('ConnectionModal')
  return (
    <button className="py-3 px-5 bg-primary-green hover:opacity-40 rounded-md flex items-center focus:outline-none" onClick={openModal}>
      <WalletSVG className="fill-white md:mr-[10px]" />
      <span className="font-gilroy font-semibold text-[#FAF8F5] hidden md:block">
        Connect <span className="hidden md:inline-block">Wallet</span>
      </span>
    </button>
  )
}

export default DisconnectedButton
