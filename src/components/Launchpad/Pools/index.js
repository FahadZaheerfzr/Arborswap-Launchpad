import React from 'react'
import { Link } from 'react-router-dom'
import Timer from './Subcomponents/Timer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from 'config/constants/LaunchpadAddress'

export default function PoolsBase({ activeStatus }) {
    const [pools, setPools] = useState([])
    const [loading, setLoading] = useState(true)
    

    //we will get data for pools from api
    useEffect(() => {
        //api request to localhost:8080/api/sale
        setLoading(true)
        axios.get(`${BACKEND_URL}/api/sale`)
            .then((res) => {
                setPools(res.data)
            })
            .catch((err) => {
                
            })
        
        setLoading(false)
    }, [])

    const checkStatus = (item) => {
        //from item.sale.start_date and item.sale.end_date we will check the status of the pool
        const currentDate = new Date()
        const startDate = new Date(item.sale.startDate * 1000)
        const endDate = new Date(item.sale.endDate * 1000)
        
        if (currentDate < startDate) {
            
            return 'Upcoming'
        }
        else if (currentDate > startDate && currentDate < endDate) {
            
            return 'Live'
        }
        else {
            
            return 'Ended'
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-8'>
            {!loading&&pools?.map((pool) => (
                checkStatus(pool) === activeStatus &&
                <Link to={`/launchpad/pools/${pool._id}`} key={pool.sale.saleId}>
                    <div className='flex flex-col'>
                        <div className='bg-white dark:bg-dark-1 rounded-t-md p-6'>
                            <div className='flex items-center'>
                                <img src={pool.sale.image} alt={pool.sale.name} className='w-[54px] h-[54px]' />

                                <div className=' ml-4'>
                                    <div className='flex items-center'>
                                        <h3 className=' font-bold dark:text-light-text'>{pool.sale.name}</h3>
                                        {pool.sale.saleType==="private" &&
                                            <span className='ml-2 text-[10px] font-bold bg-[#E56060] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px]'>
                                                Private
                                            </span>
                                        }
                                    </div>

                                    <div className='flex items-center mt-2'>
                                        {/* tags are not array, its a string, we have to divide by space*/}
                                        {pool.sale.tags.split(',').map((tag) => (
                                            <span key={tag} className='text-[10px] font-bold bg-[#F6E05E] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px] mr-2'>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-8'>
                                <span className='text-sm font-medium text-gray dark:text-gray-dark'>
                                    Soft Cap
                                </span>

                                <div className='flex items-center'>
                                    {/* <img src={pool.soft_cap_icon} alt="soft-icon" className='w-[18px] h-[18px]' /> */}

                                    <span className='ml-2 font-bold text-dark-text dark:text-light-text'>
                                        {pool.sale.softCap}
                                    </span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-4'>
                                <span className='text-sm font-medium text-gray dark:text-gray-dark'>
                                    Hard Cap
                                </span>

                                <div className='flex items-center'>
                                    {/* <img src={pool.hard_cap_icon} alt="hard-icon" className='w-[18px] h-[18px]' /> */}

                                    <span className='ml-2 font-bold text-dark-text dark:text-light-text'>
                                        {pool.sale.hardCap}
                                    </span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-5'>
                                <span className='text-xs  text-gray dark:text-gray-dark'>
                                    {(pool.sale.hardCap * (25 / 100)).toLocaleString()} {pool.sale.token.tokenSymbol}
                                    {/* idk where to get filled perccentage */}
                                </span>

                                <span className='text-xs  text-dim-text dark:text-dim-text-dark'>
                                    {pool.sale.hardCap} {pool.sale.token.tokenSymbol}
                                </span>
                            </div>

                            <div className='w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]'>
                                <div className={`h-18px filled rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                                    style={{ width: `${pool.filled_percent}%` }}>
                                        {/* here too where filled percentage */}
                                    {pool.filled_percent}%
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-6'>
                                <div className='flex flex-col justify-between'>
                                    <span className='text-xs font-medium text-gray dark:text-gray-dark'>
                                        Liquidity %
                                    </span>

                                    <span className='font-medium text-dim-text dark:text-dim-text-dark'>
                                        <span className='text-dark-text dark:text-light-text font-semibold'>{pool.sale.amountLiquidity}</span> of 100
                                    </span>
                                </div>

                                <div className='flex flex-col justify-between items-center'>
                                    <span className='text-xs font-medium text-gray dark:text-gray-dark'>
                                        Lockup Period
                                    </span>

                                    <span className='text-dark-text dark:text-light-text font-semibold'>
                                        {pool.sale.lockup} days
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#C89211] bg-opacity-[0.08] py-2 px-6 rounded-b-[20px] flex items-center justify-between'>
                            <span className='text-xs font-medium text-gray dark:text-gray-dark'>
                                Ends in
                            </span>

                            <Timer time={new Date(pool.sale.endDate * 1000)} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
