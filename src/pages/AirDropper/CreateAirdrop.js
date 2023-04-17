import TokenType from 'components/Airdropper/CreateAirdrop/TokenType'
import React, { useState } from 'react'
import AirdropPanel from '../../components/Airdropper/CreateAirdrop/AirdropPanel'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import { useDocumentTitle } from '../../hooks/setDocumentTitle'
import AirplaneSVG from '../../svgs/Sidebar/airplane'

export default function CreateAirdrop() {
    useDocumentTitle('Create Airdrop')
    const initAirdropState = {
        name: '',
        isValid: false,
        airdropAddress: '',
        type:  '',
        tokenAddress: '',
        tokenName: '',
        tokenSymbol: '',
        tokenDecimals: '',
        tokenSupply: '',
        image: '',
        description: '',
        tags: '',
        website: '',
        twitter: '',
        linkedin: '',
        github: '',
        userBalance: '',
        userAllowance: '0',
    }
    const [airdropData, setAirdropData] = useState({ ...initAirdropState, showLanding: true, showDetails: false })
    return (
        <BaseLayout
            title={'Airdropper'}
            title_img={<AirplaneSVG className="md:hidden fill-dim-text" />}
            page_name={'Create Airdrop'}
            page_description={'Airdrop to multiple users in few clicks.'}
        >
                <div className="w-full flex justify-center mb-16">
                    {airdropData.showLanding ?(
                      <div className="w-full px-4 md:px-0 md:w-1/2">
                          <TokenType airdropData={airdropData} setAirdropData={setAirdropData} />
                      </div>
                    ) : (
                      <div className="w-full px-4 md:px-0 md:w-10/12">
                          <AirdropPanel airdropData={airdropData} setAirdropData={setAirdropData} initAirdropState={initAirdropState}/>
                      </div>
                    )}
                </div>
        </BaseLayout>
    )
}
