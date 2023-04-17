import React from 'react'

export default function ItemSwitch({ itemSelected, setItemSelected }) {
  return (
    <div className="flex bg-[#F5F1EB] dark:bg-dark-3 p-1 font-gilroy text-dim-text dark:text-dim-text-dark font-semibold text-sm">
      <div
        className={`absolute px-5 py-2 bg-white dark:bg-dark-1 h-9  rounded-md flex justify-center items-center ease-in-out duration-300 ${
          itemSelected === 'liquidity' ? 'translate-x-[80px]' : ''
        }`}
      >
        <span className="text-dark-text dark:text-light-text">{itemSelected === 'token' ? 'Token' : 'Liquidity'}</span>
      </div>
      <div
        className={` rounded-md  px-5 py-2 flex justify-center items-center cursor-pointer `}
        onClick={() => setItemSelected('token')}
      >
        Token
      </div>
      <div
        className={` rounded-md  px-5 py-2 flex justify-center items-center cursor-pointer `}
        onClick={() => setItemSelected('liquidity')}
      >
        Liquidity
      </div>
    </div>
  )
}
