//import React, { useState, useEffect } from 'react'
import LockOptions from './Subcomponents/LockOptions'

export default function Landing({airdropData, setAirdropData }) {
   // const [lock, setLock] = useState("public")
//
   // useEffect(() => {
   //     setPrivate(lock === "public" ? false : true)
   // }, [lock, setPrivate])
    return (
        <div className="bg-white dark:bg-dark-1 flex flex-col rounded-[10px] p-9">
        <span className="font-semibold text-dark-text">Choose Airdrop Type</span>

        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <LockOptions
            name={'Public'}
            airdropData={airdropData}
            setAirdropData={setAirdropData}
            selected={airdropData.type === 'public'}
          />
          <LockOptions
            name={'Private'}
            airdropData={airdropData}
            setAirdropData={setAirdropData}
            selected={airdropData.type === 'private'}
          />
        </div>

        <div className="mt-10 flex justify-end">
            <button className="bg-primary-green text-white rounded-md px-[42px] py-4 font-bold" onClick={() => 
            setAirdropData((prevState) => ({
              ...prevState,
              showLanding: false,
            }))
          }
          >
            Next
            </button>
        </div>
        </div>
    )
}
