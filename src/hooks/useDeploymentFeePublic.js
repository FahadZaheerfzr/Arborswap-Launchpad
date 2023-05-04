import { Contract } from "ethers";
import PublicAbi from '../constants/abi/PublicAbi.json';
import { useCall } from "@usedapp/core";
import {Public_FACTORYADRESS } from "constants/Address";

function useDeploymentFeePublic() {
    const { value, error } =
        useCall({
        contract: new Contract(Public_FACTORYADRESS, PublicAbi),
        method: "fee",
        args: [],
        }) ?? {};
    if (error) {
        // console.log(error)
        return error;
    }
    return value?.[0];
    }

export default useDeploymentFeePublic;