import React, { useMemo } from 'react'
import PreviewDetails from '../../Common/PreviewDetails'
import PreviewHeader from '../../Common/PreviewHeader'
import Options from './Subcomponents/Options'
import { formatUnits } from 'ethers/lib/utils'
import moment from 'moment'
import { formatBigToNum } from 'utils/numberFormat'

export default function Preview({ type, asset, tokenInfo, lpInfo }) {
  const title = useMemo(() => {
    if (type === 'token') {
      return tokenInfo?.symbol
    }
    return `${lpInfo?.token0?.symbol}/${lpInfo?.token1?.symbol}`
  }, [type, tokenInfo, lpInfo])

  const description = useMemo(() => {
    if (type === 'token') {
      return tokenInfo?.name
    }
    return `${lpInfo?.token0?.symbol}/${lpInfo?.token1?.symbol}`
  }, [type, tokenInfo, lpInfo])

  const amount = useMemo(() => {
    return asset && tokenInfo ? formatUnits(asset?.info?.amount, tokenInfo?.decimals) * 1 : 0
  }, [asset, tokenInfo])

  const totalSupply = useMemo(() => {
    return tokenInfo ? formatUnits(tokenInfo?.totalSupply, tokenInfo?.decimals) * 1 : 0
  }, [tokenInfo])

  // TODO need change
  const amountUSD = 0

  const unlockDate = useMemo(() => {
    return moment.unix(asset?.info?.unlockDate?.toNumber()).format('YYYY-MM-DD')
  }, [asset])

  return (
    <div className="preview px-9  py-9 my-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* <div className="flex">
            <img src={icon1} alt={name1} className="w-[54px] h-[54px]" />
            <img src={icon2} alt={name2} className="w-[54px] h-[54px] relative -ml-7" />
          </div> */}

          <div className="flex flex-col ml-4 font-gilroy">
            <span className="text-dark-text dark:text-light-text  font-bold">{title}</span>

            <span className="text-gray dark:text-gray-dark font-medium mt-2 text-xs">{description}</span>
          </div>
        </div>

        <Options width={'w-7'} height={'h-7'} color={'[#FAF8F5]'} dark_color={'dark-2'} />
      </div>

      <PreviewHeader heading={'Lock Details'} />

      <div className="flex flex-col">
        <PreviewDetails
          name={type === 'token' ? 'Token Locked' : 'LP Locked'}
          value={amount.toLocaleString()}
          icon={null}
        />
        <PreviewDetails name={'Amount in ($)'} value={amountUSD.toLocaleString()} icon={null} />
        <PreviewDetails name={'Locked By'} value={asset?.owner} icon={null} />
        <PreviewDetails name={'Unlock Date'} value={unlockDate} icon={null} />
      </div>

      <PreviewHeader heading={type === 'token' ? 'Token Details' : 'LP Details'} />

      <div className="flex flex-col">
        {type === 'token' ? (
          <>
            <PreviewDetails name="Name" value={tokenInfo?.name} />
            <PreviewDetails name="Symbol" value={tokenInfo?.symbol} />
            <PreviewDetails name="Decimals" value={tokenInfo?.decimals} />
            <PreviewDetails name="Total Supply" value={totalSupply.toLocaleString()} />
          </>
        ) : (
          <>
            <PreviewDetails name="Quote Pair" value={lpInfo?.token0.symbol} />
            <PreviewDetails name="Base Pair" value={lpInfo?.token1.symbol} />
            <PreviewDetails name="Symbol" value={description} />
            <PreviewDetails
              name="LP Supply"
              value={
                lpInfo ? `${formatBigToNum(lpInfo?.totalSupply, lpInfo?.tokenDecimals)} ${description}` : description
              }
            />
            <PreviewDetails name="Dex Listed" value={lpInfo?.factory} />
          </>
        )}
      </div>
    </div>
  )
}
