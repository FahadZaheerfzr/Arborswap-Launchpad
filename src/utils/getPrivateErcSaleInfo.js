import { Contract } from "ethers"
import PublicSaleAbi from 'config/abi/PublicSaleErcAbi.json'

import { useCall, useEthers } from "@usedapp/core"

function usePrivateErcSaleInfo(saleAddress) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PublicSaleAbi),
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
