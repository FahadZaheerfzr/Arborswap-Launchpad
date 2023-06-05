import React, { useState } from 'react'
import Info from './Subcomponents/Info'

import TabSwitch from './Subcomponents/TabSwitch';
import DonutChart from './Subcomponents/DonutChart';
import Labels from './Subcomponents/Labels';
import TwitterSVG from 'svgs/Socials/twitter';
import DribbleSVG from 'svgs/Socials/dribble';
import PreviewDetails from 'components/Common/PreviewDetails';


const TokkenDetails = {
    TokenName: "Swipe Coin",
    TokenSymbol: "SXP",
    TokenDecimals: 18,
    TotalSupply: 1000000000,
}


export default function Preview({
    pool,
    icon,
    name,
    is_private,
    token,
    tags,
    description,
    address,
    starts_on,
    ends_on,
    soft_cap,
    hard_cap,
    soft_cap_icon,
    hard_cap_icon,
    first_release,
    vesting_release,
    unsold_tokens,
    liquidity,
    lockup
}) {
    const [slide, setSlide] = useState('Presale')
    
    const supply= parseFloat(token.tokenSupply) / 10 ** token.tokenDecimals 
    console.log(pool)
    return (
        <div className="px-9 py-9 my-4">
            <Info name={name} icon={icon} is_private={is_private} tags={tags} pool={pool} />

            <div className='mt-6 flex md:hidden gap-5 ml-[70px]'>
                
                <TwitterSVG className="fill-dark-text dark:fill-light-text " />
                <DribbleSVG className="fill-dark-text dark:fill-light-text " />
            </div>
            <div className="mt-10">
                <span className="font-medium text-sm text-gray dark:text-gray-dark">{description}</span>
            </div>

            <TabSwitch slide={slide} setSlide={setSlide} />

            {slide === 'Presale' &&
                <div className="mt-5">
                    <PreviewDetails name={'Presale Address'} value={address} enable_copy />
                    <PreviewDetails name={'Presale Starts on'} value={new Date(starts_on*1000).toUTCString()} />
                    <PreviewDetails name={'Presale Ends on'} value={new Date(ends_on*1000).toUTCString()} />
                    <PreviewDetails name={'Soft Cap'} value={soft_cap && soft_cap.toLocaleString()} icon={soft_cap_icon} />
                    <PreviewDetails name={'Hard Cap'} value={hard_cap && hard_cap.toLocaleString()} icon={hard_cap_icon} />
                    {
                        unsold_tokens &&
                        <PreviewDetails name={'Unsold Tokens'} value={unsold_tokens} />
                    }
                    <PreviewDetails name={'To be listed on'} value={pool.dex.name} icon={pool.dex.icon} />
                    {
                        liquidity &&
                        <PreviewDetails name={'Tokens for Liquidity'} value={(Math.floor(supply*(liquidity/100))).toString()} />
                    }
                    {
                        liquidity &&
                        <PreviewDetails name={'Tokens for Liquidity (%)'} value={liquidity+"%"} />
                    }
                    {
                        lockup &&
                        <PreviewDetails name={'Liquidity Lockup Time (Days)'} value={lockup} />
                    }
                    {first_release &&
                    <PreviewDetails name={'First Release'} value={first_release} />
                    }
                    {vesting_release && 
                    <PreviewDetails name={'Vesting Release'} value={vesting_release} />
                    }
                    
                </div>
            }
            {slide === 'Token' &&
                <div className="mt-5">
                    <PreviewDetails name={'Token Name'} value={token.tokenName} />
                    <PreviewDetails name={'Token Symbol'} value={token.tokenSymbol} />
                    <PreviewDetails name={'Token Decimals'} value={token.tokenDecimals} />
                    <PreviewDetails name={'Total Supply'} value={token.tokenSupply && token.tokenSupply.toLocaleString()} />
                    <PreviewDetails name={'Token Address'} value={token.tokenAddress} enable_copy />

                    <div className='mt-10'>
                        <span className="font-semibold text-dark-text dark:text-light-text">Token Metrics</span>
                        <div className='flex items-center mt-7'>
                            <div className='w-full '>
                                <DonutChart />
                            </div>
                            <div className='w-full pl-16'>
                                <Labels color={"#307856"} text={"Presale"} />
                                <Labels color={"#585B79"} text={"Liquidity"} />
                                <Labels color={"#C89211"} text={"Locked"} />
                                <Labels color={"#E56060"} text={"Burned"} />                                
                                <Labels color={"#239C63"} text={"Unlocked"} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
