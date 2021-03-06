import { ChainId, JSBI, Percent, Token, WETH } from '../sdk'

export const ROUTER_ADDRESS = '0x10ed43c718714eb63d5aa57b78b54704e256024e' // Pancakeswap V2 router

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0xc6677E014D7e2F45fB44E8036C014B916C0492a1', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0x8b614b636FfDdfFaa261224d88C3Fc919a9634AE', 18, 'USDC', 'USD')
export const BTCB = new Token(ChainId.MAINNET, '0x0330b553823703E673787747D1930a12D7a14c94', 18, 'BTCB', 'BTC')
export const USDT = new Token(ChainId.MAINNET, '0x80318CAB3791E49650C8760a61196fFD2D23F6a1', 18, 'USDT', 'Tether USD')
export const ETH = new Token(
  ChainId.MAINNET,
  '0xE06B321eF826eaB4D242b1e40d4a51b8dCDF61B2',
  18,
  'ETH',
  'Ethereum'
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
  // [ChainId.BSCMAINNET]: [WETH[ChainId.BSCMAINNET]],
  // [ChainId.BSCTESTNET]: [WETH[ChainId.BSCTESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, BTCB, USDT, ETH],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, BTCB, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      // new Token(ChainId.MAINNET, '0xff54da7caf3bc3d34664891fc8f3c9b6dea6c7a5', 18, 'ROY', 'VONDER Token'),
      new Token(ChainId.MAINNET, '0xEc04389a362b71Df31275bc602C51446D3B28F8C', 18, 'ROYX', 'VONDER Token'),
      new Token(ChainId.MAINNET, '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', 18, 'WBNB', 'Wrapped BNB'),
    ],
    [USDC, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
