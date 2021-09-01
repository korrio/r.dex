import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from '../sdk' // eslint-ignore
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useEffect, useMemo, useState } from 'react'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import vonRouter from '../constants/abis/vonRouter.json'
import VDP_MASTER_ABI from '../constants/abis/vdpMasterAbi.json'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import useRouter from '../constants/router'
import contractsAddress from '../constants/contracts'
import BUSD_ABI from '../constants/token/busd.json'
import XVON_ABI from '../constants/token/xvon.json'
import VDP_ABI from '../constants/token/vdp.json'
import { getVdpMasterAddress, getRoyMasterAddress } from 'utils/addressHelpers'

const CHAING_ID = process.env.REACT_APP_CHAIN_ID || '56'

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.TESTNET:
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

const useVonContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

export const useVonUsd = () => {
  const vonRouterAbi = (vonRouter as unknown) as AbiItem
  const vonRouterAddress = useRouter.vonRouter[CHAING_ID]
  return useVonContract(vonRouterAbi, vonRouterAddress)
}

export function useVDPMasterContract(withSignerIfPossible?: boolean): Contract | null {
  const vdpMasterAddress = contractsAddress.roymaster[CHAING_ID]
  const vdpMasterAbi = (VDP_MASTER_ABI as unknown) as AbiItem
  return useContract(vdpMasterAddress, vdpMasterAbi, withSignerIfPossible)
}

export function useBusdContract(withSignerIfPossible?: boolean): Contract | null {
  const busdAddress = contractsAddress.busd[CHAING_ID]
  const busdAbi = (BUSD_ABI as unknown) as AbiItem
  return useContract(busdAddress, busdAbi, withSignerIfPossible)
}

export function useXvonContract(withSignerIfPossible?: boolean): Contract | null {
  const xvonAddress = contractsAddress.busd[CHAING_ID]
  const xvonAbi = (XVON_ABI as unknown) as AbiItem
  return useContract(xvonAddress, xvonAbi, withSignerIfPossible)
}

export function useVdpContract(withSignerIfPossible?: boolean): Contract | null {
  const vdpAddress = contractsAddress.roy[CHAING_ID]
  const vdpAbi = (VDP_ABI as unknown) as AbiItem
  return useContract(vdpAddress, vdpAbi, withSignerIfPossible)
}

export function useRedeemFeeCalculate() {

  const useXvon = useXvonContract()
  const useVdp = useVdpContract()
  const VDP_MASTER_ADDRESS = getRoyMasterAddress()
  // get balances of vdpMaster in xVON
  const xvonBalances = useXvon?.balanceOf(VDP_MASTER_ADDRESS)
  // get total supply of vdp
  const vdpTotalSupply = useVdp?.totalSupply()
  return { xvonBalances, vdpTotalSupply}
}