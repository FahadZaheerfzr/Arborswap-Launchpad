import React from 'react';
import PreviewDetails from 'components/Common/PreviewDetails';
import { useEthers} from '@usedapp/core';
import { useParams } from 'react-router-dom'
import { Contract } from '@ethersproject/contracts';
import { useModal } from 'react-simple-modal-provider';
import PrivateAirdropAbi from 'config/abi/PrivateAirdropAbi.json';


const NotStartedPrivate = ({ airdrop , whitelist_address, showModal}) => {
    const { id } = useParams()
    const {library } = useEthers()

    const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal');


    const handleCancelPrivateAirdrop = async () => {
        openLoadingModal()
        const contract = new Contract(id, PrivateAirdropAbi, library.getSigner())
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
            <PreviewDetails name={"Address Whitelisted"} value={whitelist_address} />
            <div className='mt-10'>
                <button className={`w-full bg-primary-green bg-opacity-10 rounded-md text-primary-green font-bold py-4 mb-7`}
                    onClick={() => { showModal(3) }}>
                    Start Airdrop
                </button>
                <button className={`w-full bg-[#EB5757] bg-opacity-10 rounded-md text-[#EB5757] font-bold py-4 mb-7`}
                    onClick={handleCancelPrivateAirdrop}>
                    Cancel Airdrop
                </button>
                <button className={`w-full bg-light dark:bg-dark text-dark-text dark:text-light-text rounded-md font-bold py-4 mb-7`}
                    onClick={() => { showModal(1) }}>
                    Set Allocations
                </button>
                <button className={`w-full bg-light dark:bg-dark text-dark-text dark:text-light-text rounded-md font-bold py-4`}
                    onClick={() => { showModal(2) }}>
                    Remove Allocations
                </button>
            </div>
        </div>
    )
}

export default NotStartedPrivate