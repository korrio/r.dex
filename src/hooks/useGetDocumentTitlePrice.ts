import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData' 

const useGetDocumentTitlePrice = () => {
  // const vonPriceUsd = useGetPriceData()
  // const vonPriceUsd = new BigNumber(0);
  const vonPriceUsdString = '$0';
  // const vonPriceUsdString =
  //   Number.isNaN(vonPriceUsd) || vonPriceUsd === 0
  //     ? ''
  //     : `$${vonPriceUsd.toLocaleString(undefined, {
  //         minimumFractionDigits: 3,
  //         maximumFractionDigits: 3,
  //       })}`

  useEffect(() => {
    // document.title = `🐱 ROYALCATS.finance ${vonPriceUsdString}`
    document.title = `🐱 ROYALCATS.finance`
    // document.title = `ROYALCATS.finance :: DEX`;
  }, [vonPriceUsdString])
}
export default useGetDocumentTitlePrice
