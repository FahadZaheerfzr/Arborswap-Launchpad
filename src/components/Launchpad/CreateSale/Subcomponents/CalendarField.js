import React from 'react'
import CalendarSVG from '../../../../svgs/TokenLocker/calendar'
import Datetime from 'react-datetime'
import { ThemeContext } from '../../../../context/ThemeContext/ThemeProvider'
import HeadingTags from '../../../TokenLocker/Subcomponents/HeadingTags'

export default function CalendarField({ heading, setFunction }) {
    const { theme } = React.useContext(ThemeContext)
    const valid = (current) => {
        return current.isAfter(new Date())
    }

    const handleChange = (e) => {
        setFunction(e.unix())
    }

    return (
        <div className='w-full'>
            <div className="flex items-center">
                <HeadingTags name={heading} required />
                {/* <Tooltip text={} /> */}
            </div>
            <div className="flex items-center mt-5 border-[1.5px] py-4 border-dim-text dark:border-dim-text-dark border-opacity-50 rounded-lg">
                <CalendarSVG className="ml-5 fill-gray dark:fill-gray-dark" />
                <Datetime
                    className={`ml-5 font-gilroy font-semibold text-dark-text dark:text-light-text ${theme === 'dark' ? 'dark-calendar' : ''
                        }`}
                    isValidDate={valid}
                    onChange={handleChange}
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm:ss"
                    utc={true}
                />
            </div>
        </div>
    )
}
