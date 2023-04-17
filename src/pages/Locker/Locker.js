import React, { useState, useEffect } from 'react'
import { getLiquidityLockList, getTokenLockList, getTokenLockInfos, getLpLockInfos } from 'utils/getLockList'
import BaseLayout from '../../components/BaseLayout/BaseLayout'
import HomeLayout from '../../components/HomeLayout'
import LockerBase from '../../components/Locker'
import SheildSecuritySVG from '../../svgs/Sidebar/shield_security'

export default function Locker() {
  const [cardFormat, setCardFormat] = useState('grid')
  const [itemSelected, setItemSelected] = useState('liquidity')
  const [ready, setReady] = useState(false)
  const [tokenList, setTokenList] = useState([])
  const [liquidityList, setLiquidityList] = useState([])

  const handleFetch = async () => {
    setReady(false)
    try {
      const [token, liquidity] = await Promise.all([getTokenLockList(), getLiquidityLockList()])
      if (token.success) {
        const info = await getTokenLockInfos(token.data)
        if (info.success) {
          setTokenList(info.data)
          
        }
      }
      if (liquidity.success) {
        const infoLp = await getLpLockInfos(liquidity.data)
        if (infoLp.success) {
          setLiquidityList(infoLp.data)
        }
      }
      setReady(true)
      
    } catch (error) {}
  }

  useEffect(() => {
    handleFetch()
  }, [])
  return (
    <BaseLayout
      title={'Locker'}
      page_name={'Locked Assets'}
      title_img={<SheildSecuritySVG className="md:hidden fill-dim-text" />}
    >
      <HomeLayout
        cardFormat={cardFormat}
        setCardFormat={setCardFormat}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      >
        {ready ? (
          <LockerBase
            cardFormat={cardFormat}
            itemSelected={itemSelected}
            tokenList={tokenList}
            liquidityList={liquidityList}
          />
        ) : (
          <></>
        )}
      </HomeLayout>
    </BaseLayout>
  )
}
