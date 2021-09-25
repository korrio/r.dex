import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Button, useModal } from 'the-vonder-uikit'
import MintRedeemTransactionsModal from 'components/PageHeader/MintRedeemTransactionsModal'
import { Currency, CurrencyAmount } from 'sdk'
import { useBusdAllowance, useVdpAllowance, useXvonAllowance } from 'data/Allowances'
import Loader from 'components/Loader'
import { useApproveBusd, useApproveXvon, useApproveVdp } from 'hooks/useApproveCallback'

interface PagePropsContent {
  price: string
  account?: string | null | undefined
  isRedeem?: boolean
  currencyBalance?: string
  showMaxButton?: boolean
  currency?: Currency | null
  currencyMaxAmount?: CurrencyAmount
  disabledConformButton: boolean
  redeemQuota?: string
}

const StyledPage = styled.div`
  padding: 24px;
  border: 1px solid #ddd8d9;
  border-radius: 8px;
`

const Details = styled.div`
  flex: 1;
  flex-direction: row;
`

const TitleText = styled.h2`
  display: inline;
  color: #c9b370;
`

const PriceText = styled.p`
  font-size: 20px;
  display: inline;
  color: #c9b370;
  font-weight: 800;
`
const PriceSubText = styled.p`
  display: inline;
  font-weight: bold;
  color: #a4a4a4;
`

const ApproveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`


const SubCard = ({
  price,
  isRedeem,
  currencyBalance = '0',
  showMaxButton,
  currency,
  currencyMaxAmount,
  account,
  disabledConformButton,
  redeemQuota = '0',
}: PagePropsContent) => {
  const [onPresentMintTransactions] = useModal(
    <MintRedeemTransactionsModal
      totalAvailable={currencyBalance}
      showMaxButton={showMaxButton}
      currency={currency}
      currencyMaxAmount={currencyMaxAmount}
      disabledConformButton={disabledConformButton}
    />
  )
  const [onPresentRedeemTransactions] = useModal(
    <MintRedeemTransactionsModal
      isRedeem
      totalAvailable={currencyBalance}
      showMaxButton={showMaxButton}
      currency={currency}
      currencyMaxAmount={currencyMaxAmount}
      disabledConformButton={disabledConformButton}
    />
  )

  // Allowance
  const useBusdAllowanceBignumber = useBusdAllowance()
  const useXvonAllowanceBignumber = useXvonAllowance()
  const useVdpAllowanceBignumber = useVdpAllowance()
  const [busdAllowance, setBusdAllowance] = useState('0')
  const [xvonAllowance, setXvonAllowance] = useState('0')
  const [vdpAllowance, setVdpAllowance] = useState('0')

  // Approving
  const [isBusdApproved, setIsBusdApproved] = useState(false)
  const [isXvonApproved, setIsXvonApproved] = useState(false)
  const [isVdpApproved, setIsVdpApproved] = useState(false)
  const { onApproveBusd } = useApproveBusd(account ?? undefined)
  const { onApproveVdp } = useApproveVdp(account ?? undefined)

  // Approving (Loading State)
  const [requestedBusdApproval, setRequestedBusdApproval] = useState(false)
  const [requestedVdpApproval, setRequestedVdpApproval] = useState(false)

  useEffect(() => {
    
    if (account) {

      useBusdAllowanceBignumber.then((allowance) => setBusdAllowance(allowance.toString()))
      useXvonAllowanceBignumber.then((allowance) => setXvonAllowance(allowance.toString()))
      useVdpAllowanceBignumber.then((allowance) => setVdpAllowance(allowance.toString()))
      // check each token allowance (that approved)
      setIsBusdApproved(+busdAllowance.toString() > 0)
      setIsXvonApproved(+xvonAllowance.toString() > 0)
      setIsVdpApproved(+vdpAllowance.toString() > 0)
    } else {
      setIsBusdApproved(false)
      setIsVdpApproved(false)
    }
  }, [
    account,
    busdAllowance,
    vdpAllowance,
    isBusdApproved,
    isVdpApproved,
    useBusdAllowanceBignumber,
    useVdpAllowanceBignumber,
    requestedBusdApproval,
    requestedVdpApproval,
    useXvonAllowanceBignumber,
    xvonAllowance,
  ])

  const handleApproveBusd = useCallback(async () => {
    try {
      setRequestedBusdApproval(true)
      await onApproveBusd()
    } catch (e) {
      console.error(e)
    }
    setRequestedBusdApproval(false)
  }, [onApproveBusd])

  const handleApproveVdp = useCallback(async () => {
    try {
      setRequestedVdpApproval(true)
      await onApproveVdp()
      setRequestedVdpApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApproveVdp])

  const renderApprovalMint = () => {
    return (
      <ApproveContainer>
        {true && (
          <Button
            onClick={handleApproveBusd}
            disabled={requestedBusdApproval || isBusdApproved}
            style={{ width: '100%', marginTop: '8px' }}
          >
            Approve BUSD
          </Button>
        )}
      </ApproveContainer>
    )
  }

  const renderApprovalRedeem = () => {
    return (
      <ApproveContainer>
        {true && (
          <Button
            onClick={handleApproveVdp}
            disabled={requestedVdpApproval || isVdpApproved}
            style={{ width: '100%', marginTop: '8px' }}
          >
            Approve ROY
          </Button>
        )}
      </ApproveContainer>
    )
  }

  const renderMintButton = () => {
    return (
      <Button
        disabled={
          requestedBusdApproval || !isXvonApproved || !isBusdApproved || currencyMaxAmount?.toSignificant(10) === '0'
        }
        onClick={onPresentMintTransactions}
        style={{ width: '80px' }}
        variant="primary"
      >
        Mint
      </Button>
    )
  }

  const renderRedeemButton = () => {
    console.log("requestedBusdApproval",requestedBusdApproval);
    console.log("!isXvonApproved",!isXvonApproved);
    console.log("!isVdpApproved",!isVdpApproved);
    console.log("redeemQuota",!redeemQuota);
    return (
      <Button
        disabled={
          false
          // requestedBusdApproval ||
          // !isXvonApproved ||
          // !isVdpApproved ||
          // // currencyMaxAmount?.toSignificant(10) === '0' ||
          // redeemQuota === '0'
        }
        onClick={onPresentRedeemTransactions}
        style={{ width: '80px' }}
        variant="primary"
      >
        Redeem
      </Button>
    )
  }

  return (
    <StyledPage style={{ marginTop: isRedeem ? '16px' : '0' }}>
      <Flex style={{ flexDirection: 'column' }}>
        <Details>
          <TitleText> {!isRedeem ? 'ROY' : 'ROY'}</TitleText>
          <PriceSubText> {!isRedeem ? 'Mint' : 'Redeem'}</PriceSubText>
          <PriceSubText> PRICE</PriceSubText>
        </Details>

        <Details
          style={{
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <PriceText>{price} BUSD</PriceText>
          {currency && currencyMaxAmount ? (
            !isRedeem ? (
              renderMintButton()
            ) : (
              renderRedeemButton()
            )
          ) : (
            <div style={{ marginTop: '16px' }}>
              <Loader />
            </div>
          )}
        </Details>
        {currency && currencyMaxAmount ? (
          !isRedeem ? (
            renderApprovalMint()
          ) : (
            renderApprovalRedeem()
          )
        ) : (
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        )}
      </Flex>
    </StyledPage>
  )
}

export default SubCard