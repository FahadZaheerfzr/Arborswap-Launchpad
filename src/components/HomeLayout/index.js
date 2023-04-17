import React, { useState } from 'react'
import SearchSVG from '../../svgs/search'
import Carousel from './Slider/Slider'
import ItemSwitch from './Switches/ItemSwitch'
import Tab from './Switches/Tab'
import ViewSwitch from './Switches/ViewSwitch'

export default function HomeLayout({
  children,
  cardFormat,
  setCardFormat,
  itemSelected,
  setItemSelected,
  tabs,
  activeTab,
  setActiveTab,
  airdrop
}) {
  //   const [sortFilter, setSortFilter] = useState('')
  const [on, setOn] = useState(true)

  const handleToggle = () => {
    setOn(!on)
  }

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-full px-6 md:px-0 md:w-10/12">
        <div className="md:hidden">
          <Carousel mobileView />
        </div>
        <div className="hidden md:block">
          <Carousel />
        </div>

        <div className="w-full flex mt-5 md:mt-0 flex-col md:flex-row gap-y-3 md:h-11 justify-between">
          {tabs && (
            <div className="flex justify-around md:justify-start items-center p-1 bg-[#F5F1EB] dark:bg-dark-3">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  tabName={tab.tabName}
                  active={tab.id === activeTab}
                  setActiveTab={setActiveTab}
                  id={tab.id}
                />
              ))}
            </div>
          )}

          {!tabs && <ViewSwitch cardFormat={cardFormat} setCardFormat={setCardFormat} />}
          {!tabs && <ItemSwitch itemSelected={itemSelected} setItemSelected={setItemSelected} />}
          <div className="px-5 py-3 rounded-md bg-white dark:bg-dark-1 flex justify-center items-center">
            <span className="text-gray dark:text-gray-dark font-gilroy font-semibold text-sm">
              {airdrop? 'Whitelisted': 'My Locks'}
              
            </span>

            <label htmlFor="lock-toggle" className="inline-flex relative items-center cursor-pointer ml-[10px]">
              <input
                type="checkbox"
                value=""
                checked={on ? false : true}
                id="lock-toggle"
                className="sr-only peer"
                onChange={handleToggle}
              />
              <div className="w-7 h-4 bg-dim-text  bg-opacity-20  peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[0.8px] after:bg-dim-text after:dark:bg-dim-text-dark  after:rounded-full after:h-[13.5px] after:w-[13.5px] after:transition-all border-[#F5F1EB] " />
            </label>
          </div>
          <div className="hidden md:block relative z-10">
            {/* <Button
                            buttonText={'Sort By'}
                            dropDownItems={['Floor Price', 'Items', 'Name (A-Z)', 'Name (Z-A)']}
                            filter={sortFilter}
                            setFilter={setSortFilter}
                        /> */}
          </div>
          <div className="hidden md:flex items-center justify-between border-2 border-white dark:border-dark-1 bg-[#F5F1EB] dark:bg-dark-3 rounded-md px-5 py-3">
            <input
              className="bg-transparent placeholder:text-dim-text dark:placeholder:text-dim-text-dark focus:outline-none w-60"
              placeholder={airdrop? "Search Airdrops" :"Search token or liquidity pair"}
            />

            <SearchSVG className="fill-dark-text dark:fill-light-text" />
          </div>
        </div>

        <div className="flex justify-between md:hidden mt-5 h-11 relative z-10">
          {/* <Button
            buttonText={'Sort By'}
            dropDownItems={['Floor Price', 'Items', 'Name (A-Z)', 'Name (Z-A)']}
            filter={sortFilter}
            setFilter={setSortFilter}
          /> */}

          <div className="flex  w-full items-center justify-between border-2 border-white dark:border-dark-1 bg-[#F5F1EB] dark:bg-dark-3 rounded-md py-3">
            <input
              className="pl-2 bg-transparent placeholder:text-dim-text dark:placeholder:text-dim-text-dark focus:outline-none"
              placeholder="Search token or liquidity pair"
            />

            <SearchSVG className="relative -left-3 fill-dark-text dark:fill-light-text" />
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
