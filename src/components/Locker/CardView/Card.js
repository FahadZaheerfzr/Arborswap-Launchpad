import { useToken } from '@usedapp/core'
import { formatUnits } from 'ethers/lib/utils'
import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardInfo from './CardInfo'
import Timer from './Timer'
import moment from 'moment'
import { getLpInfo } from 'utils/lpInfo'
import TokenImage from 'components/Common/TokenImage'

export default function Card({ data, token = false }) {
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
    if (!token) {
      getLpInfo(data.info.token).then((info) => {
        setLpSymbol(`${info.data.token0.symbol}/${info.data.token1.symbol}`)
      })
    }
  }, [data, token])

  const unlockDate = useMemo(() => {
    return moment.unix(data.info.unlockDate.toNumber()).format('YYYY-MM-DD')
  }, [data])

  return (
    <div className="rounded-[20px] bg-white dark:bg-dark-1">
      <div className="px-6">
        <div className="flex justify-between items-center border-b border-dim-text dark:border-dim-text-dark border-dashed border-opacity-30 mt-3 py-5">
          <div className="flex items-center">
            <div className="flex items-center">
              {token && <TokenImage className="w-10 h-10" src={data.info.logoImage} alt="BLANK" />}
            </div>

            <div
              className={`flex flex-col justify-center font-bold font-gilroy text-dark-text dark:text-light-text ${
                token ? 'ml-[10px]' : 'ml-0'
              }`}
            >
              <span>{token ? symbol : lpSymbol}</span>
              <span className="text-xs font-medium text-dim-text dark:text-dim-text-dark">
                {token ? tokenInfo?.name : ''}
              </span>
            </div>
          </div>
          <Link to={`/locked-assets/${token ? 'token' : 'lp-token'}/${data.address}`}>
            <div className="flex items-center">
              <span className="flex items-center font-medium text-sm font-gilroy text-primary-green ">View</span>
              <img className="rotate-180" src="/images/sidebar/arrow-left.svg" alt="arrow-right" />
            </div>
          </Link>
        </div>

        <div className="flex flex-col justify-between">
          <CardInfo heading={'Amount'} value={amount.toString().toLocaleString()} />
          <CardInfo heading={'Amount ($)'} value={0} />
          <CardInfo heading={'Unlock date'} value={unlockDate} />
        </div>
      </div>

      <div className="bg-[#FAF8F5] dark:bg-dark-2 rounded-b-[20px] py-5 px-7 mt-5 ">
        <div className="flex justify-between items-center">
          <span className="font-medium text-xs text-gray dark:text-gray-dark">Unlocks In</span>

          <Timer date={data.info.unlockDate.toNumber() * 1000} />
        </div>
      </div>
    </div>
  )
}
