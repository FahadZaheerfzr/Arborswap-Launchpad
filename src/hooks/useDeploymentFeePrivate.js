import { Contract } from "ethers";
import PrivateAbi from "../constants/abi/PrivateAbi.json";
import { useCall} from "@usedapp/core";
import { Private_FACTORYADRESS} from "config/constants/LaunchpadAddress";

function useDeploymentFeePrivate() {
    const { value, error } =
        useCall({
        contract: new Contract(Private_FACTORYADRESS, PrivateAbi),
        method: "fee",
        args: [],
        }) ?? {};
    if (error) {
        // console.log(error)
        return error;
    }
    return value?.[0];
    }

export default useDeploymentFeePrivate;