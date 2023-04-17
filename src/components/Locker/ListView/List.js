import React, { useState, useMemo, useEffect } from 'react'
import { useToken } from '@usedapp/core'
import { formatUnits } from 'ethers/lib/utils'
import { Link } from 'react-router-dom'
import ListInfo from './ListInfo'
import moment from 'moment'
import { getLpInfo } from 'utils/lpInfo'
import TokenImage from 'components/Common/TokenImage'

export default function List({ data, token = false }) {
  const [lpSymbol, setLpSymbol] = useState('')
  const tokenInfo = useToken(data.info.token, {
    refresh: 0,
  })

  const amount = useMemo(() => {
    return tokenInfo ? formatUnits(data.info.amount, tokenInfo.decimals) : 0
  }, [data, tokenInfo])

  const symbol = useMemo(() => {
    return tokenInfo ? tokenInfo?.symbol : ''
  }, [tokenInfo])

  useEffect(() => {
    if (typeof data?.info?.token === 'undefined') {
      return
    }
    let isFetch = true
    getLpInfo(data?.info?.token).then((info) => {
      if (isFetch) {
        setLpSymbol(`${info.data.token0.symbol}/${info.data.token1.symbol}`)
      }
    })
    return () => {
      isFetch = false
    }
  }, [data])

  const unlockDate = useMemo(() => {
    return moment.unix(data.info.unlockDate.toNumber()).format('YYYY-MM-DD')
  }, [data])

  return (
    <div className="w-full flex items-center justify-between bg-white dark:bg-dark-1 rounded-[10px] py-5 px-6">
      <div className="flex items-center">
        {token && <TokenImage className="w-10 h-10" src={data.info.logoImage} alt="" />}
      </div>

      <div
        className={`flex flex-col justify-center font-bold font-gilroy text-dark-text dark:text-light-text ${
          token ? 'ml-[10px]' : 'ml-0'
        }`}
      >
        <span>{token ? symbol : lpSymbol}</span>
        <span className="text-xs font-medium text-dim-text dark:text-dim-text-dark">{token}</span>
      </div>

      <ListInfo heading={'Amount'} value={amount.toLocaleString()} />
      <ListInfo heading={'Unlocks on'} value={unlockDate} />

      <div className="flex items-center">
        <Link to={`/locked-assets/${token ? 'token' : 'lp-token'}/${data.address}`}>
          <img className="rotate-180" src="/images/sidebar/arrow-left.svg" alt="arrow-right" />
        </Link>
      </div>
    </div>
  )
}
