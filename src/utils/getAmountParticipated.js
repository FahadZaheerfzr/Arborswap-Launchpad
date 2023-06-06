import PublicSaleAbi from "config/abi/PublicSale.json";
import Web3 from "web3";
//public
async function getAmountParticipated(saleAddress) {
  const web3 = new Web3(window.ethereum);
  const account = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(PublicSaleAbi, saleAddress);
  try { 
    console.log(saleAddress,"saleAddress", account,"account")
    const amount = await contract.methods.userToParticipation(account[0]).call();
    return amount;
  } catch (err) {
    console.log(err);
  }
}

export default getAmountParticipated;
