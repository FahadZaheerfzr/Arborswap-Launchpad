import React from 'react'

export default function CurrencyOptions({ setCurrency, id, selected, name, icon, symbol }) {
    return (
        <div
            className={`w-full rounded-[10px] px-5 py-3 ${selected ? ' border-[1.5px] border-[#C89211] ' : 'border-dim-text border-[1.5px] border-opacity-50'}`}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <img src={icon} alt={name} className="h-9 w-9" />
                    <div className="flex flex-col ml-2">
                        <div className="flex items-center gap-2">
                            <span className={`font-gilroy text-sm font-bold ${selected ? "text-dark-text dark:text-light-text" : "text-dim-text dark:text-dim-text-dark"}`}>{symbol}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`font-gilroy text-xs font-bold text-dim-text dark:text-dim-text-dark`}>{name}</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`border-[1.5px] ${selected ? 'border-[#C89211]' : 'border-dim-text'
                        } h-6 w-6 rounded-full flex justify-center items-center  border-opacity-50`}
                    onClick={() => setCurrency(id)}
                >
                    {selected && <div className="h-3 w-3 rounded-full bg-[#C89211]"></div>}
                </div>
            </div>
        </div>
    )
}
