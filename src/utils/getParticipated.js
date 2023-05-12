import { Contract } from "ethers";
import PublicSaleAbi from "config/abi/PublicSale.json";

import { useCall, useEthers } from "@usedapp/core";

//public
function useParticipated(saleAddress,account) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PublicSaleAbi),
        method: "isParticipated",
        args: [account],
      },
      {
        refresh: "never",
      }
    ) ?? {};
  if (error) {
    // console.log(error)
    return error;
  }
  return value;
}

export default useParticipated;
