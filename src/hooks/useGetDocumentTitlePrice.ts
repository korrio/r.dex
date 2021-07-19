import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData' 

const useGetDocumentTitlePrice = () => {
  const vonPriceUsd = useGetPriceData()

  const vonPriceUsdString =
    Number.isNaN(vonPriceUsd) || vonPriceUsd === 0
      ? ''
      : `$${vonPriceUsd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    // document.title = `${vonPriceUsdString} - VONDER.finance ✌️`
    document.title = `ROYALCATS.finance :: DEX`;
  }, [vonPriceUsdString])
}
export default useGetDocumentTitlePrice
