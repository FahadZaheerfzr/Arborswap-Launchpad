import { useEthers } from '@usedapp/core'
import PreviewDetails from 'components/Common/PreviewDetails'
import { Contract } from 'ethers'
import React, { useEffect, useState } from 'react'
import PublicSale from 'config/abi/PublicSale.json'
import PublicSaleErcAbi from 'config/abi/PublicSaleErcAbi.json'
import { formatBigToNum } from 'utils/numberFormat'


export default function SaleBox({ icon, sale }) {
    const {account, library} = useEthers()
    const [allocated, setAllocated] = useState(0)
    const [bought, setBought] = useState(0)

    const getUserParticipation = async () => {
        const contract = new Contract(sale.saleAddress,PublicSale, library.getSigner());
        const userParticipation = await contract.getParticipation(account)        
        setBought(formatBigToNum(userParticipation[0].toString(), 18, 4))
        setAllocated(formatBigToNum(userParticipation[1].toString(), 18, 4))
    }

    useEffect(()=>{
        if(sale){
            getUserParticipation()
        }
    },[sale])

    return (
        <div className="px-9 pb-9 bg-white dark:bg-dark-1 rounded-[20px]">
            <div className="w-full flex justify-center">
                <div className='w-1/2 py-5 flex justify-center items-center border-b-2 border-primary-green '>
                    <span className='font-bold text-primary-green'>
                        User Panel
                    </span>
                </div>
            </div>

            <PreviewDetails name={"Amount Allocated"} value={allocated + " " + sale.currency.symbol} />
            <PreviewDetails name={"Amount Bought"} value={bought + " " + sale.token.tokenSymbol} />


            <div className="flex flex-col items-center">
                <span className='font-medium text-gray dark:text-gray-dark text-sm mt-5'>
                    Available to Claim
                </span>

                <div className='mt-3 flex'>
                    <img src={icon} alt="pool-icon" className='w-6 h-6 mr-2' />
                    <span className='font-bold text-dark-text dark:text-light-text text-xl'>
                        ---
                    </span>
                </div>
            </div>

            <div className="mt-7">
                <button className="w-full opacity-50 bg-primary-green rounded-md text-white font-bold py-4">
                    Claim
                </button>
            </div>
        </div>
    )
}
