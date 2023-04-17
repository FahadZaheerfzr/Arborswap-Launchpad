import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useModal } from 'react-simple-modal-provider'
import BackArrowSVG from '../../svgs/back_arrow'
import PreviewDetails from '../Common/PreviewDetails'
import PreviewHeader from '../Common/PreviewHeader'
import HeadingTags from './Subcomponents/HeadingTags'
import Datetime from 'react-datetime'
import CalendarSVG from '../../svgs/TokenLocker/calendar'
import { ThemeContext } from '../../context/ThemeContext/ThemeProvider'
import { formatUnits, isAddress } from 'ethers/lib/utils'
import { getTokenInfo } from '../../utils/tokenInfo'
import { formatBigToNum } from '../../utils/numberFormat'
import { useEthers } from '@usedapp/core'
import { getTokenBalance } from '../../utils/getTokenBalance'
import { BigNumber } from 'ethers'
import ErrorTags from './Subcomponents/ErrorTags'
import { getLpInfo } from 'utils/lpInfo'

export default function LockDetails({ setActive, setLockData, lockData, locker, initLockState }) {
  const [visible, setVisible] = useState(lockData.showDetails)
  const [formStatus, setFormStatus] = useState({
    isError: false,
    message: '',
  })
  const [enable, setEnable] = useState(lockData.isValid)
  const [address, setAddress] = useState(lockData.tokenAddress)
  const { theme } = useContext(ThemeContext)
  const { account } = useEthers()

  const { open: openAmountModal } = useModal('AmountModal')
  const { open: openLoadingModal, close: closeLoadingModal } = useModal('LoadingModal')

  const handleAddress = async (e) => {
    if (lockData.type === 'lptoken') {
      return handleLpAddress(e)
    }
    return handleTokenAddress(e)
  }

  const handleTokenAddress = async (e) => {
    setLockData((prevState) => ({
      ...prevState,
      ...initLockState,
    }))
    setFormStatus((prevState) => ({
      ...prevState,
      isError: false,
      message: '',
    }))

    setEnable(false)
    setVisible(false)
    setAddress(e.target.value)
    if (isAddress(e.target.value)) {
      openLoadingModal()
      const tokenInfo = await getTokenInfo(e.target.value)
      if (tokenInfo.success) {
        setLockData((prevState) => ({
          ...prevState,
          tokenAddress: e.target.value,
          tokenName: tokenInfo.data.name,
          tokenSymbol: tokenInfo.data.symbol,
          tokenDecimals: tokenInfo.data.decimals,
          tokenSupply: tokenInfo.data.totalSupply,
          showDetails: true,
          isValid: true,
        }))
        setVisible(true)
        setEnable(true)
      } else {
        setFormStatus((prevState) => ({
          ...prevState,
          isError: true,
          message: 'Not Valid ERC20 Token',
        }))
      }
      closeLoadingModal()
    } else {
      setLockData((prevState) => ({
        ...prevState,
        showDetails: false,
        isValid: false,
      }))
    }
  }

  const handleLpAddress = async (e) => {
    setLockData((prevState) => ({
      ...prevState,
      ...initLockState,
    }))
    setFormStatus((prevState) => ({
      ...prevState,
      isError: false,
      message: '',
    }))

    setEnable(false)
    setVisible(false)
    setAddress(e.target.value)
    if (isAddress(e.target.value)) {
      openLoadingModal()
      const tokenInfo = await getLpInfo(e.target.value)
      if (tokenInfo.success) {
        setLockData((prevState) => ({
          ...prevState,
          tokenAddress: e.target.value,
          tokenName: tokenInfo.data.name,
          tokenSymbol: tokenInfo.data.symbol,
          tokenDecimals: tokenInfo.data.decimals,
          tokenSupply: tokenInfo.data.totalSupply,
          factory: tokenInfo.data.factory,
          token0: {
            address: tokenInfo.data.token0.address,
            symbol: tokenInfo.data.token0.symbol,
          },
          token1: {
            address: tokenInfo.data.token1.address,
            symbol: tokenInfo.data.token1.symbol,
          },
          showDetails: true,
          isValid: true,
        }))
        setVisible(true)
        setEnable(true)
      } else {
        setFormStatus((prevState) => ({
          ...prevState,
          isError: true,
          message: 'Not Valid LP-Token Token',
        }))
      }
      closeLoadingModal()
    } else {
      setLockData((prevState) => ({
        ...prevState,
        showDetails: false,
        isValid: false,
      }))
    }
  }

  const handleChange = (e) => {
    setLockData((prevState) => ({
      ...prevState,
      unlockDate: e.unix(),
    }))
  }

  const handleLockAmount = (e) => {
    setLockData((prevState) => ({
      ...prevState,
      lockAmount: e,
    }))
  }

  const valid = (current) => {
    return current.isAfter(new Date())
  }

  useEffect(() => {
    getTokenBalance(account, lockData.tokenAddress).then((value) => {
      setLockData((prevState) => ({
        ...prevState,
        userBalance: value,
      }))
    })
  }, [account, lockData.tokenAddress, setLockData])

  const tokenSymbol = useMemo(() => {
    return lockData.type === 'lptoken' ? `${lockData.token0.symbol}/${lockData.token1.symbol}` : lockData.tokenSymbol
  }, [lockData])

  return (
    <div className={`w-full`}>
      <div className={`w-full flex flex-col`}>
        {locker ? <HeadingTags name={'Token Address'} required /> : <HeadingTags name={'LP Address'} required />}

        <input
          className="bg-transparent mt-5 w-full px-5 py-4 font-gilroy placeholder:font-medium placeholder:text-dim-text font-semibold text-dark-text dark:text-light-text focus:outline-none border-[1.5px] rounded-lg border-dim-text border-opacity-50"
          type={'text'}
          placeholder="0xc197033c129839ED4740c29919Bd88fD42bbde"
          onChange={(e) => {
            handleAddress(e)
          }}
          value={address}
        />
        {formStatus.isError ? <ErrorTags message={formStatus.message} /> : <></>}

        {visible && (
          <>
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
          </>
        )}
        {visible && (
          <>
            <PreviewHeader heading={'More Details'} />

            <div className="flex items-center mt-9">
              <HeadingTags name={'Amount to be locked'} required />
              {/*<Tooltip text={} /> */}
            </div>

            <div className="mt-5 flex items-center justify-between gap-5 cursor-pointer">
              <div className="flex items-center justify-between bg-[#FAF8F5] dark:bg-dark-2 px-5 py-4 rounded-md w-[75%]">
                <input
                  type="number"
                  className="w-[75%] font-bold text-dark-text dark:text-light-text"
                  value={lockData.lockAmount}
                  onChange={(e) => handleLockAmount(e.target.value)}
                />
                <span className="text-gray dark:text-gray-dark font-bold">{tokenSymbol}</span>
              </div>

              <button
                className="bg-primary-green bg-opacity-[0.08] font-bold text-primary-green py-4 w-[25%] rounded-md"
                onClick={() =>
                  openAmountModal({
                    amount: `${lockData.lockAmount}`,
                    balance: `${formatUnits(BigNumber.from(lockData.userBalance), lockData.tokenDecimals) * 1}`,
                    setAmount: handleLockAmount,
                  })
                }
              >
                Add
              </button>
            </div>
            {locker ? (
              <>
                <div className="flex items-center mt-9">
                  <HeadingTags name={'Token Logo'} required />
                  <img src="/images/lists/question.svg" alt="info" className="ml-2" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-5 cursor-pointer">
                  <div className="flex items-center justify-between bg-[#FAF8F5] dark:bg-dark-2 px-5 py-4 rounded-md w-[100%]">
                    <input
                      type="text"
                      placeholder="Input Valid image url here"
                      className="w-[100%] font-bold text-dark-text dark:text-light-text"
                      value={lockData.image}
                      onChange={(e) =>
                        setLockData((prevState) => ({
                          ...prevState,
                          image: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="flex items-center mt-9">
              <HeadingTags name={'Unlock Date'} required />
              <img src="/images/lists/question.svg" alt="info" className="ml-2" />
            </div>

            <div className="flex items-center mt-5 border-[1.5px] py-4 border-dim-text dark:border-dim-text-dark border-opacity-50 rounded-lg">
              <CalendarSVG className="ml-5 fill-gray dark:fill-gray-dark" />
              <Datetime
                className={`ml-5 font-gilroy font-semibold text-dark-text dark:text-light-text ${
                  theme === 'dark' ? 'dark-calendar' : ''
                }`}
                value={lockData.unlockDate * 1000}
                isValidDate={valid}
                onChange={handleChange}
                utc={true}
              />
            </div>
          </>
        )}

        <div className="mt-10">
          <div className="flex justify-end items-center mb-10">
            {locker && (
              <button
                className="bg-white dark:bg-transparent mr-5 flex items-center gap-2 py-[10px] px-5"
                onClick={() =>
                  setLockData((prevState) => ({
                    ...prevState,
                    showLanding: true,
                  }))
                }
              >
                <BackArrowSVG className="fill-dark-text dark:fill-light-text" />
                <span className="font-gilroy font-medium text-sm text-dark-text dark:text-light-text">Go Back</span>
              </button>
            )}

            <button
              className="bg-primary-green hover:opacity-40 disabled:bg-light-text text-white font-gilroy font-bold px-8 py-3 rounded-md"
              disabled={!enable}
              onClick={() => setActive('Preview')}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
