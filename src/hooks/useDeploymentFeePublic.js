import { Contract } from "ethers";
import PublicAbi from '../config/abi/PublicLaunchpadAbi.json';
import { useCall } from "@usedapp/core";
import {Public_FACTORYADRESS } from "config/constants/LaunchpadAddress";

function useDeploymentFeePublic() {
    const { value, error } =
        useCall({
        contract: new Contract(Public_FACTORYADRESS, PublicAbi),
        method: "fee",
        args: [],
        }) ?? {};
    if (error) {
        // 
        return error;
    }
    return value?.[0];
    }

export default useDeploymentFeePublic;