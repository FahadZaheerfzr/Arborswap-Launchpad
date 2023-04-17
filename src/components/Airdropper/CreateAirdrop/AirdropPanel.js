import React, { useState } from 'react'
import Createsale from './Createsale'
import Detailspage from './Detailspage'
import Infopage from './Infopage'


const panel_items = [
    {
        id: 1,
        name: 'Token Info',
    },
    {
        id: 2,
        name: 'Project Details',
    },
    {
        id: 3,
        name: 'Preview',
    }
]

const token = {
    name: 'Swipe Token',
    symbol: 'SXP',
    tags: [
        {
            id: 1,
            name: 'Payment',
        },
        {
            id: 2,
            name: 'Web3',
        },
    ],
    icon: '/images/cards/rip.svg',
    decimals: 18,
    total_supply: 2000000000,
}

export default function AirdropPanel({airdropData, setAirdropData, initAirdropState}) {
    const [active, setActive] = useState('Token Info')
    const [amount, setAmount] = useState(14766538)
    const [modal, showModal] = useState(0);

    return (
        <div className="w-full flex justify-center">

            <div className="w-full px-4 md:px-0 md:w-10/12">
                <div className="flex flex-col md:flex-row w-full">
                    <div className="panel flex py-4 pl-5 gap-5 md:py-0 md:block md:pl-9 md:pr-[5%] rounded-l-[10px] bg-[#FAF8F5] dark:bg-dark-2">
                        {panel_items.map((item) => (
                            <div key={item.id} className={`panel-item md:mt-9 flex items-center`}>
                                {item.name === active && <div className={`w-2 h-2 rounded-full bg-primary-green absolute`} />}
                                <span
                                    className={`text-xs md:text-sm font-gilroy font-semibold ml-[18px] ${active === item.name
                                        ? 'text-dark-text dark:text-light-text'
                                        : 'text-dim-text dark:text-dim-text-dark'
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="panel-content bg-white dark:bg-dark-1 rounded-r-[10px] pt-7 md:pt-9 px-4 md:p-9 md:w-2/3">
                        {active === 'Token Info' && (
                            <Infopage setActive={setActive} airdropData={airdropData} setAirdropData={setAirdropData} initAirdropState={initAirdropState}/>
                        )}
                        {active === 'Project Details' && <Detailspage airdropData={airdropData} setAirdropData={setAirdropData} setActive={setActive} />}
                        {active === 'Preview' && (
                            <Createsale setActive={setActive} setAirdropData={setAirdropData} airdropData={airdropData} token={token} amount={amount}/>
                        )}
                        {/* {active === 'Admin Panel' && (
                            <AdminPanelCreation showModal={showModal} />
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    )
}
