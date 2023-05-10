import { Contract } from "ethers"
import PrivateSaleErcAbi from 'config/abi/PrivateSaleErcAbi.json'

import { useCall, useEthers } from "@usedapp/core"

function usePrivateErcSaleInfo(saleAddress) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PrivateSaleErcAbi),
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

export default usePrivateErcSaleInfo
