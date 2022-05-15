import { createSlice } from '@reduxjs/toolkit'
import { AppStateType, Cart, Dropdown} from 'types'

const initialState: AppStateType = {
  products: [],
  categories: [],
  cart: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCart(state, { payload }: { payload: Cart }) {
      const checkCartItem = state.cart.find((item) => +item.id === +payload.id)
      // console.log(checkCartItem)
      console.log(payload)
      if (!checkCartItem) {
        const product = { ...payload, quantity: +1 }
        state.cart.push(product)
        //console.log('state', JSON.stringify(state.cart))
      } else {
        //console.log(JSON.stringify(checkCartItem))
        checkCartItem.quantity += 1
      }
      console.log('state', JSON.stringify(state.cart))
    },
    updateCart(state, { payload }: { payload: Dropdown }) {
      console.log(payload)
      const itemToUpdate = state.cart.find((item) => item.id === payload.id)
      //console.log(JSON.stringify(itemToUpdate))
      if (itemToUpdate) {
        itemToUpdate.quantity = +payload.value
      }
    },
    removeItem(state, { payload }: { payload: Number }) {
      const newCart = state.cart.filter((item) => +item.id !== payload)
      if (newCart) {
        state.cart = newCart
      }
    },
  },
})

export const { setCart, updateCart, removeItem } =
  appSlice.actions

export default appSlice.reducer
