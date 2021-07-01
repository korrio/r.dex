import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import useRefresh from './useRefresh'
import { getCakeAddress } from 'utils/addressHelpers'
import { updateVonderPriceUSD } from 'state/price/actions'

const useGetPriceData = () => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  const [data, setData] = useState<BigNumber>(new BigNumber(0))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.bkc.loremboard.finance/prices')
        const pricesList = await res.json()
        const vonPrice = new BigNumber(pricesList.prices[getCakeAddress()])
        setData(vonPrice)
        dispatch(updateVonderPriceUSD({
          vonderPriceUSD: vonPrice.toNumber()
        }))
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData, dispatch, fastRefresh])

  return data
}

export default useGetPriceData
