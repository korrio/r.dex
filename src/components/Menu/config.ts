import { MenuEntry } from 'the-vonder-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://app.vonder.finance/',
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
    href: 'https://app.vonder.finance/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'https://app.vonder.finance/pools',
  },
  {
    label: 'Chart',
    icon: 'ChartIcon',
    href: 'https://kub.loremboard.finance/chart/VON',
  },
  {
    label: 'Portfolio',
    icon: 'ChartIcon',
    href: 'https://kub.loremboard.finance/dashboard',
  },
  {
    label: 'Social',
    icon: 'HamburgerIcon',
    items: [
      {
        label: 'Twitter',
        href: 'https://twitter.com/vonderfinance',
      },
      {
        label: 'Telegram',
        href: 'https://t.me/vonderfinance',
      },
      {
        label: 'Medium',
        href: 'https://blog.vonder.finance',
      },
      {
        label: 'Github',
        href: 'https://github.com/vonderfinance',
      },
      {
        label: 'Gitbook',
        href: 'https://docs.vonder.finance',
      },
    ],
  },
]

export default config
