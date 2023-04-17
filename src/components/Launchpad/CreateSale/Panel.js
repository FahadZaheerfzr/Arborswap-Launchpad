import React, { useState } from 'react'
import Presale from './Presale';
import ProjectDetails from './ProjectDetails';
import TokenInfo from './TokenInfo'
import PreviewSale from './PreviewSale';
import LockOptions from 'components/Airdropper/CreateAirdrop/Subcomponents/LockOptions';

const panel_items = [
  {
    id: 1,
    name: 'Token Info',
  },
  {
    id: 2,
    name: 'Presale',
  },
  {
    id: 3,
    name: 'Project Details',
  },
  {
    id: 4,
    name: 'Preview',
  }
]

const token = {
  name: "Swipe Token",
  symbol: "SXP",
  tags: [
    {
      id: 1,
      name: "Payment",
    },
    {
      id: 2,
      name: "Web3",
    },
  ],
  icon: "/images/cards/rip.svg",
  decimals: 18,
  total_supply: 2000000000,
}


export default function Panel() {
  const [active, setActive] = useState('Token Info');
  const [selectedSale, setSelectedSale] = useState('standard')
  const [saleType, setSaleType] = useState(null);
  const [saleObject, setSaleObject] = useState(null);

  return (
    <div className="w-full flex justify-center">
      {!saleType &&

        <div className="w-full md:w-[600px]">
          <div className="bg-white dark:bg-dark-1 flex flex-col rounded-[10px] p-9">
            <span className="font-semibold text-dark-text">Choose Presale Type</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <LockOptions name={'Standard'} lock={selectedSale} setLock={setSelectedSale} selected={selectedSale === 'standard'} />
              <LockOptions name={'Fairlaunch'} lock={selectedSale} setLock={setSelectedSale} selected={selectedSale === 'fairlaunch'} />
              <LockOptions name={'Private'} lock={selectedSale} setLock={setSelectedSale} selected={selectedSale === 'private'} />
            </div>

            <div className="mt-10 flex justify-end">
              <button className="bg-primary-green hover:opacity-40 text-white rounded-md px-[42px] py-4 font-bold"
                onClick={() => setSaleType(selectedSale)}>
                Next
              </button>
            </div>
          </div>
        </div>
      }
      {saleType &&
        <div className="w-full px-4 md:px-0 md:w-10/12">
          <div className="flex flex-col md:flex-row w-full">
            <div className="panel flex py-4 pl-5 gap-5 md:py-0 md:block md:pl-9 md:pr-[5%] rounded-l-[10px] bg-[#FAF8F5] dark:bg-dark-2">
              {panel_items.map((item) => (
                <div key={item.id} className={`panel-item md:mt-9 flex items-center`}>
                  {item.name === active && <div className={`w-2 h-2 rounded-full bg-primary-green absolute`} />}
                  <span
                    className={`text-xs md:text-sm font-gilroy font-semibold ml-[18px] ${active === item.name ? 'text-dark-text dark:text-light-text' : 'text-dim-text dark:text-dim-text-dark'
                      }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="panel-content bg-white dark:bg-dark-1 rounded-r-[10px] pt-7 md:pt-9 px-4 md:p-9 md:w-2/3">
              {
                active === 'Token Info' && (
                  <TokenInfo setActive={setActive} saleType={saleType} setSaleType={setSaleType} />
                )
              }
              {
                active === 'Presale' && (
                  <Presale setActive={setActive} saleType={saleType} setSaleObject={setSaleObject} token={token} />
                )
              }
              {
                active === 'Project Details' && (
                  <ProjectDetails setActive={setActive} />
                )
              }
              {
                active === 'Preview' && (
                  <PreviewSale setActive={setActive} saleObject={saleObject} saleType={saleType} token={token} />
                )
              }
            </div>
          </div>
        </div>
      }
    </div>

  )
}
