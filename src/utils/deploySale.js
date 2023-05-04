import { Contract } from "@ethersproject/contracts"
import PublicAbi from '../config/abi/PublicLaunchpadAbi.json';
import { Public_FACTORYADRESS,ROUTER_ADDRESS,ADMIN_ADDRESS } from 'config/constants/LaunchpadAddress';
import { parseEther,  parseUnits} from 'ethers/lib/utils';
import { utils } from "ethers"


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