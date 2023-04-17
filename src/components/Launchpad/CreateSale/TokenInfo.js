import React from 'react'
import { Token_details } from '../../../data/sale'
import BackArrowSVG from '../../../svgs/back_arrow'
import PreviewDetails from '../../Common/PreviewDetails'
import PreviewHeader from '../../Common/PreviewHeader'
import HeadingTags from '../../TokenLocker/Subcomponents/HeadingTags'




export default function TokenInfo({ setActive, setSaleType }) {
    const [address, setAddress] = React.useState('')

    const handleChange = (e) => {
        setAddress(e.target.value)
    }
    return (
        <div className='w-full'>
            <HeadingTags name={'Token Address'} required />

            <input
                className="bg-transparent mt-5 w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
                type={'text'}
                placeholder="0xc197033c129839ED4740c29919Bd88fD42bbde"
                onChange={(e) => { handleChange(e) }}
            />

            <PreviewHeader heading={'Token address Details'} />
            {address.length > 4 && (
            <div className='mt-5'>
                {Token_details.map((item) => (
                    <PreviewDetails key={item.id} name={item.name} value={item.value} icon={item.icon} />
                ))}
            </div>)}

            <div className="mt-10">
                <div className="flex justify-end items-center mb-10">

                    <button className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
                        onClick={() => setSaleType(null)}>
                        <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
                        <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
                    </button>


                    <button
                        className="bg-primary-green hover:opacity-40 disabled:bg-dim-text disabled:dark:bg-dim-text-dark text-white font-gilroy font-bold px-8 py-3 rounded-md"
                        disabled={address.length < 5}
                        onClick={() => setActive('Presale')}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
