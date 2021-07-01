import addresses from 'constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID || '96'

export const getSaltAddress = () => addresses.von[chainId]
export const getCakeAddress = () => addresses.von[chainId]
export const getMasterChefAddress = () => addresses.masterChef[chainId]
export const getMulticallAddress = () => addresses.mulltiCall[chainId]
export const getWbnbAddress = () => addresses.wbnb[chainId]
export const getLotteryAddress = () => addresses.lottery[chainId]
export const getLotteryTicketAddress = () => addresses.lotteryNFT[chainId]
