import React from 'react'
import { Link } from 'react-router-dom'
import { Pools } from '../../../data/pools'
import Timer from './Subcomponents/Timer'

export default function PoolsBase({ activeStatus }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-8'>
            {Pools.map((pool) => (
                pool.status === activeStatus &&
                <Link to={`/launchpad/pools/${pool.id}`} key={pool.id}>
                    <div className='flex flex-col'>
                        <div className='bg-white dark:bg-dark-1 rounded-t-md p-6'>
                            <div className='flex items-center'>
                                <img src={pool.icon} alt={pool.name} className='w-[54px] h-[54px]' />

                                <div className=' ml-4'>
                                    <div className='flex items-center'>
                                        <h3 className=' font-bold dark:text-light-text'>{pool.name}</h3>
                                        {pool.private &&
                                            <span className='ml-2 text-[10px] font-bold bg-[#E56060] dark:bg-[#B86363] py-[2px] px-2 text-white rounded-[10px]'>
                                                Private
                                            </span>
                                        }
                                    </div>

                                    <div className='flex items-center mt-2'>
                                        {pool.tags.map((tag) => (
                                            <div key={tag.id} className='bg-[#F5F1EB] dark:bg-dark-3 mr-[6px] py-[2px] px-[10px] rounded text-xs text-gray dark:text-gray-dark font-medium'>
                                                {tag.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-8'>
                                <span className='text-sm font-medium text-gray dark:text-gray-dark'>
                                    Soft Cap
                                </span>

                                <div className='flex items-center'>
                                    <img src={pool.soft_cap_icon} alt="soft-icon" className='w-[18px] h-[18px]' />

                                    <span className='ml-2 font-bold text-dark-text dark:text-light-text'>
                                        {pool.soft_cap.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-4'>
                                <span className='text-sm font-medium text-gray dark:text-gray-dark'>
                                    Hard Cap
                                </span>

                                <div className='flex items-center'>
                                    <img src={pool.hard_cap_icon} alt="hard-icon" className='w-[18px] h-[18px]' />

                                    <span className='ml-2 font-bold text-dark-text dark:text-light-text'>
                                        {pool.hard_cap.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-5'>
                                <span className='text-xs  text-gray dark:text-gray-dark'>
                                    {(pool.hard_cap * (pool.filled_percent / 100)).toLocaleString()} {pool.symbol}
                                </span>

                                <span className='text-xs  text-dim-text dark:text-dim-text-dark'>
                                    {pool.hard_cap} {pool.symbol}
                                </span>
                            </div>

                            <div className='w-full bg-[#F5F1EB] dark:bg-dark-3 rounded-[5px] h-[18px] mt-[6px]'>
                                <div className={`h-18px filled rounded-[5px] pr-2 flex justify-end items-center text-xs text-white`}
                                    style={{ width: `${pool.filled_percent}%` }}>
                                    {pool.filled_percent}%
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-6'>
                                <div className='flex flex-col justify-between'>
                                    <span className='text-xs font-medium text-gray dark:text-gray-dark'>
                                        Liquidity %
                                    </span>

                                    <span className='font-medium text-dim-text dark:text-dim-text-dark'>
                                        <span className='text-dark-text dark:text-light-text font-semibold'>{pool.liquidity_percent}</span> of 100
                                    </span>
                                </div>

                                <div className='flex flex-col justify-between items-center'>
                                    <span className='text-xs font-medium text-gray dark:text-gray-dark'>
                                        Lockup Period
                                    </span>

                                    <span className='text-dark-text dark:text-light-text font-semibold'>
                                        {pool.lockup_period} days
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#C89211] bg-opacity-[0.08] py-2 px-6 rounded-b-[20px] flex items-center justify-between'>
                            <span className='text-xs font-medium text-gray dark:text-gray-dark'>
                                Ends in
                            </span>

                            <Timer time={pool.ends_on} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
