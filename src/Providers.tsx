import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { ModalProvider } from 'the-vonder-uikit'
import { NetworkContextName } from './constants'
import store from './state'
import getLibrary from './utils/getLibrary'
import { ThemeContextProvider } from './ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import * as bsc from '@binance-chain/bsc-use-wallet'
import getRpcUrl from 'utils/getRpcUrl'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
    const rpcUrl = getRpcUrl()
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID || '96')
    
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeContextProvider>
            <bsc.UseWalletProvider
              chainId={chainId}
              connectors={{
                walletconnect: { rpcUrl },
                bsc,
              }}
            >
              <RefreshContextProvider>
                <ModalProvider>{children}</ModalProvider>
              </RefreshContextProvider>
            </bsc.UseWalletProvider>
          </ThemeContextProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
