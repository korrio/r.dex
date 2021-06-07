import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  // MAINNET = 56,
  MAINNET = 96,
  TESTNET = 25925
  // BSCMAINNET = 56,
  // BSCTESTNET = 97
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// export const FACTORY_ADDRESS = '0xeC9c39E283a7956b3EE22816648824b9DF783283' // BKC Mainnet (FoodcourtFactory)
export const FACTORY_ADDRESS = '0x52e0895f93B3AC14825AFa5933032C8323eCF792' // BKC Testnet (FoodcourtFactory)

// export const INIT_CODE_HASH = '0xf1d77ba4cb681341af63066d44297a59a8962ec4fe422a20eca5077dca88cef9' // BKC Mainnet (FoodcourtPair)
export const INIT_CODE_HASH = '0x5cea560cf72e6e68d37a2d61d2d48884016e694f550856ff1a7b65f20bf82800' // BKC Testnet (FoodcourtPair)

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _998 = JSBI.BigInt(998)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}