import { Contract } from "ethers";
import PublicSaleAbi from "config/abi/PublicSale.json";

import { useCall, useEthers } from "@usedapp/core";

//public
function useIsFinished(saleAddress) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PublicSaleAbi),
        method: "saleFinished",
        args: [],
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

export default useIsFinished;
