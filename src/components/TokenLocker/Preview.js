import React, { useEffect, useMemo, useState } from 'react'
import { useModal } from 'react-simple-modal-provider'
import { useNavigate } from 'react-router-dom'

import BackArrowSVG from '../../svgs/back_arrow'
import PreviewDetails from '../Common/PreviewDetails'
import PreviewHeader from '../Common/PreviewHeader'
import { formatBigToNum } from '../../utils/numberFormat'
import { FACTORY_ADDRESS } from '../../config/constants/address'
import { ethers } from 'ethers'
import { useEthers, useTokenAllowance, useTokenBalance } from '@usedapp/core'
import { parseUnits } from 'ethers/lib/utils'
import { Contract } from '@ethersproject/contracts'
import ERCAbi from 'config/abi/ERC20.json'
import LockFactoryAbi from 'config/abi/LockFactory.json'
import useFeeInfo from 'hooks/useFeeInfo'

export default function Preview({ locker, setActive, lockData }) {
  const navigate = useNavigate()
  const [date, setDate] = useState()
  const [days, setDays] = useState(0)

  const { account, library, chainId } = useEthers()

  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')
  const feeInfo = useFeeInfo()
  const allowance = useTokenAllowance(lockData.tokenAddress, account, FACTORY_ADDRESS[chainId], {
    refresh: 5,
  })
  const balance = useTokenBalance(lockData.tokenAddress, account, {
    refresh: 5,
  })
  const amountLock = useMemo(() => {
    if (typeof lockData.lockAmount === 'string') {
      return parseUnits(lockData.lockAmount, lockData.tokenDecimals)
    }
    return parseUnits(lockData.lockAmount.toString(), lockData.tokenDecimals)
  }, [lockData.lockAmount, lockData.tokenDecimals])

  useEffect(() => {
    if (lockData.unlockDate) {
      const date = new Date(lockData.unlockDate * 1000)
      setDate(date.toLocaleDateString())
      setDays(Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)))
    }
  }, [lockData.unlockDate])

  const needApprove = useMemo(() => {
    if (typeof allowance === 'undefined') {
      return true
    }
    return amountLock.gt(allowance)
  }, [amountLock, allowance])

  const isValid = useMemo(() => {
    if (typeof balance === 'undefined') {
      return true
    }
    return !needApprove && balance.gt(amountLock)
  }, [amountLock, needApprove, balance])

  const handleApprove = async () => {
    openLoadingModal()
    const contract = new Contract(lockData.tokenAddress, ERCAbi, library.getSigner())
    try {
      const approval = await contract.approve(FACTORY_ADDRESS[chainId], ethers.constants.MaxUint256)
      await approval.wait()
    } catch (error) {}
    closeLoadingModal()
  }

  const handleLockToken = async () => {
    openLoadingModal()
    const contract = new Contract(FACTORY_ADDRESS[chainId], LockFactoryAbi, library.getSigner())
    try {
      const createLock = await contract.createTokenLock(
        account,
        lockData.tokenAddress,
        amountLock,
        lockData.unlockDate,
        lockData.image,
        {
          value: feeInfo.normalFee,
        },
      )
      await createLock.wait()
      closeLoadingModal()
      navigate(`/locked-assets`)
      return
    } catch (error) {
      closeLoadingModal()
      return false
    }
  }

  const handleLockLP = async () => {
    openLoadingModal()
    const contract = new Contract(FACTORY_ADDRESS[chainId], LockFactoryAbi, library.getSigner())
    try {
      const createLock = await contract.createLiquidityLock(
        account,
        lockData.tokenAddress,
        amountLock,
        lockData.unlockDate,
        '',
        {
          value: feeInfo.liquidityFee,
        },
      )
      await createLock.wait()
      closeLoadingModal()
      navigate(`/locked-assets`)
      return
    } catch (error) {
      closeLoadingModal()
      return false
    }
  }
  const tokenSymbol = useMemo(() => {
    return lockData.type === 'lptoken' ? `${lockData.token0.symbol}/${lockData.token1.symbol}` : lockData.tokenSymbol
  }, [lockData])

  return (
    <div className="-mt-10">
      {locker ? <PreviewHeader heading={'Token address Details'} /> : <PreviewHeader heading={'LP Details'} />}

      <div className="flex flex-col">
        {locker ? (
          <>
            <PreviewDetails name="Name" value={lockData.tokenName} />
            <PreviewDetails name="Symbol" value={lockData.tokenSymbol} />
            <PreviewDetails name="Decimals" value={lockData.tokenDecimals} />
            <PreviewDetails
              name="Total Supply"
              value={`${formatBigToNum(lockData.tokenSupply, lockData.tokenDecimals)} ${lockData.tokenSymbol}`}
            />
          </>
        ) : (
          <>
            <PreviewDetails name="Quote Pair" value={lockData.token0.symbol} />
            <PreviewDetails name="Base Pair" value={lockData.token1.symbol} />
            <PreviewDetails name="Symbol" value={tokenSymbol} />
            <PreviewDetails
              name="LP Supply"
              value={`${formatBigToNum(lockData.tokenSupply, lockData.tokenDecimals)} ${tokenSymbol}`}
            />
            <PreviewDetails name="Dex Listed" value={lockData.factory} />
          </>
        )}
      </div>

      <PreviewHeader heading={'Lock Details'} />

      <div className="flex flex-col">
        <PreviewDetails name={'Amount to be Locked'} value={`${lockData.lockAmount.toLocaleString()} ${tokenSymbol}`} />
        <PreviewDetails name={'Lock Period (Days)'} value={days} />
        <PreviewDetails name={'Unlock Date'} value={date} />
      </div>

      <div className="mt-10">
        <div className="flex justify-end items-center mb-10">
          <button
            className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
            onClick={() => setActive('Lock details')}
          >
            <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
            <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
          </button>
          {needApprove ? (
            <>
              <button
                className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
                onClick={handleApprove}
              >
                Approve Token
              </button>
            </>
          ) : locker ? (
            <>
              <button
                disabled={!isValid}
                className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
                onClick={handleLockToken}
              >
                Lock Token
              </button>
            </>
          ) : (
            <>
              <button
                disabled={!isValid}
                className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
                onClick={handleLockLP}
              >
                Lock LP Token
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
