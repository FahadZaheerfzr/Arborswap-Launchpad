import React, { useState } from 'react'
import { ModalProvider } from 'react-simple-modal-provider'
import LockDetails from './LockDetails'
import Preview from './Preview'
import AmountModal from './Subcomponents/AmountModal'
const panel_items = [
  {
    id: 1,
    name: 'Lock details',
  },
  {
    id: 2,
    name: 'Preview',
  },
]

export default function Lock({ lockData, setLockData, lp_locker }) {
  const [active, setActive] = useState('Lock details')

  return (
    <div className="flex bg-light-gray-shade dark:bg-dark-background flex-col md:flex-row w-full">
      <div className="panel flex py-4 pl-5 gap-5 md:py-0 md:block md:pl-9 md:pr-[5%] rounded-l-[10px] bg-[#FAF8F5] dark:bg-dark-2">
        {panel_items.map((item) => (
          <div key={item.id} className={`panel-item md:mt-9 flex items-center`}>
            {item.name === active && <div className={`w-2 h-2 rounded-full bg-primary-green absolute`} />}
            <span
              className={`text-sm font-gilroy font-semibold ml-[18px] ${
                active === item.name ? 'text-dark-text dark:text-light-text' : 'text-dim-text dark:text-dim-text-dark'
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <div className="panel-content bg-white dark:bg-dark-1 rounded-r-[10px] pt-7 md:pt-9 px-4 md:p-9 md:w-2/3">
        {active === 'Lock details' && (
          <ModalProvider value={[AmountModal]}>
            <LockDetails setActive={setActive} lockData={lockData} setLockData={setLockData} locker={!lp_locker} />
          </ModalProvider>
        )}
        {active === 'Preview' && <Preview setActive={setActive} lockData={lockData} locker={!lp_locker} />}
      </div>
    </div>
  )
}
