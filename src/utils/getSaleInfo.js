import PublicSaleAbi from "config/abi/PublicSale.json";
import Web3 from "web3";

async function getSaleInfo(saleAddress) {
  try {
    console.log(saleAddress, "saleAddress")
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const contract = new web3.eth.Contract(PublicSaleAbi, saleAddress);
    const sale = await contract.methods.sale().call();
    return sale;
  } catch (err) {
    console.log(err);
  }
}

export default getSaleInfo;
