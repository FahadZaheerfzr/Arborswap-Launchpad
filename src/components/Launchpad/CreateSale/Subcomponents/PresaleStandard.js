import React from 'react'
import Input from './Input';

export default function PresaleStandard({setUnsoldTokens, setLockup}) {
    return (
        <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
                <Input heading={'Unsold tokens'} icon={"/images/arrows/arrow-down.svg"} changeState={setUnsoldTokens} value={"Burn"} disabled={true} />
            </div>
            <div className="w-1/2">
                <div className='hidden md:block'>
                    <Input heading={'Liquidity Lockup (days)'} changeState={setLockup} nothing />
                </div>
                <div className='md:hidden'>
                    <Input heading={'Lockup (days)'} nothing />
                </div>
            </div>
        </div>
    )
}
