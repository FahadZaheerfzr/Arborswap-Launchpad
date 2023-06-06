import PublicAbi from '../config/abi/PublicLaunchpadAbi.json';
import { Public_FACTORYADRESS } from "config/constants/LaunchpadAddress";
import Web3 from 'web3';
import { parseEther, parseUnits } from 'ethers/lib/utils';



async function getCalcMax(saleObject,token) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(PublicAbi, Public_FACTORYADRESS);
    try{
        const calcMax = await contract.methods.calculateMaxTokensForLiquidity(
          parseEther(saleObject.hardCap.toString()).toString(),
          (saleObject.amountLiquidity * 100).toString(),
          parseUnits(saleObject.listing.toString(), token.tokenDecimals).toString(),
        ).call();
        console.log(calcMax, "calcMax")
          return calcMax;
    }
    catch(err){
        console.log(err)
    }
}


export default getCalcMax;
