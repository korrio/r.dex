import { MenuEntry } from 'the-vonder-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://royalcats.finance',
  },
  // {
  //   label: 'Exchange',
  //   href: '/swap',
  //   icon: 'ExchangeIcon',
  // },
  // {
  //   label: 'Liquidity',
  //   href: '/pool',
  //   icon: 'LiquidityIcon',
  // },
      {
      label: 'Trade',
      icon: 'TradeIcon',
      items: [
        {
          label: 'Exchange',
          href: 'https://exchange.royalcats.finance',
        },
        {
          label: 'Liquidity',
          href: 'https://exchange.royalcats.finance/#/pool',
        },
      ],
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
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'https://royalcats.finance/pools',
    status: {
      text: "NEW",
      color: 'success',
    },
  },
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
  {
        label: 'More',
        icon: 'MoreIcon',
        items: [{
                label: 'Github',
                href: 'https://github.com/royalcatslotto',
            },
            {
                label: 'Docs',
                href: 'https://docs.royalcats.finance/',
            },
            {
                label: 'Blog',
                href: 'https://royalcatslotto.medium.com/',
            },
        ],
    },
]

export default config
