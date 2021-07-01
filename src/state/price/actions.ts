import { createAction } from '@reduxjs/toolkit'

export const updateVonderPriceUSD = createAction<{
  vonderPriceUSD: number
}>('price/updateVonderPriceUSD')

export default createAction
