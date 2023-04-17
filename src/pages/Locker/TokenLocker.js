import React, { useState, useEffect } from 'react'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import Landing from '../../components/TokenLocker/Landing'
import Lock from '../../components/TokenLocker/Lock'
import { useDocumentTitle } from '../../hooks/setDocumentTitle'
import SheildSecuritySVG from '../../svgs/Sidebar/shield_security'
import { useEthers } from '@usedapp/core'

export default function TokenLocker() {
  useDocumentTitle('Token Locker')
  const initLockState = {
    isValid: false,
    type: 'standard',
    tokenAddress: '',
    tokenName: '',
    tokenSymbol: '',
    tokenDecimals: '',
    tokenSupply: '',
    lockAmount: 0,
    lockAmountBN: 0,
    unlockDate: Math.floor(Date.now() / 1000) + 86400,
    image: '',
    userBalance: '',
    userAllowance: '0',
  }
  const [lockData, setLockData] = useState({ ...initLockState, showLanding: true, showDetails: false })
  const { account, error } = useEthers()

  useEffect(() => {
    if (error && account) {
      return
    }
  }, [error, account])

  return (
    <BaseLayout
      title={'Locker'}
      page_name={'Token Locker'}
      title_img={<SheildSecuritySVG className="md:hidden fill-dim-text" />}
    >
      <div className="w-full flex justify-center mb-16">
        {lockData.showLanding ? (
          <div className="w-full px-4 md:px-0 md:w-1/2">
            <Landing lockData={lockData} setLockData={setLockData} />
          </div>
        ) : (
          <div className="w-full px-4 md:px-0 md:w-10/12">
            <Lock lockData={lockData} setLockData={setLockData} initLockState={initLockState} />
          </div>
        )}
      </div>
    </BaseLayout>
  )
}
