import { Contract } from "ethers"
import PublicSaleErcAbi from 'config/abi/PublicSaleErcAbi.json'

import { useCall, useEthers } from "@usedapp/core"

function usePublicErcSaleInfo(saleAddress) {
    // console.log("saleAddress", saleAddress)
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PublicSaleErcAbi),
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

export default usePublicErcSaleInfo
