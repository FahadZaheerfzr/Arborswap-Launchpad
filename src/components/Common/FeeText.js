import React, { useMemo } from 'react'
import { formatEther } from 'ethers/lib/utils'
import useFeeInfo from 'hooks/useFeeInfo'

export default function FeeText({ type }) {
  const feeInfo = useFeeInfo()

  const selectedFee = useMemo(() => {
    if (typeof feeInfo === 'undefined') {
      return ''
    }
    let fee = feeInfo.normalFee

    if (type === 'lptoken') {
      fee = feeInfo?.normalFee
    }
    return (formatEther(fee) * 1).toLocaleString()
  }, [feeInfo, type])

  return <>{selectedFee}</>
}
