import { Contract } from "ethers"
import PublicAirdropAbi from '../config/abi/PublicAirdropAbi.json'

import { useCall } from "@usedapp/core"


function useIsOwner(airdropAddress, account) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(airdropAddress, PublicAirdropAbi),
        method: "isOwner",
        args: [account],
      },
      {
        refresh: "everyBlock",
      }
    ) ?? {}
  if (error) {
    //  // 
    return false
  }
  return value?.[0]
}

export default useIsOwner