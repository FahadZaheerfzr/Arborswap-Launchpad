import React from 'react'
import ModalField from './ModalField'

export default function Modal({ showModal, from_symbol, from_icon, to_icon, to_symbol }) {

  const handleSubmit = () => {
    showModal(false)
  }

  return (
    <div className={`w-screen h-screen flex backdrop-blur-[7px] flex-col justify-center items-center bg-[#F2F3F5] dark:bg-dark dark:bg-opacity-40 bg-opacity-40`}>
      <div className="w-[90%] max-w-[420px] rounded-[10px] px-9 py-7 bg-white dark:bg-dark-1">
        <div className="flex justify-between items-center  ">
          <span className="text-dark-text dark:text-light-text font-gilroy font-semibold text-lg">Join Pool</span>

          <div className="flex items-center cursor-pointer" onClick={() => showModal(false)}>
            <span className="text-sm font-gilroy font-semibold text-dark-text dark:text-light-text mr-2">Close</span>
            <div className="flex justify-center items-center bg-[#E56060] text-[#E56060] bg-opacity-10 rounded-full w-[15px] h-[15px]">
              &#10005;
            </div>
          </div>
        </div>
        <div className='mt-[30px]'>
          <ModalField text={"From"} icon={from_icon} currency={from_symbol} />
        </div>

        <div className='mt-7'>
          <div className='flex justify-between items-center'>
            <span className='font-semibold text-sm text-gray dark:text-gray-dark'>
              Amount
            </span>

            <span className='font-medium text-sm text-dim-text dark:text-dim-text-dark'>
              Balance:
              <span className='text-dark-text dark:text-light-text'>
                140,114
              </span>
            </span>
          </div>
        </div>
        <div className='mt-[10px] flex justify-between items-center rounded-md bg-[#F5F1EB] dark:bg-dark-3 px-5 py-5'>
          <div className='flex flex-col'>
            <span className='font-bold text-xl text-dark-text dark:text-light-text'>
              138,417
            </span>
            <span className='mt-3 text-sm font-medium text-gray dark:text-gray-dark'>
              ~ $108,070
            </span>
          </div>

          <div className='border-l border-dashed pl-5 border-dim-text dark:border-dim-text-dark '>
            <div className="rounded-sm bg-[#C29D46] bg-opacity-[0.08] py-[2px] px-4 text-[#C89211] text-sm">
              Half
            </div>

            <div className="mt-3 rounded-sm bg-primary-green bg-opacity-[0.08] py-[2px] px-4 text-primary-green text-sm">
              Max
            </div>
          </div>
        </div>

        <div className='flex justify-center my-7'>
          <img src="/images/arrows/arrow_down_green.svg" alt="arrow down" />
        </div>

        <div className='mt-4'>
          <ModalField text={"You'll get"} icon={to_icon} currency={to_symbol} />
        </div>

        <div className='mt-7'>
            <span className='font-semibold text-sm text-gray dark:text-gray-dark'>
              Amount
            </span>
            </div>

        <div className='mt-[10px]  rounded-md bg-[#F5F1EB] dark:bg-dark-3 px-5 py-5'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-xl text-dark-text dark:text-light-text'>
              18,070
            </span>
            <span className='text-sm font-medium text-gray dark:text-gray-dark'>
              ~ $---
            </span>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[420px]  mt-10">
        <button
          className="w-full bg-primary-green text-white py-5 rounded-md font-gilroy font-bold text-xl"
          onClick={handleSubmit}
        >
          Buy
        </button>
      </div>
    </div>
  )
}
