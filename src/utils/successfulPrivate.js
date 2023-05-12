import { Contract } from "ethers";
import PrivateSaleAbi from 'config/abi/PrivateSale.json'

import { useCall, useEthers } from "@usedapp/core";

//public
function useSuccessPrivate(saleAddress) {
  const { value, error } =
    useCall(
      {
        contract: new Contract(saleAddress, PrivateSaleAbi),
        method: "isSaleSuccessful",
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

export default useSuccessPrivate;
