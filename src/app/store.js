import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../rtk-query/api/apiSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})