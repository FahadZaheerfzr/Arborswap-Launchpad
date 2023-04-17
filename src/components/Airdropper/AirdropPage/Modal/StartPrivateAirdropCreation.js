import React, {useState, useMemo, useEffect} from 'react'
import CalendarField from '../../../Launchpad/CreateSale/Subcomponents/CalendarField'
import PrivateAirdropAbi from 'config/abi/PrivateAirdropAbi.json';
import ERCAbi from 'config/abi/ERC20.json';
import { useEthers, useTokenAllowance, useTokenBalance} from '@usedapp/core';
import { Contract } from '@ethersproject/contracts'

import { useModal } from 'react-simple-modal-provider'

import { ethers } from 'ethers'
import {getAirdropInfos} from 'utils/getAirdropList'
import { useNavigate } from 'react-router-dom'



export default function StartPrivateAirdropCreation({ decimals, airdropAddress, tokenAddress, showModal, modal }) {
  const [date, setDate] = useState()
  const [error, setError] = useState('')
  const [active, setActive] = useState(false)
  const [totalAmountToAirdrop, setTotalAmountToAirdrop] = useState()
  const { account, library } = useEthers();
  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate()

  const handleOnChangeCheckBox = () => {
    setIsChecked(!isChecked);
  };


  useEffect(() => {
   
    if(!active){
      async function fetchData() {
        try{
          const info = await getAirdropInfos([airdropAddress]);
          setTotalAmountToAirdrop(info.data[0].info.totalAmountToAirdrop)
          setActive(true)
        }catch(error){
          setActive(false)
        }
      }
      fetchData();
    }
  });

  const allowance = useTokenAllowance(tokenAddress, account, airdropAddress, {
    refresh: 5,
  })

  const balance = useTokenBalance(tokenAddress, account, {
    refresh: 5,
  })

  const needApprove = useMemo(() => {
    if(active){
       if (typeof allowance === 'undefined') {
           return true
         }
         return totalAmountToAirdrop.gt(allowance) 
    }
   
    
  }, [totalAmountToAirdrop, allowance])

  const isValid = useMemo(() => {
    if(active){
       if (typeof balance === 'undefined') {
           return true
         }
       
         return !needApprove && balance.gt(totalAmountToAirdrop)  
    }

  }, [totalAmountToAirdrop, needApprove, balance])




  const handleApprove = async () => {
   try {
      openLoadingModal()
      const contractERC20 = new Contract(tokenAddress, ERCAbi, library.getSigner())
      const approval = await contractERC20.approve(airdropAddress, ethers.constants.MaxUint256)
      await approval.wait()
      closeLoadingModal()
      setError(undefined);
    } catch (error) {
      setError(error.reason);
      closeLoadingModal()
    }
  }

  const handleStartAirdrop = async() => {
    if(isChecked){
        setDate(Math.floor(Date.now() / 1000) + 60)
    }  

    debugger
    if(date !== undefined){
      try {
        openLoadingModal()
        const airdrop = new Contract(airdropAddress, PrivateAirdropAbi, library.getSigner())
        const startAirdrop = await airdrop.start(date)
        await startAirdrop.wait()
        navigate(`/airdropper/airdrops/${airdropAddress}`)
        closeLoadingModal()
        showModal(0)
        return
      } catch (error) {
        setError(error.reason);
        closeLoadingModal()
        return false
      }
    }else{
      setError('Set The Start Date');
      return false
    }
  }


  return (
    <div className={`w-screen h-screen flex backdrop-blur-[7px] flex-col justify-center items-center bg-[#F2F3F5] dark:bg-dark dark:bg-opacity-40 bg-opacity-40`}>
      <div className="w-[90%] max-w-[420px] rounded-[10px] px-9 py-7 bg-white dark:bg-dark-1">
        <div className="flex justify-between items-center  ">
          <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">Set Time</span>
          <div className="flex items-center cursor-pointer" onClick={() => showModal(0)}>
            <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">Close</span>
            <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
              &#10005;
            </div>
          </div>
        </div>

        <div className='mt-10'>
            {!isChecked && <div className="w-full">
                <CalendarField heading={"Starts On (UTC)"} setFunction={setDate}  />
            </div>}

            <div className="flex items-center mt-10">
                <input id="checkbox" type="checkbox" value="" checked={isChecked}
                   onChange={handleOnChangeCheckBox} 
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox" className="ml-3 text-sm font-medium text-[#807373] dark:text-gray-500">Start Now Instead</label>
            </div>

        </div>
      {active && needApprove &&  <div className="w-full max-w-[420px]  mt-10">
        <button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleApprove}
        >
          Approve
        </button>
      </div>
      }

      {active && !needApprove  &&
        <div className="w-full max-w-[420px]  mt-10">
        <button
          
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleStartAirdrop}
        >
          Confirm
        </button>
      </div>
      }

      {error && (
        <p className="mt-4 text-red-500 text-center">{error}</p>
      )}




      {/* <div className="w-full max-w-[420px]  mt-10">
        <button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          //onClick={handleStartAirdrop}
        >
          Confirm
        </button>
      </div> */}
    </div>
    </div>
  )
}