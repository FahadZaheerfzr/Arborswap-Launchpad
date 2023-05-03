import { MULTICALL_ADDRESS, RPC_ADDRESS } from '../config/constants/address'
import ERC20Abi from '../config/abi/ERC20.json'
import { ethers } from 'ethers'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'

const CHAIN_NUMBER = 97

export const getTokenInfo = async (address) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])//sometimes need sunchronized data it guarantees data from same block and not multiple blocks prevents multiple seperate requests and does it in one also reduces costs
  //jsonrpc is a remote procedure call protocol encoded in json, we interact with binance smart chain using jsonrpc to specific endpoint
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  //here we create a new provider, it adds support for batched contract function calls
  const ethcallProvider = new Provider(provider)
  //we need to initialize the provider
  await ethcallProvider.init()
  //we create a new contract instance using address which specifies the contract address and abi which specifies the contract interface, this way we can retrieve information about the contract and send transactions as well
  const tokenContract = new Contract(address, ERC20Abi)
  //make an array of function calls (they will be executed in parallel)
  let calls = []
  try {
    //we push the function calls to the array
    calls.push(tokenContract.name())//name of token e.g ethereum
    calls.push(tokenContract.symbol())//symbol of token e.g ETH
    calls.push(tokenContract.decimals())//how many decimals e.g 18 meaning 1 ETH = 1000000000000000000 units
    calls.push(tokenContract.totalSupply())//how much supply available  

    //we execute all the function calls in parallel and wait for the results
    const [name, symbol, decimals, totalSupply] = await ethcallProvider.all(calls)
    //we return the results
    return {
      success: true,
      data: {
        name: name,
        symbol: symbol,
        decimals: decimals,
        totalSupply: totalSupply.toString(), //we convert the BigNumber to string
      },
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      data: {},
    }
  }
}

export const getTokenSymbolInfo = async (address) => {
  setMulticallAddress(CHAIN_NUMBER, MULTICALL_ADDRESS[CHAIN_NUMBER])
  const provider = new ethers.providers.JsonRpcProvider(RPC_ADDRESS[CHAIN_NUMBER])
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  const tokenContract = new Contract(address, ERC20Abi)
  let calls = []
  try {
    calls.push(tokenContract.symbol())
    const [symbol] = await ethcallProvider.all(calls)
    return {
      success: true,
      data: {
        symbol: symbol,
      },
    }
  } catch (error) {
    return {
      success: false,
      data: {},
    }
  }
}
