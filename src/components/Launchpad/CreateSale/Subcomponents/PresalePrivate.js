import React from 'react'
import Input from './Input'

export default function PresalePrivate({setFirstRelease, setVestingPeriod, setVestingRelease}) {
    return (
        <div>
            <div className="flex items-center gap-5 mt-7">
                <Input heading={"First Release on sale"} changeState={setFirstRelease} />
            </div>

            <div className="flex items-center gap-5 mt-10">
                <div className="w-1/2">
                    <Input heading={'Vesting period each cycle'} text={"Days"} changeState={setVestingPeriod} />
                </div>

                <div className="w-1/2">
                    <Input heading={'Vesting Release each Cycle '} changeState={setVestingRelease}  />
                </div>
            </div>

        </div>
    )
}
