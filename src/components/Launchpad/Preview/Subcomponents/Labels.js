import React from 'react'

export default function Labels({ color, text }) {
    return (
        <div className='flex items-center mt-3 first:mt-0'>
            <div className={`w-4 h-4 rounded mr-3`} style={{background: color}}/>
            <span className='font-gilroy font-semibold text-dark-text dark:text-light-text'>
                {text}
            </span>
        </div>
    )
}
