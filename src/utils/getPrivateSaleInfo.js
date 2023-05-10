import { Contract } from "ethers"
import PrivateSaleAbi from 'config/abi/PrivateSale.json'

import { useCall, useEthers } from "@usedapp/core"

function usePrivateSaleInfo(saleAddress) {
    // console.log("saleAddress", saleAddress)
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PrivateSaleAbi),
        method: "sale",
        args: [],
      },
      {
        refresh: "never",
      }
    ) ?? {}
  if (error) {
    console.log(error)
    return error
  }
//   console.log("value", value)
  return value
}

export default usePrivateSaleInfo
