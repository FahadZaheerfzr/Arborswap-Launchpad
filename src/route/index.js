import React from 'react'
import { useRoutes } from 'react-router-dom'
import Error from '../pages/Error'
import Airdrops from '../pages/AirDropper/Airdrops'
import AirdropsPage from "../pages/AirDropper/AirdropsPage"
import CreateAirdrop from '../pages/AirDropper/CreateAirdrop'
import Pools from 'pages/Launchpad/Pools'
import PoolPage from 'pages/Launchpad/PoolPage'
import CreateSale from 'pages/Launchpad/CreateSale'


export default function WebRouter() {
  let routes = useRoutes([
    { path: '/', element: <Pools /> }, // Redirect to /airdropper/airdrops
    // { path: '/locked-assets', element: <Locker /> },
    // { path: '/locked-assets/token/:id', element: <LockedAsset type={'token'} /> },
    // { path: '/locked-assets/lp-token/:id', element: <LockedAsset type={'lp-token'} /> },
    // { path: '/locker/token-locker', element: <TokenLocker /> },
    // { path: '/locker/lp-locker', element: <LpLocker /> },
    { path: '/launchpad/pools', element: <Pools /> },
    { path: '/launchpad/pools/:id', element: <PoolPage /> },
    { path: '/launchpad/create-sale', element: <CreateSale /> },
    { path: '/airdropper/airdrops', element: <Airdrops />},
    { path: '/airdropper/airdrops/:id', element: <AirdropsPage />},
    { path: '/airdropper/create-airdrop', element: <CreateAirdrop />},
    { path: '*', element: <Error /> },
  ])
  return routes
}

