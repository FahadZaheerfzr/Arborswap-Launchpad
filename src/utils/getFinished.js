import { Contract } from "ethers";
import PublicSaleAbi from "config/abi/PublicSale.json";

import Web3 from "web3";
//public
async function getIsFinished(saleAddress) {
  try {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract = new web3.eth.Contract(PublicSaleAbi, saleAddress);
    const isFinished = await contract.methods.saleFinished().call();
    console.log(isFinished, "isFinished")
    return isFinished;
  } catch (err) {
    console.log(err);
  }
}


 
export default getIsFinished;
