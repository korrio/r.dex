/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useMemo, useCallback, useEffect, useState } from 'react'
import { Flex, Text, Modal, Button } from 'the-vonder-uikit'
import { useActiveWeb3React } from 'hooks'
import styled from 'styled-components'
import { darken } from 'polished'
import { Currency, CurrencyAmount } from 'sdk'
import { Input as NumericalInput } from '../NumericalInput'
import CurrencyLogo from 'components/CurrencyLogo'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useMint } from 'hooks/useMint'
import { useRedeem } from 'hooks/useRedeem'
import { useRedeemFeeCalculate } from 'hooks/useContract'
import useWeb3 from 'hooks/useWeb3'

type MintRedeemTransactionsModalProps = {
  onDismiss?: () => void
  isRedeem?: boolean
  currency?: Currency | null
  totalAvailable?: string
  showMaxButton?: boolean
  currencyMaxAmount?: CurrencyAmount
  disabledConformButton: boolean
}

const defaultOnDismiss = () => null

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`

const FooterContent = styled.div`
  max-width: 500px;
  padding: 24px;
  line-height: 1.5rem;
  font-size: 14px;
`

const Details = styled.div`
  width: 100%;
`

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  :focus,
  :hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.input)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 16px;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`

const MintRedeemTransactionsModal = ({
  onDismiss = defaultOnDismiss,
  isRedeem,
  currency,
  totalAvailable = '0',
  showMaxButton,
  currencyMaxAmount,
  disabledConformButton,
}: MintRedeemTransactionsModalProps) => {
  const [ valueInput, setValueInput ] = useState('')
  const { account } = useActiveWeb3React()
  const { deposit, loading } = useMint()
  const { withdraw, loadingStatus } = useRedeem()
  const [ xvonFeeDisplay, setXvonFeeDisplay] = useState(0)
  const { xvonBalances, vdpTotalSupply } = useRedeemFeeCalculate()
  const [ xvonOfVdpMasterBalance, setXvonOfVdpMasterBalance ] = useState(0)
  const [ vdpTotalSupplyAmount , setVdpTotalSupplyAmount] = useState(0)
  const web3 = useWeb3()

  const hideInput = false
  let haveBalance = false
  let haveInput = false

  const handleTypeInput = useCallback((value: string) => {
    setValueInput(value)
  }, [])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyMaxAmount)

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      +maxAmountInput.toExact() >= 1000 ? setValueInput('1000') : setValueInput(maxAmountInput.toExact())
    }
  }, [maxAmountInput])

  if (currencyMaxAmount) {
    // if not token's holder cant use button
    haveBalance = +currencyMaxAmount.toSignificant(18) !== 0
  }

  if (+valueInput > 0) {
    // if value of input < max amount can't use button
    if (currencyMaxAmount) {
      haveInput = +valueInput <= +currencyMaxAmount.toSignificant(18)
    }
  }

  useEffect(() => {
    if(!isRedeem) {
      setXvonFeeDisplay(+valueInput * 0.1)
    }else {
      xvonBalances.then((res) => setXvonOfVdpMasterBalance(+web3.utils.fromWei(res.toString())))
      vdpTotalSupply.then((res) => setVdpTotalSupplyAmount(+web3.utils.fromWei(res.toString())))
      setXvonFeeDisplay((+valueInput * xvonOfVdpMasterBalance) / vdpTotalSupplyAmount)
    }
  }, [isRedeem, valueInput, vdpTotalSupply, vdpTotalSupplyAmount, web3.utils, xvonBalances, xvonOfVdpMasterBalance])

  return (
    <Modal title={!isRedeem ? 'MINT VDP' : 'REDEEM BUSD'} onDismiss={onDismiss}>
      <Flex justifyContent="center" flexDirection="column" alignItems="center">
        <Details>
          <Text
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {totalAvailable} {!isRedeem ? 'BUSD' : 'VDP'} Available
          </Text>
        </Details>
        <InputPanel>
          <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected>
            {!hideInput && (
              <>
                <NumericalInput className="token-amount-input" value={valueInput} onUserInput={handleTypeInput} />
                {account && (
                  <Button disabled={!showMaxButton} onClick={handleMaxInput} scale="sm" variant="text">
                    MAX
                  </Button>
                )}
              </>
            )}
            <CurrencySelect selected={!!currency}>
              <Aligner>
                {currency ? <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} /> : null}
                <Text id="pair">
                  {currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length
                      )}`
                    : currency?.symbol}
                </Text>
              </Aligner>
            </CurrencySelect>
          </InputRow>
        </InputPanel>

        <Details>
          <Text
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              fontSize: '12px',
              marginBottom: '24px',
            }}
          >
            {!isRedeem
              ? `Use ${xvonFeeDisplay} xVON as a fee.`
              : `Use ${xvonFeeDisplay.toFixed(3)} xVON as a fee(vary according to the amount of total supply)`}
          </Text>
        </Details>

        <Row style={{ marginTop: '16px' }}>
          <Button variant="tertiary" onClick={onDismiss}>
            Cancel
          </Button>
          <Button
            disabled={
              disabledConformButton || !haveBalance || !haveInput || loading || loadingStatus || +valueInput > 1000
            }
            variant="primary"
            onClick={
              !isRedeem
                ? () =>
                    deposit(valueInput, () => setValueInput('0'))
                      .catch((err) => console.error(err))
                      .finally(onDismiss)
                : () =>
                    withdraw(valueInput, () => setValueInput('0'))
                      .catch((err) => console.error(err))
                      .finally(onDismiss)
            }
          >
            Confirm
          </Button>
        </Row>
        <FooterContent>
          <Text style={{ fontWeight: 'bold' }}>WARNING:</Text>
          <Text style={{ fontSize: '14px', fontWeight: 'bold', color: '#D70026' }}>
            Maximum mint/redeem is 1,000 BUSD or VDP per a round
          </Text>
          <Text style={{ fontSize: '14px' }}>
            VDP are used to back BUSD. If all BUSD are used up, it is not possible to sell it until new income refills
            the bank.
          </Text>
        </FooterContent>
      </Flex>
    </Modal>
  )
}

export default MintRedeemTransactionsModal