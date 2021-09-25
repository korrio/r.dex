import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import useRefresh from './useRefresh'
import { getRoyXAddress } from 'utils/addressHelpers'
import { updateVonderPriceUSD } from 'state/price/actions'
import { useVonUsd } from './useContract'
import contracts from 'constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID || '96'

const useGetPriceData = () => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const pancakeRouter = useVonUsd()

  const [vonPriceUsd, setVonPriceUsd] = useState(0)
  const oneBnAmount = new BigNumber(10).pow(18)
  
  useEffect(() => {
    const fetchUsdPrice = async (amount: string, tokenInOutAddress: string[]) => {
      const result = await pancakeRouter.methods.getAmountsOut(amount, tokenInOutAddress).call()
        .then((res) =>
          new BigNumber(res[1])
        )
        .then((pricesOut) => pricesOut)

      console.log("theResult",result)

      setVonPriceUsd(result.dividedBy(new BigNumber(10).pow(18)).toNumber())
      // setVonPriceUsd(new BigNumber("0.001").toNumber())
    }

    const theGetPriceContracts = [getRoyXAddress(), contracts.busd[chainId]];
    console.log("theGetPriceContracts",theGetPriceContracts);

    fetchUsdPrice(oneBnAmount.toString(10), theGetPriceContracts)
    dispatch(updateVonderPriceUSD({ vonderPriceUSD: vonPriceUsd }))

  }, [dispatch, fastRefresh, pancakeRouter.methods, oneBnAmount, vonPriceUsd])

  return vonPriceUsd
}

export default useGetPriceData
