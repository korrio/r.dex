import useTitle from 'hooks/useTitle'
// import { usePriceCakeBusd } from 'state/hooks'

interface DocumentTitleProps {
  title?: string
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ title }) => {
  // const cakePriceUsd = usePriceCakeBusd()

  // useTitle(`$${cakePriceUsd.toFixed(3)} - ${title}`)
  // useTitle(`ROYALCATS.finance :: DEX`)
  return null
}

export default DocumentTitle
