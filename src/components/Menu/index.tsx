import React, { useContext } from 'react'
import { Menu as UikitMenu} from 'the-vonder-uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
// import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import links from './config'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const priceData = useSelector<AppState, AppState['price']['vonderPriceUSD']>(state => state.price.vonderPriceUSD)
  console.log("priceData",priceData);

// const CakePrice: React.FC<Props> = ({ cakePriceUsd }) => {
//   return cakePriceUsd ? (
//     <PriceLink
//       href="https://tokenradar.io/token/0x19dade57b0bbce7d5e859ba02846820f5c0c2b09"
//       target="_blank">
//       <VonderRoundIcon width="24px" mr="8px" />
//       <Text color="textSubtle" bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
//     </PriceLink>
//   ) : (
//     <Skeleton width={80} height={24} />
//   )
// }

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={priceData}
      // cakePriceUrl={loremBoardUrl}
      // cakeIcon={IconLogoUrl}
      {...props}
    />
  )
}

export default Menu
