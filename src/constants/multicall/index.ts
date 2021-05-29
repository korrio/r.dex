import { ChainId } from '../../sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xcc515Aa7eE9Be4491c98DE68ee2147F0A063759D', // TODO
  [ChainId.TESTNET]: '0xcf0B89117E141B5416F09abe5D3Eb2b80BDC7a6f',
  // [ChainId.BSCMAINNET]: '0x301907b5835a2d723Fe3e9E8C5Bc5375d5c1236A',
  // [ChainId.BSCTESTNET]: '0x301907b5835a2d723Fe3e9E8C5Bc5375d5c1236A'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
