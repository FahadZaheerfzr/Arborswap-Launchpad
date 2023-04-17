import React from 'react'
import PreviewDetails from 'components/Common/PreviewDetails'

const Ended = ({whitelist_address, participants, amount, allocated, status, showModal, numberOfClaims, numberOfRemainingClaims, claimSize, Private}) => {
  
  return (
    <div className='flex flex-col'>
        <PreviewDetails name={"Address Whitelisted"} value={whitelist_address}/>
        <PreviewDetails name={"Participants"} value={participants}/>
        <PreviewDetails name={"Tokens Remianing"} value={(amount * (1- allocated/100)).toLocaleString()}/>
        <div className='mt-10'>
            {status === "Ended" ? 
            <button className={`w-full bg-light dark:bg-dark text-dark-text dark:text-light-text rounded-md font-bold py-4 mb-7`}>
                Ended
            </button> :
            <button className={`w-full bg-primary-yellow bg-opacity-10 rounded-md text-primary-yellow font-bold py-4`}
                onClick={() => {showModal(2)}}>
                End Airdrop
            </button>
            }
        </div>
    </div> 
  )
}

export default Ended