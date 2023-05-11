import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { categoriesReducer } from "./categoriesSlice";
import { codeReducer } from "./codeSlice";
import { productsReducer } from "./productsSlice";
import { shoppingReducer } from "./shoppingSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        codeState: codeReducer,
        productsState: productsReducer,
        shoppingState: shoppingReducer,
        categoriesState: categoriesReducer
    }
})