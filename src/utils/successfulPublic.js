import { Contract } from "ethers";
import PublicSaleAbi from "config/abi/PublicSale.json";

import Web3 from "web3";
//public
async function getSuccessPublic(saleAddress) {
  try {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract = new web3.eth.Contract(PublicSaleAbi, saleAddress);
    const success = await contract.methods.isSaleSuccessful().call();
    console.log(success, "success")
    return success;
  } catch (err) {
    console.log(err);
  }
}
  

export default getSuccessPublic;
