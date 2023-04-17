import React from 'react'
import LockOptions from './Subcomponents/LockOptions'
import Note from './Subcomponents/Note'

export default function Landing({ lockData, setLockData }) {
  return (
    <div className="bg-white dark:bg-dark-1 flex flex-col rounded-[10px] p-9">
      <span className="font-semibold text-dark-text">Choose Token Lock Type</span>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <LockOptions
          name={'Standard'}
          lockData={lockData}
          setLockData={setLockData}
          selected={lockData.type === 'standard'}
        />
        <LockOptions
          name={'Reward'}
          lockData={lockData}
          setLockData={setLockData}
          selected={lockData.type === 'reward'}
        />
      </div>

      <div className="mt-10 bg-[#FAF8F5] dark:bg-dark-2 rounded-md p-5 text-sm font-semibold text-gray dark:text-gray-dark">
        <Note standard={lockData.type === 'standard'} />
      </div>

      <div className="mt-10 flex justify-end">
        <button
          className="bg-primary-green hover:opacity-40 text-white rounded-md px-[42px] py-4 font-bold"
          onClick={() =>
            setLockData((prevState) => ({
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
