import { createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "../model/CategoryType";

const initialState: { categories: CategoryType[] } = {
    categories: []
}
const categoriesSlice = createSlice({
    initialState,
    name: 'categoriesState',
    reducers: {
        setCategories: (state, data) => {
            state.categories = data.payload;
        }
    }
})

export const categoriesActions = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;