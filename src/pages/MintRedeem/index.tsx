import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Button, CardBody, Text } from 'the-vonder-uikit'
import styled from 'styled-components'
import CardNav from 'components/CardNav'
import { Wrapper } from 'components/swap/styleds'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import PageHeader from 'components/PageHeader'
import ConnectWalletButton from 'components/ConnectWalletButton'
import AppBody from '../AppBody'
import { getBusdAddress, getRoyAddress, getRoyMasterAddress } from 'utils/addressHelpers'
import PageFooter from 'components/PageFooter'
import SubCard from 'components/SubCard'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useXvonAllowance } from 'data/Allowances'
import { useApproveXvon } from 'hooks/useApproveCallback'

const FooterContent = styled.div`
  max-width: 500px;
  padding: 24px;
  line-height: 1.5rem;
  font-size: 14px;
`

const MintRedeem = () => {
  const BUSD_PRICE_RATIO = '1'
  const VDP_PRICE_RATIO = '1'
  const { account } = useActiveWeb3React()
  const busdCurrency = useCurrency(getBusdAddress())
  const vdpCurrency = useCurrency(getRoyAddress())
  const busdCurrencyBalance = useCurrencyBalance(account ?? undefined, busdCurrency ?? undefined)
  const vdpCurrencyBalance = useCurrencyBalance(account ?? undefined, vdpCurrency ?? undefined) 
  const busdRedeemableBalance = useCurrencyBalance(getRoyMasterAddress() ?? undefined, busdCurrency ?? undefined) 
  const useXvonAllowanceBignumber = useXvonAllowance()
  const [isXvonApproved, setIsXvonApproved] = useState(false)
  const [xvonAllowance, setXvonAllowance] = useState('0')
  const { onApproveXvon } = useApproveXvon()
  const [requestedXvonApproval, setRequestedXvonApproval] = useState(false)

  useEffect(() => {

    if (account && useXvonAllowanceBignumber) {
      useXvonAllowanceBignumber.then((allowance) => setXvonAllowance(allowance.toString()))
      setIsXvonApproved(+xvonAllowance.toString() > 0)
    } else {
      setIsXvonApproved(false)
    }
  }, [account, xvonAllowance, isXvonApproved, requestedXvonApproval, useXvonAllowanceBignumber])

    
  const handleApproveXvon = async () => {
    try {
      setRequestedXvonApproval(true)
      await onApproveXvon()
      setRequestedXvonApproval(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <CardNav activeIndex={2} />
{/*      <Text style={{ maxWidth: '500px', padding: '0 24px 24px 24px', lineHeight: '1.5rem' }}>
        Purchase ROY to earn profit share
      </Text> */}
      <AppBody>
        <Wrapper id="mintredeem-page">
          <PageHeader title="ROYAL BANK" description='Mint or Redeem ROY tokens with BUSD as 1:1 ratio' isMintPage />
          <CardBody>
            {account && (
              <SubCard
                account={account}
                price={BUSD_PRICE_RATIO}
                currencyMaxAmount={busdCurrencyBalance}
                currencyBalance={busdCurrencyBalance?.toSignificant(6)}
                currency={busdCurrency}
                disabledConformButton={!account}
                showMaxButton
              />
            )}
            {account && (
              <SubCard
                account={account}
                price={VDP_PRICE_RATIO}
                currencyMaxAmount={vdpCurrencyBalance}
                currencyBalance={vdpCurrencyBalance?.toSignificant(6)}
                currency={vdpCurrency}
                isRedeem
                disabledConformButton={!account}
                showMaxButton
              />
            )}
            {!account && <ConnectWalletButton width="100%" style={{ marginTop: '16px' }} />}
            {account && !isXvonApproved && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
                  <Text style={{ fontSize: '14px', marginTop: '8px' }}>ROYX approving use as a fee</Text>
                  <Button
                    onClick={handleApproveXvon}
                    style={{ width: '85%', marginTop: '8px' }}
                    disabled={requestedXvonApproval || isXvonApproved}
                  >
                    Approve ROYX
                  </Button>
                </div>
              </>
            )}
          </CardBody>
          {account && (
            <PageFooter
              vdpBalance={vdpCurrencyBalance?.toSignificant(6)}
              busdRedeemableBalance={busdRedeemableBalance?.toSignificant(6)}
            />
          )}
        </Wrapper>
      </AppBody>
      {/* <AdvancedSwapDetailsDropdown trade={trade} /> */}
      <FooterContent>
        <Text style={{ fontWeight: 'bold' }}>Disclaimer:</Text>
        <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
          - Maximum mint is 3,000 BUSD per a round
        </Text>
        <Text style={{ fontSize: '14px', fontWeight: 'bold' }}>
          - Maximum redeem is 1,000 ROY per a round
        </Text>
        <Text style={{ fontSize: '14px' }}>
          - BUSD are used to back ROY. If all BUSD are used up, it is not possible to sell it until new income refills the
          bank.
        </Text>
      </FooterContent>
    </>
  )
}

export default MintRedeem