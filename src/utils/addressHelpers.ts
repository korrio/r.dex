import addresses from 'constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID || '56'

export const getCakeAddress = () => addresses.royx[chainId]
export const getRoyAddress = () => addresses.roy[chainId]
export const getVdpAddress = () => addresses.roy[chainId]
export const getRoyXAddress = () => addresses.royx[chainId]
export const getBusdAddress = () => addresses.busd[chainId]
export const getMasterChefAddress = () => addresses.masterChef[chainId]
export const getMulticallAddress = () => addresses.mulltiCall[chainId]
export const getWbnbAddress = () => addresses.wbnb[chainId]
export const getLotteryAddress = () => addresses.lottery[chainId]
export const getLotteryTicketAddress = () => addresses.lotteryNFT[chainId]
export const getRoyMasterAddress = () => addresses.roymaster[chainId]
export const getVdpMasterAddress = () => addresses.roymaster[chainId]
