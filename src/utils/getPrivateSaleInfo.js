import { Contract } from "ethers"
import PublicSale from 'config/abi/PublicSale.json'

import { useCall, useEthers } from "@usedapp/core"

function usePrivateSaleInfo(saleAddress) {
    // console.log("saleAddress", saleAddress)
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PublicSale),
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
