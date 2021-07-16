import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import useRefresh from './useRefresh'
import { getCakeAddress } from 'utils/addressHelpers'
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
    // const fetchData = async () => {
    //   try {
    //     const res = await fetch('https://api.bkc.loremboard.finance/prices')
    //     const pricesList = await res.json()
    //     const vonPrice = new BigNumber(pricesList.prices[getCakeAddress()])
    //     setData(vonPrice)
    //     dispatch(updateVonderPriceUSD({
    //       vonderPriceUSD: vonPrice.toNumber()
    //     }))
    //   } catch (error) {
    //     console.error('Unable to fetch price data:', error)
    //   }
    // }

    // fetchData()

    const fetchUsdPrice = async (amount: string, tokenInOutAddress: string[]) => {
      const result = await vonderRouter.methods.getAmountsOut(amount, tokenInOutAddress).call()
        .then((res) =>
          new BigNumber(res[1])
        )
        .then((pricesOut) => pricesOut)

      setVonPriceUsd(result.dividedBy(new BigNumber(10).pow(18)).toNumber())
    }

    fetchUsdPrice(oneBnAmount.toString(10), [getCakeAddress(), contracts.keth[chainId]])
    dispatch(updateVonderPriceUSD({ vonderPriceUSD: vonPriceUsd }))

  }, [dispatch, fastRefresh, vonderRouter.methods, oneBnAmount, vonPriceUsd])

  return vonPriceUsd
}

export default useGetPriceData
