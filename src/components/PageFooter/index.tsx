import React from 'react'
import styled from 'styled-components'
import { Flex } from 'the-vonder-uikit'

interface PageFooterProps {
  vdpBalance?: string
  busdRedeemableBalance?: string
}

const StyledPageHeader = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const TextTitle = styled.div`
  flex: .4;
  font-weight: 600;
  align-self: center;
`
const VDPValue = styled.div`
  flex: 0.6;
  text-align: right;
`


const PageFooter = ({ vdpBalance = '0', busdRedeemableBalance = '0' }: PageFooterProps) => {
  return (
    <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Row>
            <TextTitle>You Own:</TextTitle>
            <VDPValue>{vdpBalance} ROY</VDPValue>
          </Row>
          <Row style={{ marginTop: '8px' }}>
            <TextTitle>Redeemable Quota:</TextTitle>
            <VDPValue>{busdRedeemableBalance} BUSD</VDPValue>
          </Row>
        </Details>
      </Flex>
    </StyledPageHeader>
  )
}

export default PageFooter