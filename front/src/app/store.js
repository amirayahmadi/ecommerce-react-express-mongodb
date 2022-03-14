import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';
import shopReducer from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
import wishReducer from '../features/wishlist/wishSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    shop: shopReducer,
    cart: cartReducer,
    orders: ordersReducer,
    wishes: wishReducer
  },
});