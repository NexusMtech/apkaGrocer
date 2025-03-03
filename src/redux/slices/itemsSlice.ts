import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
    const response = await api.get("/items");
    return response.data;
});

interface ItemsState {
    items: any[];
    loading: boolean;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default itemsSlice.reducer;
