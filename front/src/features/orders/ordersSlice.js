import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'

const initialState = {
    orders: []
}

export const addOrder = createAsyncThunk(
    '/orders/add',
    async (data) => {
        const resposne = await axios.post('/orders', data, { credentials: true })
        return resposne
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(addOrder.pending, (state, action) => {

            })
            .addCase(addOrder.fulfilled, (state, action) => {
                console.log(action.payload);
            })
    }
})

export const { } = ordersSlice.actions

export default ordersSlice.reducer