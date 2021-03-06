import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from 'the-vonder-uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
        <ButtonMenuItem id="mint-nav-link" to="/mintredeem" as={Link}>
          ROYAL Bank
        </ButtonMenuItem>
{/*        <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://exchange.tuktuk.finance/#/swap?inputCurrency=0xDa91a1aee4d7829c118cD6218CDA2cB2C56dd010"
          target="_blank"
          rel="noreferrer noopener"
        >
          WKUB to KUB
        </ButtonMenuItem> */}
{/*        <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://exchange.tuktuk.finance/#/swap?outputCurrency=0xED7B8606270295d1b3b60b99c051de4D7D2f7ff2"
          target="_blank"
          rel="noreferrer noopener"
        >
          Get kDAI
        </ButtonMenuItem> */}

      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
