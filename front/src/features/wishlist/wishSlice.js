import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'
const initialState = {
    wishes: []
}

export const addWish = createAsyncThunk(
    'wish/add',
    async (data) => {
        const response = await axios.post('/wishes', data, { credentials: 'inculde' })
        return response
    }
);
export const getWishes = createAsyncThunk(
    'wish/get',
    async () => {
        const response = await axios.get('/wishes', { credentials: 'inculde' })
        return response
    }
);


const wishSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
      
    },
    extraReducers: builder => {

        builder.addCase(addWish.fulfilled, (state, action) => {
            state.wishes.push(action.payload.data)
        })
        builder.addCase(getWishes.fulfilled, (state, action) => {
            state.wishes = action.payload.data
        })
    }
})

export const {} = wishSlice.actions

export default wishSlice.reducer