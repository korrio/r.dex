import { Token, TokenAmount } from '../sdk' // eslint-ignore
import { useMemo, useState } from 'react'

import { useBusdContract, useTokenContract, useVdpContract, useXvonContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from 'hooks'
import { resolve } from 'path'
import { getVdpMasterAddress } from 'utils/addressHelpers'

const VDP_MASTER_ADDRESS = getVdpMasterAddress()

export function useTokenAllowance(token ? : Token, owner ? : string, spender ? : string): TokenAmount | undefined {
    const contract = useTokenContract(token?.address, false)

    const inputs = useMemo(() => [owner, spender], [owner, spender])
    const allowance = useSingleCallResult(contract, 'allowance', inputs).result

    return useMemo(() => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined), [
        token,
        allowance,
    ])
}

export const useBusdAllowance = async () => {
    const { account } = useActiveWeb3React()
    const busdContract = useBusdContract()
    if (!account) return undefined

      if(!busdContract) return 0;

    console.log("VDP_MASTER_ADDRESS", VDP_MASTER_ADDRESS);
    console.log("account", account);

    const allowanceTotal = await busdContract?.allowance(account, VDP_MASTER_ADDRESS);
    return allowanceTotal
}

export const useXvonAllowance = async () => {
    const { account } = useActiveWeb3React()
    const xvonContract = useXvonContract()
    if (!account) return undefined

      if(!xvonContract) return 0;

      console.log("VDP_MASTER_ADDRESS", VDP_MASTER_ADDRESS);
    console.log("account", account);

    const allowanceTotal = await xvonContract?.allowance(account, VDP_MASTER_ADDRESS);
    return allowanceTotal
}

export const useVdpAllowance = async () => {
    const { account } = useActiveWeb3React()
    const vdpContract = useVdpContract()
    if (!account) return undefined

      if(!vdpContract) return 0;

    const allowanceTotal = await vdpContract?.allowance(account, VDP_MASTER_ADDRESS);
    return allowanceTotal
}

export default useTokenAllowance