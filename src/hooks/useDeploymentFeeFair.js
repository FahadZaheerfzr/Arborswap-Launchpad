import { Contract } from "ethers";
import FairAbi from "../constants/abi/FairAbi.json";
import { useCall} from "@usedapp/core";
import { FairLaunch_FACTORYADRESS} from "constants/Address";

function useDeploymentFeeFair() {
    const { value, error } =
        useCall({
        contract: new Contract(FairLaunch_FACTORYADRESS, FairAbi),
        method: "fee",
        args: [],
        }) ?? {};
    if (error) {
        // console.log(error)
        return error;
    }
    return value?.[0];
    }

export default useDeploymentFeeFair;