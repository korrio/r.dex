import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://vonder-swap.web.app/',
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
    href: 'https://vonder-swap.web.app/farms',
  },
]

export default config
