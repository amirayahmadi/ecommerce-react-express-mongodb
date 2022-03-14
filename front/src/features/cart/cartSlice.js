import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products = [...state.products  , action.payload]
        },
        quatityChanged: (state, action) => {
            state.products = action.payload.newCart
        }
    },
    extraReducers: {}
})

export const { addProduct, quatityChanged } = cartSlice.actions

export default cartSlice.reducer