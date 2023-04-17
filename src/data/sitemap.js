import AirplaneSVG from '../svgs/Sidebar/airplane'
import DashboardSVG from '../svgs/Sidebar/dashboard'
import MoreProductsSVG from '../svgs/Sidebar/more_products'
import SheildSecuritySVG from 'svgs/Sidebar/shield_security'
import StakingSVG from 'svgs/Sidebar/staking'
import TradeSVG from 'svgs/Sidebar/trade'

export const sitemap = [
  {
    id: 1,
    name: 'Home',
    extendable: false,
    icon: <DashboardSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <DashboardSVG className="fill-primary-green" />,
    subitems: [],
    link: '/',
    sublinks: ['/'],
  },
  // {
  //   id: 2,
  //   name: 'Launchpad',
  //   extendable: true,
  //   icon: <LaunchpadSVG className="fill-dim-text dark:fill-dim-text-dark" />,
  //   activeIcon: <LaunchpadSVG className="fill-primary-green" />,
  //   subitems: [
  //     {
  //       id: 1,
  //       name: 'Pools',
  //       link: '/launchpad/pools',
  //     },
  //     {
  //       id: 2,
  //       name: 'Create Sale',
  //       link: '/launchpad/create-sale',
  //     },
  //   ],
  //   sublinks: ['/launchpad/pools', '/launchpad/create-sale'],
  // },
  {
    id: 3,
    name: 'Locker',
    extendable: true,
    icon: <StakingSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <StakingSVG className="fill-primary-green" />,
    subitems: [
      {
        id: 1,
        name: 'Locked Assets',
        link: 'https://lock.arborswap.org/locked-assets',
      },
      {
        id: 2,
        name: 'Token Locker',
        link: 'https://lock.arborswap.org/locker/token-locker',
      },
      {
        id: 3,
        name: 'LP Locker',
        link: 'https://lock.arborswap.org/locker/lp-locker',
      },
    ],
    sublinks: [ 'https://lock.arborswap.org/locked-assets', 'https://lock.arborswap.org/locker/token-locker', 'https://lock.arborswap.org/locker/lp-locker'],
  },
  {
    id: 4,
    name: 'Airdropper',
    extendable: true,
    icon: <AirplaneSVG className="fill-dim-text dark:fill-dim-text-dark scale-[1.2] hover:fill-primary-green" />,
    activeIcon: <AirplaneSVG className="fill-primary-green scale-[1.2]" />,
    subitems: [
      {
        id: 1,
        name: 'Airdrops',
        link: 'https://airdrop.arborswap.org/airdropper/airdrops',
      },
      {
        id: 2,
        name: 'Create Airdrop',
        link: 'https://airdrop.arborswap.org/airdropper/create-airdrop',
      },
    ],
    sublinks: ['https://airdrop.arborswap.org/airdropper/airdrops', 'https://airdrop.arborswap.org/airdropper/create-airdrop'],
  },
  {
    id: 5,
    name: 'Trade',
    extendable: true,
    icon: <TradeSVG className="fill-dim-text dark:fill-dim-text-dark scale-[1.2] hover:fill-primary-green" />,
    activeIcon: <TradeSVG className="fill-primary-green scale-[1.2]" />,
    subitems: [
      {
        id: 1,
        name: 'Exchange',
        link: '/swap',
      },
      {
        id: 2,
        name: 'Liquidity',
        link: '/swap/add',
      },
      {
        id: 3,
        name: 'Limit Orders',
        link: '/pool',
      },
    ],
    sublinks: ['/airdropper/airdrops', '/airdropper/create-airdrop'],
  },
  {
    id: 6,
    name: 'Staking',
    extendable: false,
    icon: <StakingSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <StakingSVG className="fill-primary-green" />,
    subitems: [],
    link: '/pools',
    sublinks: [],
  },
  /* {
    id: 7,
    name: 'More Products',
    extendable: true,
    icon: <MoreProductsSVG className="fill-dim-text dark:fill-dim-text-dark hover:fill-primary-green" />,
    activeIcon: <MoreProductsSVG className="fill-primary-green" />,
    subitems: [
      {
        id: 1,
        name: 'Locker',
        link: 'http://lock.arborswap.org/',
      },
      {
        id: 2,
        name: 'Airdropper',
        link: 'http://airdrop.arborswap.org/',
      },
    ],
    sublinks: ['', '/launchpad/token-locker', '/launchpad/lp-locker'],
  }, */
]
