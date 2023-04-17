import React, {useState} from 'react'
import BackArrowSVG from '../../../svgs/back_arrow'
import PreviewDetails from '../../Common/PreviewDetails'
import PreviewHeader from '../../Common/PreviewHeader'
import HeadingTags from '../../TokenLocker/Subcomponents/HeadingTags'
import { useModal } from 'react-simple-modal-provider'
import {isAddress } from 'ethers/lib/utils'
import { getTokenInfo } from '../../../utils/tokenInfo'
import { formatBigToNum } from '../../../utils/numberFormat'
import { useEthers } from '@usedapp/core'




export default function Infopage({ setActive, setAirdropData, airdropData }) {

  const [visible, setVisible] = useState(airdropData.showDetails)
  const [formStatus, setFormStatus] = useState({
    isError: false,
    message: '',
  })
  const [enable, setEnable] = useState(airdropData.isValid)
  const [address, setAddress] = useState(airdropData.tokenAddress)
  const { account } = useEthers()
  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')

  
  const handleTokenAddress = async (e) => {
    setFormStatus((prevState) => ({
      ...prevState,
      isError: false,
      message: '',
    }))

    setEnable(false)
    setVisible(false)
    setAddress(e.target.value)
    
    if (isAddress(e.target.value)) {
      openLoadingModal()
      const tokenInfo = await getTokenInfo(e.target.value)
      if (tokenInfo.success) {
        setAirdropData((prevState) => ({
          ...prevState,
          name: tokenInfo.data.name,
          tokenAddress: e.target.value,
          tokenName: tokenInfo.data.name,
          tokenSymbol: tokenInfo.data.symbol,
          tokenDecimals: tokenInfo.data.decimals,
          tokenSupply: tokenInfo.data.totalSupply,
          showDetails: true,
          isValid: true,
        }))
        setVisible(true)
        setEnable(true)
      } else {
        setFormStatus((prevState) => ({
          ...prevState,
          isError: true,
          message: 'Not Valid ERC20 Token',
        }))
      }
      closeLoadingModal()
    } else {
      setAirdropData((prevState) => ({
        ...prevState,
        showDetails: false,
        isValid: false,
      }))
    }
  }

  return (
    <div className="w-full">

      
      <HeadingTags name={'Token Address'} required />

      <input
        className="bg-transparent mt-5 w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
        type={'text'}
        placeholder="0xc197033c129839ED4740c29919Bd88fD42bbde"
        onChange={(e) => {
          handleTokenAddress(e)
        }}
      />

      <PreviewHeader heading={'Token address Details'} />
      {visible && (
        <div className="mt-5">
         <>
                  <PreviewDetails name="Name" value={airdropData.tokenName} />
                  <PreviewDetails name="Symbol" value={airdropData.tokenSymbol} />
                  <PreviewDetails name="Decimals" value={airdropData.tokenDecimals} />
                  <PreviewDetails
                    name="Total Supply"
                    value={`${formatBigToNum(airdropData.tokenSupply, airdropData.tokenDecimals)} ${airdropData.tokenSymbol}`}
                  />
                </>
        </div>

        
      )}

      {/* {(airdropData.type === "private" && address.length > 4) && (
     <div className='w-full flex flex-col lg:flex-row'>
                        <div className='mt-10 w-full'>
                            <InputField 
                                heading={"Number of Claims"}
                                value={numberofclaims}
                                changeState={setNumberofclaims}
                                placeholder={""}
                            />
                        </div>
                        <div className='mt-10 w-full flex justify-end'>
                            <InputField 
                                heading={"Size of Claims"}
                                value={sizeofclaims}
                                changeState={setSizeofclaims}
                                placeholder={""}
                            />
                        </div>
                    </div>
      )} */}

      {/*address.length > 4 && (
        <div className="mt-10">
        <div className="">
          <div className='flex items-center'>
            <HeadingTags name={'Amount to be airdropped'} required />
            <img src="/images/lists/question.svg" alt="info" className="ml-2" />
          </div>
          <div className="mt-5 flex items-center justify-between gap-5 cursor-pointer">
            <div className="flex items-center justify-between bg-[#FAF8F5] dark:bg-dark-2 px-5 py-4 rounded-md w-[75%]">
              <span className="font-bold text-dark-text dark:text-light-text">{amount.toLocaleString()}</span>

              <span className="text-gray dark:text-gray-dark font-bold">SXP</span>
            </div>

            <button
              className="bg-primary-green bg-opacity-[0.08] font-bold text-primary-green py-4 w-[25%] rounded-md"
              onClick={() => showPopup(true)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      )*/}

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive('Token Info')}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
          </button>

          <button
            className="bg-primary-green disabled:bg-dim-text disabled:dark:bg-dim-text-dark text-white font-gilroy font-bold px-8 py-3 rounded-md"
            disabled={!enable}
            onClick={() => setActive('Project Details')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
