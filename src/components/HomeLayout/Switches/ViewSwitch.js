import React from 'react'
import GridIconSVG from '../../../svgs/ViewSwitch/grid_icon'
import ListIconSVG from '../../../svgs/ViewSwitch/list_icon'

export default function ViewSwitch({ cardFormat, setCardFormat }) {
  return (
    <div className="hidden md:flex bg-[#F5F1EB] dark:bg-dark-1">
      <div
        className={`absolute bg-white dark:bg-dark-1 w-11 h-11  rounded-md flex justify-center items-center ease-in-out duration-300 ${
          cardFormat === 'grid' ? 'translate-x-[44px]' : ''
        }`}
      >
        {cardFormat === 'list' ? (
          <ListIconSVG className={`fill-dark-text dark:fill-light`} />
        ) : (
          <GridIconSVG className={`fill-dark-text dark:fill-light`} />
        )}
      </div>
      <div
        className={`w-11  rounded-md flex justify-center items-center cursor-pointer `}
        onClick={() => setCardFormat('list')}
      >
        <ListIconSVG className={`fill-dim-text dark:fill-dim-text-dark`} />
      </div>
      <div
        className={`w-11 rounded-md flex justify-center items-center cursor-pointer `}
        onClick={() => setCardFormat('grid')}
      >
        <GridIconSVG className={`fill-dim-text dark:fill-dim-text-dark`} />
      </div>
    </div>
  )
}
