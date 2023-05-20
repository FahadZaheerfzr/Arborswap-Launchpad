import { Contract } from "ethers";
import PublicAbi from '../config/abi/PublicLaunchpadAbi.json';
import { Public_FACTORYADRESS } from "config/constants/LaunchpadAddress";

import { useCall } from "@usedapp/core";
import { parseEther } from "ethers/lib/utils";

function useCalcMax(hardcap, tokenPrice, listingPrice, tokenDecimals) {
    console.log(hardcap, tokenPrice, listingPrice, tokenDecimals, "useCalcMax")
  const { value, error } =
    useCall(
      {
        contract: new Contract(Public_FACTORYADRESS, PublicAbi),
        method: "calculateMaxTokensForLiquidity",
        args: [
            parseEther(hardcap.toString()).toString(),
            parseEther(tokenPrice.toString()).toString(),
            parseEther(listingPrice.toString()).toString(),
            tokenDecimals,
        ],
      },
      {
        refresh: "never",
      }
    ) ?? {};
  if (error) {
    console.log(error)
    return error;
  }
  // console.log("sale info", value)
  return value;
}


export default useCalcMax;
