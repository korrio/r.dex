import { useEffect, useState, useCallback } from 'react'
import contracts from 'constants/contracts'
import { Farm, FarmConfig, QuoteToken } from 'constants/types'
import multicall from 'utils/multicall'
import erc20 from 'constants/abis/erc20.json'
import BigNumber from 'bignumber.js'
import { useDispatch } from 'react-redux'
import useRefresh from './useRefresh'
import { updateVonderPriceUSD } from 'state/price/actions'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID || '96'

const farmsConfig: FarmConfig[] = [{
  pid: 2,
  risk: 3,
  lpSymbol: 'VON-KUB',
  lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      25925: '0x69f64bC140A95607B6604E8ACA96d9Cce2b235C3', // VON-WKUB
      96: '0xf1047345b3821729BE43A3BE35086a2635E5f08a', // VON-KKUB LP
  },
  tokenSymbol: 'VON',
  tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      25925: '0xb167658b19e5BcD3a6106E6C6B73c8c35f1D6bfe', // VON
      96: '0x19dade57B0BBCE7D5E859ba02846820f5c0c2b09', // VON
  },
  quoteTokenSymbol: QuoteToken.KKUB,
  quoteTokenAdresses: contracts.kkub,
  isMasterChef: true,
  isTokenOnly: false
},
{
  pid: 3,
  risk: 3,
  lpSymbol: 'KUB-TST2',
  lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
      25925: '0x83689C9855e0C046d5CBCf2D8B12dA9e048C3Fe8', // VON-KUSDT
      96: '0x91b72E4C18b64646103C9968401FD62CF5a7679c', // KKUB-VDP LP
  },
  tokenSymbol: 'KUB',
  tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      25925: '0xb167658b19e5BcD3a6106E6C6B73c8c35f1D6bfe', // VON
      96: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5', // KUB
  },
  quoteTokenSymbol: QuoteToken.BUSD,
  quoteTokenAdresses: contracts.busd,
  isMasterChef: true,
  isTokenOnly: true
},]

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[CHAIN_ID]
      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAdress,
          name: 'balanceOf',
          params: [contracts.masterChef[CHAIN_ID]],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals
      ] = await multicall(erc20, calls)

      let tokenAmount
      let tokenPriceVsQuote
      if(farmConfig.isTokenOnly){
        tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals))
        if(farmConfig.tokenSymbol === QuoteToken.BUSD && farmConfig.quoteTokenSymbol === QuoteToken.BUSD){
          tokenPriceVsQuote = new BigNumber(1)
        }else{
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP))
        }
      }else{
        // Ratio in % a LP tokens that are in staking, vs the total number in circulation
        const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(quoteTokenDecimals))
          .times(lpTokenRatio)

        if(tokenAmount.comparedTo(0) > 0){
          tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
        }else{
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP))
        }
      }

      return {
        ...farmConfig,
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
      }
    })
  )
  return data
}

const useGetPriceData = () => {
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  const [data, setData] = useState<BigNumber>(new BigNumber(0))

  const getFarmFromPid = useCallback(
    (pid, farmsData): Farm => {
      const farm = farmsData.find((f) => f.pid === pid)
      return farm
    },
    []
  )

  const getPriceVonUsd = useCallback(
    async (farmsData: Farm[]) => {
      const pid = 3 // VON-TST2 LP ถูกต้อง // 0.54
      const farm1 = await getFarmFromPid(pid, farmsData)

      const pid2 = 2 // VON-TST2 LP ถูกต้อง // 0.73
      const farm2 = await getFarmFromPid(pid2, farmsData)

      const thePrice1 = new BigNumber(farm1.tokenPriceVsQuote || new BigNumber(0))
      const thePrice2 = new BigNumber(farm2.tokenPriceVsQuote || new BigNumber(0))

      const vonPriceUsd = thePrice1.times(thePrice2)

      return farm1.tokenPriceVsQuote ? vonPriceUsd : new BigNumber(0)
    },
    [getFarmFromPid]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farms = await fetchFarms()

        if (farms) {
          const price = await getPriceVonUsd(farms)
          setData(price)
          dispatch(updateVonderPriceUSD({
            vonderPriceUSD: price.toNumber()
          }))
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [getPriceVonUsd, setData, dispatch, fastRefresh])

  return data
}

export default useGetPriceData
