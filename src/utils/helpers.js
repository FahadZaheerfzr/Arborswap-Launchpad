import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export const tokenRate = (value, decimals) => {
    const Decimal = parseUnits("1", decimals);
    const bnbRate = parseUnits("1", "18")
    return bnbRate.mul(Decimal).div(value).div(bnbRate)
}