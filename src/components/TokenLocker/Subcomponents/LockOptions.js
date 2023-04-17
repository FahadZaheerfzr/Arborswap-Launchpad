import React from 'react'

export default function LockOptions({ lockData, setLockData, selected, name }) {
  return (
    <div
      className={`w-full rounded-[10px] px-5 py-5 ${
        selected ? ' border-[1.5px] border-[#C89211] ' : 'border-dim-text border-[1.5px] border-opacity-50'
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="flex flex-col ml-4">
            <div className="flex items-center gap-2">
              <span className={`font-gilroy font-bold text-dark-text dark:text-light-text`}>{name}</span>
            </div>
          </div>
        </div>
        <div
          className={`border-[1.5px] ${
            selected ? 'border-[#C89211]' : 'border-dim-text'
          } h-6 w-6 rounded-full flex justify-center items-center  border-opacity-50`}
          onClick={() =>
            setLockData((prevState) => ({
              ...prevState,
              type: name.toLowerCase(),
            }))
          }
        >
          {selected && <div className="h-3 w-3 rounded-full bg-[#C89211]"></div>}
        </div>
      </div>
    </div>
  )
}
