import React from 'react'
import PreviewDetails from 'components/Common/PreviewDetails'
import { useEthers} from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { useParams } from 'react-router-dom'

import { useModal } from 'react-simple-modal-provider'
import PublicAirdropAbi from 'config/abi/PublicAirdropAbi.json';

const Live = ({whitelist_address, amount, handleStatusChange, numberOfClaims, numberOfRemainingClaims, claimSize, Private }) => {
  const { library} = useEthers()
  const { id } = useParams()

  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')
  
  
  const handleCancelPublicAirdrop = async () => {
    openLoadingModal()
    const contract = new Contract(id, PublicAirdropAbi, library.getSigner())
    try {
      const cancelAirdrop = await contract.cancelAirdrop()
      await cancelAirdrop.wait()
      //navigate(`/locked-assets`)
      closeLoadingModal()
      handleStatusChange('Ended')
      return
    } catch (error) {
      closeLoadingModal()
      return false
    }
  }  
  return (
    <div className='flex flex-col'>
        {Private && <PreviewDetails name={"Address Whitelisted"} value={whitelist_address}/>}
        {!Private && <PreviewDetails name={"Total Claims"} value={numberOfClaims}/>}
        {!Private && <PreviewDetails name={"Remaining Claims"} value={numberOfRemainingClaims}/>}
        {!Private && <PreviewDetails name={"Claim Size"} value={claimSize}/>}
        <PreviewDetails name={"Amount To Airdrop"} value={amount.toLocaleString()}/>
        <div className='mt-10'>
            <button className={`w-full bg-[#EB5757] bg-opacity-10 rounded-md text-[#EB5757] font-bold py-4`}
              onClick={() => {handleCancelPublicAirdrop()}}>
                Cancel Airdrop
            </button>
        </div>
    </div> 
  )
}

export default Live