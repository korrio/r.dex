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
  const vonderRouter = useVonUsd()

  const [vonPriceUsd, setVonPriceUsd] = useState(0)
  const oneBnAmount = new BigNumber(10).pow(18)
    // const [data, setData] = useState<BigNumber>(new BigNumber(0))

  useEffect(() => {
    const fetchUsdPrice = async (amount: string, tokenInOutAddress: string[]) => {
      // const result = await vonderRouter.methods.getAmountsOut(amount, tokenInOutAddress).call()
      //   .then((res) =>
      //     new BigNumber(res[1])
      //   )
      //   .then((pricesOut) => pricesOut)

      // setVonPriceUsd(result.dividedBy(new BigNumber(10).pow(18)).toNumber())
      setVonPriceUsd(0.001)
    }

    fetchUsdPrice(oneBnAmount.toString(10), [getRoyXAddress(), contracts.busd[chainId]])
    dispatch(updateVonderPriceUSD({ vonderPriceUSD: vonPriceUsd }))

  }, [dispatch, fastRefresh, vonderRouter.methods, oneBnAmount, vonPriceUsd])

  return vonPriceUsd
}

export default useGetPriceData
