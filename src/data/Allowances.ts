import { Token, TokenAmount } from '../sdk' // eslint-ignore
import { useMemo, useState } from 'react'

import { useBusdContract, useTokenContract, useVdpContract, useXvonContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from 'hooks'
import { resolve } from 'path'
import { getVdpMasterAddress } from 'utils/addressHelpers'

const VDP_MASTER_ADDRESS = getVdpMasterAddress()

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(() => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined), [
    token,
    allowance,
  ])
}

export function useBusdAllowance(owner?: string) {
  const busdContract = useBusdContract()
  const allowanceTotal = busdContract?.allowance(owner, VDP_MASTER_ADDRESS)
  return allowanceTotal
}

export function useXvonAllowance(owner?: string) {
  const xvonContract = useXvonContract()
  const allowanceTotal = xvonContract?.allowance(owner, VDP_MASTER_ADDRESS)
  return allowanceTotal
}

export function useVdpAllowance(owner?: string) {
  const vdpContract = useVdpContract()
  const allowanceTotal = vdpContract?.allowance(owner, VDP_MASTER_ADDRESS)
  return allowanceTotal
}

export default useTokenAllowance