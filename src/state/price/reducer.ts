import { createReducer } from '@reduxjs/toolkit'
import {
  updateVonderPriceUSD
} from './actions'


export interface PriceState {
  vonderPriceUSD: number
}

export const initialState: PriceState = {
  vonderPriceUSD: 0,
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVonderPriceUSD, (state, action) => {
      state.vonderPriceUSD = action.payload.vonderPriceUSD
    })
)