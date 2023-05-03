import React from 'react'
import PreviewHeader from '../../Common/PreviewHeader'
import BackArrowSVG from '../../../svgs/back_arrow';
import PreviewDetails from '../../Common/PreviewDetails';
import { formatBigToNum } from '../../../utils/numberFormat'
import { useState } from 'react';
import useDeploymentFeeFair from 'hooks/useDeploymentFeeFair';
import { BigNumber, ethers, utils } from "ethers"
import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';
import { Contract } from 'ethers-multicall';
import { Public_FACTORYADRESS,ROUTER_ADDRESS,ADMIN_ADDRESS } from 'constants/Address';
import PublicAbi from '../../../constants/abi/PublicAbi.json';



export default function PreviewSale({ token, setActive, saleObject, saleType, saleData }) {
  const [deploymentFee, setDeploymentFee] = useState(0.0)
  const {account, chainId, library} = useEthers()
  const deployFee = useDeploymentFeeFair()


  useEffect(() => {
    async function getFee() {
      const fee = await deployFee
      setDeploymentFee(ethers.utils.formatEther(fee))
    }
    getFee()
  }, [deployFee])

  const handleDeploySale = async () => {
    const signer = library.getSigner(account)
    const contract = new Contract(
      Public_FACTORYADRESS,
      PublicAbi,
      signer
    )
    const routerAddress = ROUTER_ADDRESS
    const adminAddress = ADMIN_ADDRESS
    console.log(contract)
    // 2nd - with uints [minParticipation, maxParticipation, lp%, dex listing rate,lpLockPeriod, saleEnd, saleStart, hardCap(tokens), softCap(bnb)]
    try {
      const tx = await contract.deployNormalSale(
        [routerAddress, adminAddress, token.tokenAddress, account],
        [
          saleObject.minAllocation,
          saleObject.maxAllocation,
          saleObject.amountLiquidity,
          saleObject.listing,
          saleObject.lockup,
          saleObject.endDate,
          saleObject.startDate,
          saleObject.hardCap,
          saleObject.softCap
        ]

      )
      await tx.wait()
      console.log("Sale deployed")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    if (saleType === 'standard') {
      handleDeploySale()

    }
  }

  return (
    <div className=''>
      <div className='flex items-center'>
        <img src={token.icon} alt={token.name} className='w-[54px] h-[54px]' />

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
        <PreviewDetails name={"Amount to be sold"} value={"100,000,000 SXP"} />

      }

      {saleType === "standard" &&
        <PreviewDetails name={"Presale Rate"} value={saleObject.presalePrice + " " + token.symbol + " = 1 " + saleObject.currency.symbol} />
      }
      <PreviewDetails name={"Soft Cap"} value={saleObject.softCap} />
      {saleType !== "fairlaunch" &&
        <div>
          <PreviewDetails name={"Hard Cap"} value={saleObject.hardCap} />
          <PreviewDetails name={"Minimum Allocation"} value={saleObject.minAllocation + " " + saleObject.currency.symbol} />
          <PreviewDetails name={"Maximum Allocation"} value={saleObject.maxAllocation + " " + saleObject.currency.symbol} />
          <PreviewDetails name={"Amount to be sold"} value={"100,000,000 SXP"} />
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
        <PreviewDetails name={"Listing rate"} value={saleObject.listing + " " + token.symbol + " = 1 " + saleObject.currency.symbol} />
      }

      <PreviewHeader heading={"Time Details"} />

      <PreviewDetails name={"Presale Start Date"} value={saleObject.startDate} />
      <PreviewDetails name={"Presale End Date"} value={saleObject.endDate} />

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

            <PreviewDetails name={"First Release On Sale"} value={saleObject.firstRelease+"%"} />
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
