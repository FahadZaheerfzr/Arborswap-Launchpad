import { Contract } from "@ethersproject/contracts"
import PublicAbi from '../config/abi/PublicLaunchpadAbi.json';
import PrivateAbi from '../config/abi/PrivateLaunchpadAbi.json';
import { Public_FACTORYADRESS,ROUTER_ADDRESS,ADMIN_ADDRESS, Private_FACTORYADRESS } from 'config/constants/LaunchpadAddress';
import { parseEther,  parseUnits} from 'ethers/lib/utils';
import { ethers, utils } from "ethers"
import ERCAbi from '../config/abi/ERC20.json';

export const approveTokens = async (library, token, factoryContractAddress) => {
  const contract = new Contract(
    token.tokenAddress,
    ERCAbi,
    library.getSigner()
  )

  const amount = ethers.constants.MaxUint256
  console.log(`amount`, amount)

  try {
    console.log(`factoryContractAddress`, factoryContractAddress);
    const approval = await contract.approve(factoryContractAddress, amount)

    await approval.wait()
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}


export const deployPublicSale = async (token, saleObject, library, account, deploymentFee, saleData) => {
    const contract = new Contract(
      Public_FACTORYADRESS,
      PublicAbi,
      library.getSigner()
    )

    const saleId = await contract.getNumberOfSalesDeployed()


    const routerAddress = ROUTER_ADDRESS
    const adminAddress = ADMIN_ADDRESS
    // 2nd - with uints [minParticipation, maxParticipation, lp%, dex listing rate,lpLockPeriod, saleEnd, saleStart, hardCap(tokens), softCap(bnb)]
    
    try {
      const tx = await contract.deployNormalSale(
          [routerAddress,adminAddress,token.tokenAddress,account],
          [
            parseEther(saleObject.minAllocation.toString()).toString(),
            parseEther(saleObject.maxAllocation.toString()).toString(),
            (saleObject.amountLiquidity * 100).toString(),
            parseUnits(saleObject.listing.toString(),token.tokenDecimals).toString(),
            (saleObject.lockup * 86400).toString(),
            parseUnits(saleObject.presalePrice.toString(),token.tokenDecimals).toString(),
            saleObject.endDate,
            saleObject.startDate,
            parseEther(saleObject.hardCap.toString()).toString(),
            parseEther(saleObject.softCap.toString()).toString()
          ],
          { value: utils.parseEther(deploymentFee) }
      )
      await tx.wait()

      const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())
      console.log("Sale deployed")

      const finalSaleObject ={
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
      }

      return finalSaleObject
    } catch (error) {
      console.log(error)
    }
  }


export const deployPrivateSale = async (token, saleObject, library, account, deploymentFee, saleData) => {
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
      console.log("Sale deployed");

      const deployedAddress = await contract.saleIdToAddress(saleId.toNumber())

      const finalSaleObject ={
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
        minAllocation: parseEther(Number(saleObject.minAllocation).toString()).toString(),        
        maxAllocation: parseEther(Number(saleObject.maxAllocation).toString()).toString(),       
        endDate: saleObject.endDate,
        startDate: saleObject.startDate,
        hardCap: parseEther(Number(saleObject.hardCap).toString()).toString(),
        softCap: parseEther(Number(saleObject.softCap).toString()).toString(),
        currency: saleObject.currency,
        dex: saleObject.dex,
        whiteisting: saleObject.whiteisting,
      }

      return finalSaleObject
    } catch (error) {
      console.log(error);
    }
  };