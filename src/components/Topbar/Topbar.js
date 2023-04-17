import React, { useState } from 'react'
import ConnectButton from './ConnectButton'

export default function Topbar({
  setSideBarMobile,
  sideBarMobile,
  title,
  title_img,
  subpage,
  page_name,
  page_description,
  admin,
  setAdminMode,
}) {
  const [tempfixed, setTempFixed] = useState(false)

  

  const handleTempFixed = () => {
    setTempFixed(!tempfixed)
    setAdminMode(!tempfixed)
  }

  return (
    <div className="h-[110px] flex items-center justify-between pl-[4%] pr-[5%] ">
      <div className="flex items-center">
        <div
          className="flex md:hidden flex-col h-10 w-10 bg-[#F5F6F7] dark:bg-dark-1 hamburger justify-center items-center"
          onClick={() => setSideBarMobile(!sideBarMobile)}
        >
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'
              } h-0 w-5 border mb-1 border-dark-text dark:border-light-text`}
          />
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'
              } h-0 w-5 border mb-1 border-dark-text dark:border-light-text`}
          />
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'} h-0 w-5 border border-dark-text dark:border-light-text`}
          />
          <span className={`${sideBarMobile ? 'block' : 'hidden'} dark:text-light-text`}>&#x2715;</span>
        </div>
        {subpage ? (
          <div className="flex items-center">
            <span className="font-medium text-dim-text text-xl capitalize">{page_name}</span>

            <div className="w-3 h-3 mx-2 -rotate-45 border-b-2 border-r-2 border-dark-text dark:border-light-text rounded" />

            <span className="font-gilroy font-medium text-dark-text text-xl">{title}</span>
          </div>
        ) : (
          <div className="flex flex-col justify-center ml-4 md:ml-0">
            <div className="flex items-center">
              {title_img}
              <span className="hidden md:inline-block font-gilroy font-bold text-gray dark:text-gray-dark text-3xl">
                {title}
              </span>

              <img className="mx-2" src="/images/topbar/separator.svg" alt="separator" />

              <span className="font-gilroy font-medium text-primary-green md:text-2xl">{page_name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-gilroy font-medium text-dark dark:text-light text-xs md:text-base">
                {page_description || 'Lock your assets for proof of lock.'}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className='flex items-center'>
        {/* {
          admin ? (
          <div className="hidden md:flex mr-7 py-4 px-5 rounded-md bg-white dark:bg-dark-1">
            <span className="font-gilroy mr-[10px] font-medium text-dark-text dark:text-light-text text-base">
              Admin Mode
            </span>
            <label htmlFor="admin-toggle" className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={true}
                id="admin-toggle"
                className="sr-only peer"
                onChange={handleTempFixed}
                disabled={true}
              />
              <div className="w-9 h-5 bg-dim-text dark:bg-dim-text-dark dark:bg-opacity-20 bg-opacity-20 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px]  after:left-[2px] after:bg-dim-text after:dark:bg-dim-text-dark  after:rounded-full after:h-4 after:w-4 after:transition-all border-[#F5F1EB] peer-checked:after:bg-primary-green dark:peer-checked:after:bg-[#1B8552]" />
            </label>
          </div>) : (
            <div className="hidden md:flex mr-7 py-4 px-5 rounded-md bg-white dark:bg-dark-1">
            <span className="font-gilroy mr-[10px] font-medium text-dark-text dark:text-light-text text-base">
              Admin Mode
            </span>
            <label htmlFor="admin-toggle" className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={false}
                id="admin-toggle"
                className="sr-only peer"
                onChange={handleTempFixed}
                disabled={true}
              />
              <div className="w-9 h-5 bg-dim-text dark:bg-dim-text-dark dark:bg-opacity-20 bg-opacity-20 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px]  after:left-[2px] after:bg-dim-text after:dark:bg-dim-text-dark  after:rounded-full after:h-4 after:w-4 after:transition-all border-[#F5F1EB] peer-checked:after:bg-primary-green dark:peer-checked:after:bg-[#1B8552]" />
            </label>
          </div>
          )
        } */}
        <ConnectButton />
      </div>
    </div>
  )
}
