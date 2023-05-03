// import { BSC, BSCTestnet } from '@usedapp/core'
import { BSC, BSCTestnet } from '@usedapp/core'
// import { RbaChain } from './constants/chain'

export const networkConfig = {
  readOnlyChainId: [BSCTestnet.chainId],
  readOnlyUrls: {
    // [BSC.chainId]: 'https://rpc.ankr.com/bsc',
    // [BSC.chainId]: BSC.rpcUrl,
    [BSCTestnet.chainId]:'https://rpc.ankr.com/bsc_testnet_chapel',
  },
  networks: [BSCTestnet],
  noMetamaskDeactivate: true,
  refresh: 'never',
  pollingInterval: 15000,
}
