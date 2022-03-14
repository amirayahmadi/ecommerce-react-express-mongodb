// state = donnée
// les actions
// desactiosn qui déponde de la communication avec le serveur : extrardducers + asyncthunk
// les actions que ne dépond pas de la communication avec le serveur : reducers

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axios'
import { apis } from '../../config/apisurls'

// state initiale

const initialState = {
    searchOptions: {
        keyword: '',
        category: '',
        pageSize: 9,
        currentPage: 1,
        price: 0
    },
    highPrice: 0,
    total: 0,
    products: []
}

// creation du slice

export const Search = createAsyncThunk(
    'search',
    async (data) => {
        const response = await axios.get(apis.products.search, { params: data })
        return response
    }
);


export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setSearchOptions: (state, action) => {
            console.log('from slice', action.payload);
            const { name, value } = action.payload
            const obj = { ...state.searchOptions, [name]: value }
            console.log(obj);
            state.searchOptions = obj
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Search.pending, (state) => {

            })
            .addCase(Search.fulfilled, (state, action) => {
                console.log(action.payload);
                state.total = action.payload.data.total
                state.highPrice = action.payload.data.maxPrice
                state.products = action.payload.data.data
            })
            .addCase(Search.rejected, (state, action) => {

            });
    }
})

export const { setSearchOptions } = shopSlice.actions

export default shopSlice.reducer