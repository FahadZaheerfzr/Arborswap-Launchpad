import React from 'react'

export default function TabSwitch({ slide, setSlide }) {
    return (
        <div className="mt-10 w-full flex rounded-[9px] px-[6px] py-[6px] bg-[#F5F1EB] dark:bg-dark-3 font-medium text-sm text-dim-text dark:text-dim-text-dark">
            <div
                className={`w-full cursor-pointer flex justify-center items-center py-2 ${slide === 'Presale' ? 'bg-white text-dark-text dark:text-light-text font-semibold dark:bg-dark-1' : ''
                    }`}
                onClick={() => setSlide('Presale')}
            >
                <span className="">Presale</span>
            </div>
            <div
                className={`w-full cursor-pointer flex justify-center items-center py-2 ${slide === 'Token' ? 'bg-white text-dark-text dark:text-light-text font-semibold dark:bg-dark-1' : ''
                    }`}
                onClick={() => setSlide('Token')}
            >
                <span className="">Token</span>
            </div>
        </div>

    )
}
