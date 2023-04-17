import React from 'react'

import { useEthers } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { useParams } from 'react-router-dom'
import { useModal } from 'react-simple-modal-provider'
import PublicAirdropAbi from 'config/abi/PublicAirdropAbi.json';


const NotStartedPublic = ({showModal}) => {
  const { library} = useEthers()
  const { id } = useParams()

  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')
  

  const handleCancelPublicAirdrop = async () => {
    openLoadingModal()
    const contract = new Contract(id, PublicAirdropAbi, library.getSigner())
    try {
      const cancelAirdrop = await contract.cancelAirdrop()
      await cancelAirdrop.wait()
      closeLoadingModal()
      //navigate(`/locked-assets`)
      return
    } catch (error) {
      closeLoadingModal()
      return false
    }
  }  

  return (
    <div className='flex flex-col'>
        <div className='my-10'>
            <button className={`w-full bg-primary-green bg-opacity-10 rounded-md text-primary-green font-bold py-4 mb-7`}
                onClick={() => {showModal(4)}}>
                Start Airdrop
            </button>
            <button className={`w-full bg-[#EB5757] bg-opacity-10 rounded-md text-[#EB5757] font-bold py-4`}
                onClick={() => {handleCancelPublicAirdrop()}}>
                Cancel Airdrop
            </button>
        </div>
    </div>
  )
}

export default NotStartedPublic