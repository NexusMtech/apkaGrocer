import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import itemsReducer from "./slices/itemsSlice";
import inventoryReducer from "./slices/inventorySlice";
import salesReducer from "./slices/salesSlice";
import customerReducer from "./slices/customerSlice";
import categoryReducer from "./slices/categorySlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsReducer,
        inventory: inventoryReducer,
        sales: salesReducer,
        customers: customerReducer,
        categories: categoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
