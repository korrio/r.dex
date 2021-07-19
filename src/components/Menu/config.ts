import { MenuEntry } from 'the-vonder-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '#',
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
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Social',
    icon: 'HamburgerIcon',
    items: [
      {
        label: 'Twitter',
        href: '',
      },
      {
        label: 'Telegram',
        href: '',
      },
      {
        label: 'Medium',
        href: '',
      },
      {
        label: 'Github',
        href: '',
      },
      {
        label: 'Gitbook',
        href: '',
      },
    ],
  },
]

export default config
