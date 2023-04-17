import React, { useState } from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import Lock from '../../components/TokenLocker/Lock'
import { useDocumentTitle } from '../../hooks/setDocumentTitle'
import SheildSecuritySVG from '../../svgs/Sidebar/shield_security'

export default function LpLocker() {
  useDocumentTitle('LP Locker')
  const initLockState = {
    isValid: false,
    type: 'lptoken',
    tokenAddress: '',
    tokenName: '',
    tokenSymbol: '',
    tokenDecimals: '',
    token0: {
      address: '',
      symbol: '',
    },
    token1: {
      address: '',
      symbol: '',
    },
    factory: '',
    tokenSupply: '',
    lockAmount: 0,
    lockAmountBN: 0,
    unlockDate: Math.floor(Date.now() / 1000) + 86400,
    image: '',
    userBalance: '',
    userAllowance: '0',
  }
  const [lockData, setLockData] = useState({ ...initLockState, showLanding: true, showDetails: false })

  return (
    <BaseLayout
      title={'Locker'}
      page_name={'LP Locker'}
      title_img={<SheildSecuritySVG className="md:hidden fill-dim-text" />}
    >
      <div className="w-full flex justify-center mb-16">
        <div className="w-full px-4 md:px-0 md:w-10/12">
          <Lock lockData={lockData} setLockData={setLockData} initLockState={initLockState} lp_locker />
        </div>
      </div>
    </BaseLayout>
  )
}
