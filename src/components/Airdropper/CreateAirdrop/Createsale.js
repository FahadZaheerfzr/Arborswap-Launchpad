import React, { useState } from 'react'
import PreviewHeader from '../../Common/PreviewHeader'
import BackArrowSVG from '../../../svgs/back_arrow'
import PreviewDetails from '../../Common/PreviewDetails'
import { useModal } from 'react-simple-modal-provider'
import { useEthers } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import AirdropFactoryAbi from 'config/abi/AirdropFactory.json'
import { formatBigToNum } from '../../../utils/numberFormat'
import { useNavigate } from 'react-router-dom'
import StartPublicAirdropCreationPage from '../AirdropPage/Modal/StartPublicAirdropCreationPgae'
import StartPrivateAirdropCreation from '../AirdropPage/Modal/StartPrivateAirdropCreation'
import AddAllocationsCreation from './AddAllocationsCreationPage'


export default function Createsale({ setAirdropData, airdropData, token, setActive, amount }) {

  const { library } = useEthers()
  const [modal, showModal] = useState(0);
  const [error, setError] = useState();
  

  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')

  const handleCreateAirdrop = async () => {
    openLoadingModal()
    const contract = new Contract('0x7442c5433e34Ddf0088d60BeFFefB1536d421904', AirdropFactoryAbi, library.getSigner())
    const fee = await contract.fee();
    try {

      const createAirdrop = await contract.deployAirdrop(airdropData.tokenAddress,
        [airdropData.image,
        airdropData.description,
        airdropData.tags,
        airdropData.website,
        airdropData.twitter,
        airdropData.linkedin,
        airdropData.github,
        airdropData.name], {
        value: fee.privateFee
      })
      await createAirdrop.wait()
      const airdropAddress = await contract.getLastDeployedAirdrop();
      setAirdropData((prevState) => ({
        ...prevState,
        airdropAddress: airdropAddress
      }))
      setError(undefined)
      //navigate(`/airdropper/airdrops/${airdropAddress}`)
      closeLoadingModal()
      showModal(2)
      return
    } catch (error) {
      setError(error.reason)
      closeLoadingModal()
      return false
    }
  }

  const handleCreatePublicAirdrop = async () => {
    openLoadingModal()
    const contract = new Contract('0x7442c5433e34Ddf0088d60BeFFefB1536d421904', AirdropFactoryAbi, library.getSigner())
    const fee = await contract.fee();
   // const publicFee = fee

    try {

      const createAirdrop = await contract.deployPublicAirdrop(airdropData.tokenAddress,
        [airdropData.image,
        airdropData.description,
        airdropData.tags,
        airdropData.website,
        airdropData.twitter,
        airdropData.linkedin,
        airdropData.github,
        airdropData.name], {
        value: fee.publicFee,
      })
      
      await createAirdrop.wait()
      const airdropAddress = await contract.getLastDeployedAirdrop();
      setAirdropData((prevState) => ({
        ...prevState,
        airdropAddress: airdropAddress
      }))
      //navigate(`/airdropper/airdrops/${airdropAddress}`)
      setError(undefined)
      closeLoadingModal()
      showModal(4)
      return
    } catch (error) {
      setError(error.reason)
      closeLoadingModal()
      return false
    }
  }


  return (
    <div className="">
      {modal !== 0 &&
        <div className="fixed backdrop-blur-[7px] w-full h-full flex justify-center  z-50  top-0 left-0">
          <div className='h-screen sticky top-0 w-full flex items-center'>
            {modal === 2 && <AddAllocationsCreation decimals={airdropData.tokenDecimals} airdropAddress={airdropData.airdropAddress} tokenAddress={airdropData.tokenAddress} showModal={showModal} modal={modal} />}
            {modal === 3 && <StartPrivateAirdropCreation decimals={airdropData.tokenDecimals} airdropAddress={airdropData.airdropAddress} tokenAddress={airdropData.tokenAddress} showModal={showModal} modal={modal} />}
            {modal === 4 && <StartPublicAirdropCreationPage decimals={airdropData.tokenDecimals} tokenAddress={airdropData.tokenAddress} airdropAddress={airdropData.airdropAddress} showModal={showModal} modal={modal} />}
          </div>
        </div>
      }
      {/* <div className="flex items-center">
        <img src={token.icon} alt={token.name} className="w-[54px] h-[54px]" />

        <div className=" ml-4">
          <div className="flex items-center">
            <h3 className=" font-bold dark:text-light-text">{token.name}</h3>
          </div>

          <div className="flex items-center mt-2">
            {token.tags.map((tag) => (
              <div
                key={tag.id}
                className="bg-[#F5F1EB] dark:bg-dark-3 mr-[6px] py-[2px] px-[10px] rounded text-xs text-gray dark:text-gray-dark font-medium"
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <PreviewHeader heading={'Airdrop Info'} />

      <PreviewDetails name="Description" value={airdropData.description} />
      <PreviewDetails name="Tags" value={airdropData.tags} />
      <PreviewDetails name="Website" value={airdropData.website} />
      <PreviewDetails name="Twitter" value={airdropData.twitter} />
      <PreviewDetails name="Linkedin" value={airdropData.linkedin} />
      <PreviewDetails name="Github" value={airdropData.github} />


      <PreviewHeader heading={'Token address Details'} />

      <PreviewDetails name="Name" value={airdropData.tokenName} />
      <PreviewDetails name="Symbol" value={airdropData.tokenSymbol} />
      <PreviewDetails name="Decimals" value={airdropData.tokenDecimals} />
      <PreviewDetails
        name="Total Supply"
        value={`${formatBigToNum(airdropData.tokenSupply, airdropData.tokenDecimals)} ${airdropData.tokenSymbol}`}
      />

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive('Project Details')}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
          </button>



          <button
            className="bg-primary-green disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
            // disabled={address.length < 5}
            onClick={airdropData.type === 'private' ? handleCreateAirdrop : handleCreatePublicAirdrop}
          >
            Create Airdrop
          </button>
          {error && (
             <p className="mt-4 text-red-500 text-center">{error.replace(/\b\w/g, (c) => c.toUpperCase())}</p>
            )}
        </div>
      </div>
    </div>
  )
}
