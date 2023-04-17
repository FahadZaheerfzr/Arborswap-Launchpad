import React, { useState, useEffect } from 'react'
import Live from './StartedNotLive'
import Ended from './StartedLive'
import NotStartedPublic from './NotStartedPublic'
import NotStartedPrivate from './NotStartedPrivate'
import {useAirdropIsCancelled, useAirdropIsStarted, useAirdropIsEmpty} from 'hooks/useAirdropStatus'
import { useParams } from 'react-router-dom'
import { getPublicAirdropsInfos } from 'utils/getAirdropList'
import { formatUnits } from 'ethers/lib/utils'

const AdminPanel = ({
    airdrop,
    whitelist_address,
    participants,
    amount,
    allocated,
    showModal,
    Private
}) => {
    const { id } = useParams()
    const isCancelled = useAirdropIsCancelled(id);
    const isStarted = useAirdropIsStarted(id);
    const isEmpty = useAirdropIsEmpty(id);
    const [status, setStatus] = useState('');
    const [numberOfClaims, setNumberOfclaims] = useState(0);
    const [numberOfRemainingClaims, setNumberOfRemainingClaims] = useState(0);
    const [claimSize, setClaimSize] = useState(0);

    function handleStatusChange(newStatus) {
        //debugger
        setStatus(newStatus);
    }

    if (Private === false) {
        (async () => {
          try {
    
            const publicAirdropInfos = await getPublicAirdropsInfos([id]);
            const numberOfClaimsNum = formatUnits(publicAirdropInfos.data[0][1], 0)
            const numberOfRemainingClaimsNum = formatUnits(publicAirdropInfos.data[0][2], 0)
            const claimSizeNum = formatUnits(publicAirdropInfos.data[0][0], 18)
            setNumberOfRemainingClaims(numberOfRemainingClaimsNum)
            setNumberOfclaims(numberOfClaimsNum)
            setClaimSize(claimSizeNum)
          } catch (error) {
            // Handle the error
          }
        })();
    }

    useEffect(() => {

        //debugger
   
        if (typeof isCancelled == "undefined") {
          return
        }
  
        if (typeof isStarted == "undefined") {
            return
        }
       
        if (typeof isEmpty == "undefined") {
            return
        }
       
        if(isStarted[0] === true && (isEmpty[0] === false && isCancelled[0] === false)){
            setStatus('Live')
        }
  
        if(isStarted[0] === false && isEmpty[0] === false  && isCancelled[0] === false){
            setStatus('Timed')
        }
    
        if(isEmpty[0] === true || isCancelled[0] === true){
            setStatus('Ended')
        }
    
        
    }, [isCancelled, isStarted, isEmpty, id])

    

    return (
        <div className="hidden md:block px-9 pb-9 bg-white dark:bg-dark-1 rounded-[20px]">
            <div className="w-full flex justify-center">
                <div className='w-1/2 py-5 flex justify-center items-center border-b-2 border-primary-green '>
                    <span className='font-bold text-primary-green'>
                        Admin Panel
                    </span>
                </div>
            </div>
             {/* <div className='mt-5'>
                {started ? 
                upcoming && status !== "Ended" && status !== "Live" ? <StartedNotLive whitelist_address={whitelist_address} showModal={showModal}/>
                :<Ended whitelist_address={whitelist_address} amount={amount} allocated={allocated} participants={participants} status={status} showModal={showModal}/>
                    :
                    Private ? 
                    <NotStartedPrivate airdrop={airdrop} whitelist_address={whitelist_address} showModal={showModal}/> 
                    : 
                    <NotStartedPublic showModal={showModal} />
                    }
                </div> */}
            <div className='mt-5'>
                {status === 'Ended' && <Ended Private={Private} numberOfClaims={numberOfClaims} numberOfRemainingClaims={numberOfRemainingClaims} claimSize={claimSize} whitelist_address={whitelist_address} amount={0} allocated={allocated} participants={participants} status={status} showModal={showModal}/>}
                {status === 'Live' && <Live Private={Private} numberOfClaims={numberOfClaims} numberOfRemainingClaims={numberOfRemainingClaims} claimSize={claimSize} whitelist_address={whitelist_address} amount={amount}  status={status} handleStatusChange={handleStatusChange}/>}
                {(status === 'Timed' && Private) && <NotStartedPrivate numberOfClaims={numberOfClaims} numberOfRemainingClaims={numberOfRemainingClaims} claimSize={claimSize} airdrop={airdrop} whitelist_address={whitelist_address} showModal={showModal}/>}
                {(status === 'Timed' && !Private) && <NotStartedPublic numberOfClaims={numberOfClaims} numberOfRemainingClaims={numberOfRemainingClaims} claimSize={claimSize} showModal={showModal}/>}
                </div>   
        </div>
    )
}

export default AdminPanel
 
