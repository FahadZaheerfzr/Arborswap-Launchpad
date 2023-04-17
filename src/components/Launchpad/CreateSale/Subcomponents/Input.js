import Tooltip from 'components/Common/Tooltip'
import React from 'react'
import HeadingTags from '../../../TokenLocker/Subcomponents/HeadingTags'

export default function Input({heading, tooltip, icon, value, disabled, currencies, currencySelected, nothing, text, changeState}) {
    return (
        <div className='w-full'>
            <div className="flex items-center">
                <HeadingTags name={heading} required />
                {tooltip &&
                <Tooltip text={tooltip} />
                }
            </div>

            <div className="flex items-center rounded-lg border-[1.5px] pr-5 border-dim-text border-opacity-50 justify-between mt-5">
                <input
                    className="bg-transparent w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none"
                    type={'text'}
                    value={value}
                    disabled={disabled}
                    onChange={(e)=>changeState(e.target.value)}
                    placeholder="70"
                />
                {currencySelected ?
                <img className='w-5 h-5' src={currencies[currencySelected - 1].icon} alt='currency-icon' />
                : 
                icon? <img className='w-5 h-5' src={icon} alt='currency-icon' />
                : !nothing ? 
                text ? <span className='font-semibold'>{text}</span> :<span>%</span>  : null
                }
            </div>
        </div>
    )
}
