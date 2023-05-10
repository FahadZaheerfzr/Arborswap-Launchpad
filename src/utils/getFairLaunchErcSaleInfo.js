import { Contract } from "ethers"
import FairlaunchSaleAbi from 'config/abi/FairlaunchErcAbi.json'

import { useCall, useEthers } from "@usedapp/core"

function useFairlaunchErcSaleInfo(saleAddress) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, FairlaunchSaleAbi),
        method: "sale",
        args: [],
      },
      {
        refresh: "never",
      }
    ) ?? {}
  if (error) {
    // console.log(error)
    return error
  }
  return value
}

export default useFairlaunchErcSaleInfo
