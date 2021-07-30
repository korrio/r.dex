import { MenuEntry } from 'the-vonder-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://royalcats.finance',
  },
  {
    label: 'Exchange',
    href: '/swap',
    icon: 'ExchangeIcon',
  },
  {
    label: 'Liquidity',
    href: '/pool',
    icon: 'LiquidityIcon',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'https://royalcats.finance/farms',
    status: {
      text: "NEW",
      color: 'success',
    },
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Social',
  //   icon: 'HamburgerIcon',
  //   items: [
  //     {
  //       label: 'Twitter',
  //       href: '',
  //     },
  //     {
  //       label: 'Telegram',
  //       href: '',
  //     },
  //     {
  //       label: 'Medium',
  //       href: '',
  //     },
  //     {
  //       label: 'Github',
  //       href: '',
  //     },
  //     {
  //       label: 'Gitbook',
  //       href: '',
  //     },
  //   ],
  // },
]

export default config
