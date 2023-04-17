import React, { useState } from 'react'
import Info from './Subcomponents/Info'
import PreviewDetails from '../../../Common/PreviewDetails'
import TwitterSVG from '../../../../svgs/Socials/twitter';
import DribbleSVG from '../../../../svgs/Socials/dribble';
import TabSwitch from './Subcomponents/TabSwitch';
import DonutChart from './Subcomponents/DonutChart';
import Labels from './Subcomponents/Labels';

const TokkenDetails = {
    TokenName: "Swipe Coin",
    TokenSymbol: "SXP",
    TokenDecimals: 18,
    TotalSupply: 1000000000,
}


export default function Preview({
    icon,
    name,
    is_private,
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
}) {
    const [slide, setSlide] = useState('Presale')

    return (
        <div className="px-9 py-9 my-4">
            <Info name={name} icon={icon} is_private={is_private} tags={tags} />

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
                    <PreviewDetails name={'Presale Starts on'} value={starts_on} />
                    <PreviewDetails name={'Presale Ends on'} value={ends_on} />
                    <PreviewDetails name={'Soft Cap'} value={soft_cap.toLocaleString()} icon={soft_cap_icon} />
                    <PreviewDetails name={'Hard Cap'} value={hard_cap.toLocaleString()} icon={hard_cap_icon} />
                    <PreviewDetails name={'First Release'} value={first_release} />
                    <PreviewDetails name={'Vesting Release'} value={vesting_release} />
                </div>
            }
            {slide === 'Token' &&
                <div className="mt-5">
                    <PreviewDetails name={'Token Name'} value={TokkenDetails.TokenName} />
                    <PreviewDetails name={'Token Symbol'} value={TokkenDetails.TokenSymbol} />
                    <PreviewDetails name={'Token Decimals'} value={TokkenDetails.TokenDecimals} />
                    <PreviewDetails name={'Total Supply'} value={TokkenDetails.TotalSupply.toLocaleString()} />
                    <PreviewDetails name={'Token Address'} value={address} enable_copy />

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
