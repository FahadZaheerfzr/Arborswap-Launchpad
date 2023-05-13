import { Contract } from "@ethersproject/contracts"
import PublicAbi from '../config/abi/PublicLaunchpadAbi.json';
import PrivateAbi from '../config/abi/PrivateLaunchpadAbi.json';
import FairAbi from '../config/abi/FairLaunchpadAbi.json';
import PublicErcAbi from '../config/abi/PublicLaunchErcAbi.json';
import PrivateErcAbi from '../config/abi/PrivateLaunchErcAbi.json';
import FairErcAbi from '../config/abi/FairErcAbi.json';
import { Public_FACTORYADRESS, ROUTER_ADDRESS, ADMIN_ADDRESS, Private_FACTORYADRESS, FairLaunch_FACTORYADRESS, USDT_ADDRESS, GUSD_ADDRESS, RBA_ADDRESS, PublicErc_FACTORYADRESS, PrivateErc_FACTORYADRESS, FairLaunchErc_FACTORYADRESS } from 'config/constants/LaunchpadAddress';
import { parseEther, parseUnits } from 'ethers/lib/utils';
import { ethers, utils } from "ethers"
import ERCAbi from '../config/abi/ERC20.json';

export const approveTokens = async (library, token, factoryContractAddress) => {
  const contract = new Contract(
    token.tokenAddress,
    ERCAbi,
    library.getSigner()
  )

  const amount = ethers.constants.MaxUint256


  try {

    const approval = await contract.approve(factoryContractAddress, amount)

    await approval.wait()
  } catch (error) {

    return false
  }
  return true
}


export const deployPublicSale = async (token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal) => {
  const contract = new Contract(
    Public_FACTORYADRESS,
    PublicAbi,
    library.getSigner()
  )

  const saleId = await contract.getNumberOfSalesDeployed()

  console.log(contract)
  const routerAddress = ROUTER_ADDRESS
  const adminAddress = ADMIN_ADDRESS
  // 2nd - with uints [minParticipation, maxParticipation, lp%, dex listing rate,lpLockPeriod, saleEnd, saleStart, hardCap(tokens), softCap(bnb)]
console.log([routerAddress, adminAddress, token.tokenAddress, account]);

console.log([
  parseEther(saleObject.minAllocation.toString()).toString(),
  parseEther(saleObject.maxAllocation.toString()).toString(),
  (saleObject.amountLiquidity * 100).toString(),
  parseUnits(saleObject.listing.toString(), token.tokenDecimals).toString(),
  (saleObject.lockup * 86400).toString(),
  parseUnits(saleObject.presalePrice.toString(), token.tokenDecimals).toString(),
  saleObject.endDate,
  saleObject.startDate,
  parseEther(saleObject.hardCap.toString()).toString(),
  parseEther(saleObject.softCap.toString()).toString()
])
console.log({ value: utils.parseEther(deploymentFee) })
  try {
    const tx = await contract.deployNormalSale(
      [routerAddress, adminAddress, token.tokenAddress, "0x5317a31c1ded3f7e86e6c97578507e679cf7b734"],
      [
        parseEther(saleObject.minAllocation.toString()).toString(),
        parseEther(saleObject.maxAllocation.toString()).toString(),
        (saleObject.amountLiquidity * 100).toString(),
        parseUnits(saleObject.listing.toString(), token.tokenDecimals).toString(),
        (saleObject.lockup * 86400).toString(),
        parseUnits(saleObject.presalePrice.toString(), token.tokenDecimals).toString(),
        saleObject.endDate,
        saleObject.startDate,
        parseEther(saleObject.hardCap.toString()).toString(),
        parseEther(saleObject.softCap.toString()).toString()
      ],
      true,
      { value: utils.parseEther(deploymentFee) }
    )
    const deployedAddressInitial = await tx.wait()
    console.log(tx);
    console.log(deployedAddressInitial);

    const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())


    const finalSaleObject = {
      saleId: saleId.toNumber(),
      saleAddress: deployedAddress,
      saleType: saleData.type,
      github: saleData.github,
      website: saleData.website,
      twitter: saleData.twitter,
      linkedin: saleData.linkedin,
      image: saleData.image,
      name: saleData.name,
      description: saleData.description,
      tags: saleData.tags,
      token: token,
      minAllocation: saleObject.minAllocation,
      maxAllocation: saleObject.maxAllocation,
      amountLiquidity: saleObject.amountLiquidity,
      listing: saleObject.listing,
      lockup: saleObject.lockup,
      presalePrice: saleObject.presalePrice,
      endDate: saleObject.endDate,
      startDate: saleObject.startDate,
      hardCap: saleObject.hardCap,
      softCap: saleObject.softCap,
      unsoldToken: saleObject.unsoldToken,
      currency: saleObject.currency,
      dex: saleObject.dex,
      whiteisting: saleObject.whiteisting,
      owner: account,
      isFinished: false,
    }


    return finalSaleObject
  } catch (error) {
    console.log(error);
    alert("Transaction Failed")
    closeLoadingModal()
  }
}

export const deployPublicSaleERC = async (token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal) => {
  const contract = new Contract(
    PublicErc_FACTORYADRESS,
    PublicErcAbi,
    library.getSigner()
  )
  const saleId = await contract.getNumberOfSalesDeployed()


  const routerAddress = ROUTER_ADDRESS
  const adminAddress = ADMIN_ADDRESS
  let PaymentToken = ""
  if (saleObject.currency.name === "Tether") {
    PaymentToken = USDT_ADDRESS
  } else if (saleObject.currency.name === "Gnosis") {
    PaymentToken = GUSD_ADDRESS
  } else if (saleObject.currency.name === "Roburna") {
    PaymentToken = RBA_ADDRESS
  }

  // 2nd - with uints [minParticipation, maxParticipation, lp%, dex listing rate,lpLockPeriod, saleEnd, saleStart, hardCap(tokens), softCap(bnb)]

  try {
    const tx = await contract.deployERC20Sale(
      [routerAddress, adminAddress, token.tokenAddress, account, PaymentToken],
      [
        parseEther(saleObject.minAllocation.toString()).toString(),
        parseEther(saleObject.maxAllocation.toString()).toString(),
        (saleObject.amountLiquidity * 100).toString(),
        parseUnits(saleObject.listing.toString(), token.tokenDecimals).toString(),
        (saleObject.lockup * 86400).toString(),
        parseUnits(saleObject.presalePrice.toString(), token.tokenDecimals).toString(),
        saleObject.endDate,
        saleObject.startDate,
        parseEther(saleObject.hardCap.toString()).toString(),
        parseEther(saleObject.softCap.toString()).toString()
      ],
      { value: utils.parseEther(deploymentFee) }
    )
    await tx.wait()

    const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())


    const finalSaleObject = {
      saleId: saleId.toNumber(),
      saleAddress: deployedAddress,
      saleType: saleData.type,
      github: saleData.github,
      website: saleData.website,
      twitter: saleData.twitter,
      linkedin: saleData.linkedin,
      image: saleData.image,
      name: saleData.name,
      description: saleData.description,
      tags: saleData.tags,
      token: token,
      minAllocation: saleObject.minAllocation,
      maxAllocation: saleObject.maxAllocation,
      amountLiquidity: saleObject.amountLiquidity,
      listing: saleObject.listing,
      lockup: saleObject.lockup,
      presalePrice: saleObject.presalePrice,
      endDate: saleObject.endDate,
      startDate: saleObject.startDate,
      hardCap: saleObject.hardCap,
      softCap: saleObject.softCap,
      unsoldToken: saleObject.unsoldToken,
      currency: saleObject.currency,
      dex: saleObject.dex,
      whiteisting: saleObject.whiteisting,
      owner: account,
      isFinished: false,
    }


    return finalSaleObject
  } catch (error) {
    alert("Transaction Failed")
    closeLoadingModal()
  }
}



export const deployPrivateSale = async (token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal) => {
  const contract = new Contract(
    Private_FACTORYADRESS,
    PrivateAbi,
    library.getSigner()
  );
  const adminAddress = ADMIN_ADDRESS;


  const saleId = await contract.getNumberOfSalesDeployed()

  try {
    const tx = await contract.deployNormalPrivateSale(
      [adminAddress, account],
      [
        parseEther(Number(saleObject.minAllocation).toString()).toString(),
        parseEther(Number(saleObject.maxAllocation).toString()).toString(),
        saleObject.endDate,
        saleObject.startDate,
        parseEther(Number(saleObject.hardCap).toString()).toString(),
        parseEther(Number(saleObject.softCap).toString()).toString(),
      ],
      { value: utils.parseEther(deploymentFee) }
    );
    await tx.wait();


    const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())

    const finalSaleObject = {
      saleId: saleId.toNumber(),
      saleAddress: deployedAddress,
      saleType: saleData.type,
      github: saleData.github,
      website: saleData.website,
      twitter: saleData.twitter,
      linkedin: saleData.linkedin,
      image: saleData.image,
      name: saleData.name,
      description: saleData.description,
      tags: saleData.tags,
      token: token,
      firstRelease: saleObject.firstRelease,
      minAllocation: saleObject.minAllocation,
      maxAllocation: saleObject.maxAllocation,
      endDate: saleObject.endDate,
      startDate: saleObject.startDate,
      hardCap: saleObject.hardCap,
      softCap: saleObject.softCap,
      currency: saleObject.currency,
      dex: saleObject.dex,
      whiteisting: saleObject.whiteisting,
      owner: account,
      isFinished: false,
    }

    return finalSaleObject
  } catch (error) {
    alert("Transaction Failed")
    closeLoadingModal()

  }
};

export const deployPrivateErSale = async (token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal) => {
  const contract = new Contract(
    PrivateErc_FACTORYADRESS,
    PrivateErcAbi,
    library.getSigner()
  );
  const adminAddress = ADMIN_ADDRESS;
  const routerAddress = ROUTER_ADDRESS;
  let PaymentToken = ""
  if (saleObject.currency.name === "Tether") {
    PaymentToken = USDT_ADDRESS
  } else if (saleObject.currency.name === "Gnosis") {
    PaymentToken = GUSD_ADDRESS
  } else if (saleObject.currency.name === "Roburna") {
    PaymentToken = RBA_ADDRESS
  }

  const saleId = await contract.getNumberOfSalesDeployed()

  try {
    const tx = await contract.deployPrivateSaleERC20(
      [routerAddress, adminAddress, token.tokenAddress, account, PaymentToken],
      [
        parseEther(saleObject.minAllocation.toString()).toString(),
        parseEther(saleObject.maxAllocation.toString()).toString(),
        saleObject.endDate,
        saleObject.startDate,
        parseEther(saleObject.hardCap.toString()).toString(),
        parseEther(saleObject.softCap.toString()).toString(),
      ],
      { value: utils.parseEther(deploymentFee) }
    )
    await tx.wait()

    const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())


    const finalSaleObject = {
      saleId: saleId.toNumber(),
      saleAddress: deployedAddress,
      saleType: saleData.type,
      github: saleData.github,
      website: saleData.website,
      twitter: saleData.twitter,
      linkedin: saleData.linkedin,
      image: saleData.image,
      name: saleData.name,
      description: saleData.description,
      tags: saleData.tags,
      token: token,
      firstRelease: saleObject.firstRelease,
      minAllocation: saleObject.minAllocation,
      maxAllocation: saleObject.maxAllocation,
      endDate: saleObject.endDate,
      startDate: saleObject.startDate,
      hardCap: saleObject.hardCap,
      softCap: saleObject.softCap,
      currency: saleObject.currency,
      dex: saleObject.dex,
      whiteisting: saleObject.whiteisting,
      owner: account,
      isFinished: false,
    }

    return finalSaleObject
  } catch (error) {
    alert("Transaction Failed")
    closeLoadingModal()
  }
};


export const deployFairLaunchSale = async (token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal) => {
  const contract = new Contract(
    FairLaunch_FACTORYADRESS,
    FairAbi,
    library.getSigner()
  );
  const adminAddress = ADMIN_ADDRESS;
  const routerAddress = ROUTER_ADDRESS;

  const saleId = await contract.getNumberOfSalesDeployed()

  try {
    const tx = await contract.deployFairLaunchSale(
      [routerAddress, adminAddress, token.tokenAddress, account],
      [
        parseEther(Number(saleObject.minAllocation).toString()).toString(),
        parseEther(Number(saleObject.maxAllocation).toString()).toString(),
        (saleObject.amountLiquidity * 100).toString(),
        (saleObject.lockup * 86400).toString(),
        saleObject.startDate,
        saleObject.endDate,
        parseEther(Number(saleObject.hardCap).toString()).toString(),
        parseEther(Number(saleObject.softCap).toString()).toString(),
      ],
      { value: utils.parseEther(deploymentFee) }
    );
    await tx.wait();


    const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())

    const finalSaleObject = {
      saleId: saleId.toNumber(),
      saleAddress: deployedAddress,
      saleType: saleData.type,
      github: saleData.github,
      website: saleData.website,
      twitter: saleData.twitter,
      linkedin: saleData.linkedin,
      image: saleData.image,
      name: saleData.name,
      description: saleData.description,
      tags: saleData.tags,
      token: token,
      minAllocation: saleObject.minAllocation,
      maxAllocation: saleObject.maxAllocation,
      amountLiquidity: saleObject.amountLiquidity,
      lockup: saleObject.lockup,
      startDate: saleObject.startDate,
      endDate: saleObject.endDate,
      hardCap: saleObject.hardCap,
      softCap: saleObject.softCap,
      currency: saleObject.currency,
      owner: account,
      isFinished: false,
    }

    return finalSaleObject
  } catch (error) {
    alert("Transaction Failed")
    closeLoadingModal()
  }
};

export const deployFairLaunchSaleERC20 = async (token, saleObject, library, account, deploymentFee, saleData, closeLoadingModal) => {
  const contract = new Contract(
    FairLaunchErc_FACTORYADRESS,
    FairErcAbi,
    library.getSigner()
  );
  const adminAddress = ADMIN_ADDRESS;
  const routerAddress = ROUTER_ADDRESS;
  let PaymentToken = ""
  if (saleObject.currency.name === "Tether") {
    PaymentToken = USDT_ADDRESS
  } else if (saleObject.currency.name === "Gnosis") {
    PaymentToken = GUSD_ADDRESS
  }
  else if (saleObject.currency.name === "Roburna") {
    PaymentToken = RBA_ADDRESS
  }

  const saleId = await contract.getNumberOfSalesDeployed()

  try {
    const tx = await contract.deployFairLaunchSaleERC20(
      [routerAddress, adminAddress, token.tokenAddress, account, PaymentToken],
      [
        parseEther(Number(saleObject.minAllocation).toString()).toString(),
        parseEther(Number(saleObject.maxAllocation).toString()).toString(),
        (saleObject.amountLiquidity * 100).toString(),
        (saleObject.lockup * 86400).toString(),
        saleObject.startDate,
        saleObject.endDate,
        parseEther(Number(saleObject.hardCap).toString()).toString(),
        parseEther(Number(saleObject.softCap).toString()).toString(),
      ],
      { value: utils.parseEther(deploymentFee) }
    );
    await tx.wait();


    const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())

    const finalSaleObject = {
      saleId: saleId.toNumber(),
      saleAddress: deployedAddress,
      saleType: saleData.type,
      github: saleData.github,
      website: saleData.website,
      twitter: saleData.twitter,
      linkedin: saleData.linkedin,
      image: saleData.image,
      name: saleData.name,
      description: saleData.description,
      tags: saleData.tags,
      token: token,
      minAllocation: saleObject.minAllocation,
      maxAllocation: saleObject.maxAllocation,
      amountLiquidity: saleObject.amountLiquidity,
      lockup: saleObject.lockup,
      startDate: saleObject.startDate,
      endDate: saleObject.endDate,
      hardCap: saleObject.hardCap,
      softCap: saleObject.softCap,
      currency: saleObject.currency,
      owner: account,
      isFinished: false,
    }

    return finalSaleObject
  }
  catch (error) {
    alert("Transaction Failed")
    closeLoadingModal()
  }
};


