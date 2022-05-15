import { createSlice } from '@reduxjs/toolkit'
import { AppStateType, CartItem, Category, Product } from 'types'

const initialState: AppStateType = {
  products: [],
  categories: [],
  cart: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts: (state, { payload }: { payload: Product[] }) => {
      state.products = payload
    },
    setCategories(state, { payload }: { payload: Category[] }) {
      state.categories = payload
    },
    setCart(state, { payload }: { payload: Product }) {
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
    updateCart(state, { payload }: any) {
      console.log(payload)
      const itemToUpdate = state.cart.find((item) => item.id === payload.id)
      //console.log(JSON.stringify(itemToUpdate))
      if (itemToUpdate) {
        itemToUpdate.quantity = payload.value
      }
    },
    removeItem(state, { payload }: any) {
      const newCart = state.cart.filter((item) => item.id !== payload)
      if (newCart) {
        state.cart = newCart
      }
    },
  },
})

export const { setProducts, setCategories, setCart, updateCart, removeItem } =
  appSlice.actions

export default appSlice.reducer
