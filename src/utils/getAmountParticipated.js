import { Contract } from "ethers";
import PublicSaleAbi from "config/abi/PublicSale.json";

import { useCall, useEthers } from "@usedapp/core";

//public
function useAmountParticipated(saleAddress,account) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PublicSaleAbi),
        method: "userToParticipation",
        args: [account],
      },
      {
        refresh: "never",
      }
    ) ?? {};
  if (error) {
    return error;
  }
  return value;
}

export default useAmountParticipated;
