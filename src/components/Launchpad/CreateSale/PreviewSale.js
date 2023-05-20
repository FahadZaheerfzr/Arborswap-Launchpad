import React from 'react'
import PreviewHeader from '../../Common/PreviewHeader'
import BackArrowSVG from '../../../svgs/back_arrow';
import PreviewDetails from '../../Common/PreviewDetails';
import { formatBigToNum } from '../../../utils/numberFormat'
import { useState } from 'react';
import useDeploymentFeePublic from 'hooks/useDeploymentFeePublic';
import { ethers } from "ethers"
import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import { useModal } from "react-simple-modal-provider";
import { deployPrivateSale, deployPublicSale, deployFairLaunchSale, deployPublicSaleERC, deployFairLaunchSaleERC20, deployPrivateErSale } from 'utils/deploySale';
import axios from 'axios';
import { BACKEND_URL } from 'config/constants/LaunchpadAddress'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCalcMax from 'utils/calcMax';


export default function PreviewSale({ token, setActive, saleObject, saleType, saleData }) {
  const [deploymentFee, setDeploymentFee] = useState(0.0)
  const { account, library } = useEthers()
  const deployFee = useDeploymentFeePublic()
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  //calc max takes, hardcap, tokenPrice, listingPrice, tokenDecimals
  const max = useCalcMax(saleObject.hardCap, saleObject.presalePrice, saleObject.listing, token.tokenDecimals)
  // console.log("max", max?.[0])

  // console.log(saleObject, "saleObject")

  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");

  useEffect(() => {

  }, [startTime])

  console.log(saleObject.unsoldToken, "saleObject.unsoldTokens")
  useEffect(() => {
    async function getFee() {
      const fee = deployFee;
      setDeploymentFee(ethers.utils.formatEther(fee))
    }

    setStartTime(new Date(saleObject.startDate * 1000))
    setEndTime(new Date(saleObject.endDate * 1000))
    getFee()
  }, [deployFee])


  const handleSubmit = async () => {
    openLoadingModal()
    
    if (saleType === 'standard') {
      let finalSaleObject;
      if (saleObject.currency.name === 'Binance') {
        finalSaleObject = await deployPublicSale(token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal);
      }
      else {
        finalSaleObject = await deployPublicSaleERC(token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal);
      }
      
      await axios.post(`${BACKEND_URL}/api/sale`, {
        sale: finalSaleObject,
      }, {
        withCredentials: true,
      });
    }
    else if (saleType === 'private') {
      let finalSaleObject;
      if (saleObject.currency.name === 'Binance') {
        finalSaleObject = await deployPrivateSale(token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal);
      }
      else {
        finalSaleObject = await deployPrivateErSale(token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal);
      }


      await axios.post(`${BACKEND_URL}/api/sale`, {
        sale: finalSaleObject,
      }, {
        withCredentials: true,
      });

    }
    else if (saleType === 'fairlaunch') {
      let finalSaleObject;
      if (saleObject.currency.name === 'Binance') {
        finalSaleObject = await deployFairLaunchSale(token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal);
      }
      else {
        finalSaleObject = await deployFairLaunchSaleERC20(token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal);
      }
      await axios.post(`${BACKEND_URL}/api/sale`, {
        sale: finalSaleObject,
      }, {
        withCredentials: true,
      });
    }
    closeLoadingModal()
    //redirect to home page
    window.location.href = '/'
  }

  return (
    <div className=''>
      <div className='flex items-center'>
        <img src={token.image} alt={token.name} className='w-[54px] h-[54px]' />

        <div className=' ml-4'>
          <div className='flex items-center'>
            <h3 className=' font-bold dark:text-light-text'>{token.name}</h3>
          </div>

          <div className='flex items-center mt-2'>
            {/* {token.tags?.map((tag) => (
              <div key={tag.id} className='bg-[#F5F1EB] dark:bg-dark-3 mr-[6px] py-[2px] px-[10px] rounded text-xs text-gray dark:text-gray-dark font-medium'>
                {tag.name}
              </div>
            ))} */}
          </div>
        </div>
      </div>

      <PreviewHeader heading={"Token address Details"} />

      <PreviewDetails name="Name" value={saleData.tokenName} />
      <PreviewDetails name="Symbol" value={saleData.tokenSymbol} />
      <PreviewDetails name="Decimals" value={saleData.tokenDecimals} />
      <PreviewDetails
        name="Total Supply"
        value={`${formatBigToNum(saleData.tokenSupply, saleData.tokenDecimals)} ${saleData.tokenSymbol}`}
      />

      <PreviewHeader heading={"Presale Details"} />

      {saleType === "fairlaunch" &&
        <PreviewDetails name={"Amount to be sold"} value={"100,000,000"} tokenSymbol={token.tokenSymbol} />
      }

      {saleType === "standard" &&
        <PreviewDetails name={"Presale Rate"} value={saleObject.presalePrice + " " + token.tokenSymbol + " = 1 " + saleObject.currency.symbol} />
      }
      <PreviewDetails name={"Soft Cap"} value={saleObject.softCap} />
      {saleType !== "fairlaunch" &&
        <div>
          <PreviewDetails name={"Hard Cap"} value={saleObject.hardCap} />
          <PreviewDetails name={"Minimum Allocation"} value={saleObject.minAllocation + " " + saleObject.currency.symbol} />
          <PreviewDetails name={"Maximum Allocation"} value={saleObject.maxAllocation + " " + saleObject.currency.symbol} />
          <PreviewDetails name={"Amount to be sold"} value={max?formatBigToNum(max[0]):""} tokenSymbol={token.tokenSymbol} />
        </div>
      }
      {saleType === "fairlaunch" &&
        <PreviewDetails name={"Sale Type"} value={"Fairlaunch"} />
      }
      {saleType === "standard" &&
        <PreviewDetails name={"Sale Type"} value={saleObject.whiteisting ? "Whitelist Enabled" : "Whitelist Disabled"} />
      }
      {saleType === "private" &&
        <PreviewDetails name={"Sale Type"} value={saleObject.whiteisting ? "Private Sale, Whitelist Enabled" : "Private Sale, Whitelist Disabled"} />
      }

      {saleType !== "private" &&
        <div>
          <PreviewHeader heading={"Listing Details"} />

          <PreviewDetails name={"To be listed on"} value={saleObject.dex.name} icon={saleObject.dex.icon} />
          <PreviewDetails name={"Amount to be used for liquidity"} value={saleObject.amountLiquidity + "%"} />
        </div>
      }
      {saleType === "standard" &&
        <PreviewDetails name={"Listing rate"} value={saleObject.listing + " " + token.tokenSymbol + " = 1 " + saleObject.currency.symbol} />
      }

      <PreviewHeader heading={"Time Details"} />
      {startTime &&
        <PreviewDetails name={"Presale Start Date"} value={startTime.toUTCString()} />
      }

      {endTime &&
        <PreviewDetails name={"Presale End Date"} value={endTime.toUTCString()} />
      }
      {saleType !== "private" &&
        <div>
          <PreviewHeader heading={"More Details"} />

          <PreviewDetails name={"Unsold Tokens"} value={saleObject.unsoldToken} />
          <PreviewDetails name={"Liquidity Lockup"} value={saleObject.lockup + " Days"} />
        </div>
      }

      {saleType === "private" &&
        <div>
          <PreviewHeader heading={"Token Vesting Details"} />

          <PreviewDetails name={"First Release On Sale"} value={saleObject.firstRelease + "%"} />
          <PreviewDetails name={"Vesting Period each Cycle"} value={saleObject.vestingPeriod + " Days"} />
          <PreviewDetails name={"Vesting Release each Cycles"} value={saleObject.vestingRelease + "%"} />
        </div>
      }
      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">

          <button className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive('Project Details')}>
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
          </button>


          <button
            className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
            // disabled={address.length < 5}
            onClick={handleSubmit}>
            Create Sale
          </button>
        </div>
      </div>
    </div>
  )
}
