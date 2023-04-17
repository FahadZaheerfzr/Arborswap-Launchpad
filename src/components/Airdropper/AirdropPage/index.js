import React, { useState, useEffect } from 'react'
import Preview from './Preview'
import UserPanel from './UserPanel'
import AdminPanel from "./Admin"
import { formatUnits } from 'ethers/lib/utils'
import useAirdropInfo from 'hooks/useAirdropInfo'
import { useParams } from 'react-router-dom'




export default function AirdropPageBase({ tokenInfo ,status , airdrop, showModal, admin }) {
  const [upcoming] = useState(true)
  const [whitelisted] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalDistributed, setTotalDistributed] = useState(0)
  const [time, setTime] = useState();
  const [remaining, setRemaining] = useState(0)
  const [filledPerc, setFilledPerc] = useState(0)
  const { id } = useParams()
  const airdropInfo = useAirdropInfo(id)


  function handleSetRemaining(allocation){
    let filledPercNum = ((remaining - allocation)/totalAmount)*100
    setRemaining(remaining - allocation);
    setFilledPerc(filledPercNum)
  }
 
  useEffect(() => {
   
    if (typeof airdropInfo == "undefined") {
      return
    }
   
    let totalAmountNumber = Number(formatUnits(airdropInfo.totalAmountToAirdrop, 18));
    let totalDistributedNumber = Number(formatUnits(airdropInfo.totalAmountDistributed, 18));
    let remainingNum = totalAmountNumber - totalDistributedNumber;
    let filledPercNum = (remainingNum/totalAmountNumber)*100
    setTotalAmount(totalAmountNumber)
    setTotalDistributed(totalDistributedNumber)
    setRemaining(remainingNum)
    setFilledPerc(filledPercNum)



    
  }, [airdropInfo])


  useEffect(() => {
   
    if (typeof airdropInfo == "undefined") {
      return
    }
   
    var date;
    var formattedTime;
  
    
    if(airdropInfo.startTime.toNumber() === 0){
        date = '';
        formattedTime = 'Not started yet';
    }else{
      date = new Date(airdrop.info.startTime.toNumber() * 1000);
     
      const year = date.getFullYear(); // get year (e.g. 2021)
      let month = date.getMonth() + 1; // get month (note: month is zero-indexed in JavaScript, so add 1 to get the correct month)
      let day = date.getDate(); // get day of the month (e.g. 6)
      let hours = date.getHours(); // get hours (e.g. 12)
      let minutes = date.getMinutes(); // get minutes (e.g. 30)

      if (minutes < 10) {
        minutes = "0" + minutes; // prepend a '0' character if minutes is less than 10
      }

      if (hours < 10) {
        hours = "0" + hours; // prepend a '0' character if hours is less than 10
      }

      if (day < 10) {
        day = "0" + day; // prepend a '0' character if hours is less than 10
      }

      if (month < 10) {
        month = "0" + month; // prepend a '0' character if hours is less than 10
      }



      formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ' ' + 'UTC'
      setTime(formattedTime)
    }


    
  }, [airdropInfo])
  

  

  return (
    airdrop && (
      <div className="w-full flex justify-center">
        <div className="w-full px-4 md:px-0 md:flex md:w-10/12 md:gap-7">
          <div className="w-full md:w-[65%] bg-white dark:bg-dark-1 rounded-[10px]">
            <Preview
              name={airdrop.info.description[7]}
              icon={airdrop.info.description[0]}
              is_private={airdrop.info.isPrivate}
              airdrop={airdrop}
              tags={['Web3', 'nn']}
              description={airdrop.info.description[1]}
              address={airdrop.address}
              tokenAddress={airdrop.info.token}
              starts_on={time}
              ends_on={airdrop.info.startTime.toNumber()}
              admin={admin}
            />
          </div>

          <div className="mt-14 md:mt-0 md:w-[35%] ">
        
            {
              admin ? <AdminPanel symbol={tokenInfo.symbol} airdrop={airdrop} whitelist_address={airdrop.info.numberWLAddresses.toNumber()} participants={airdrop.info.numberOfParticipants.toNumber()} amount={totalAmount} allocated={1} showModal={showModal} upcoming={upcoming} Private={airdrop.info.isPrivate} started = {airdrop.started}/> : 
              <UserPanel symbol={tokenInfo.symbol} handleSetRemaining={handleSetRemaining} amount={totalAmount} icon={airdrop.info.description[0]}
              min_allocation={airdrop.info[0].toNumber()} status={status}
              filled_percent={filledPerc} ends_on={airdrop.info[0].toNumber()}  
              whitelisted={whitelisted} whitelist_address={airdrop.info.numberWLAddresses.toNumber()} is_private={airdrop.info.isPrivate} remaining={remaining}/>
            }
          </div>
        </div>
      </div>
    )
  )
}
