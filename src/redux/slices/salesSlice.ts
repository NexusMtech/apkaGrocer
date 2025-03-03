import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";

interface SalesOrderState {
  salesOrders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesOrderState = {
  salesOrders: [],
  loading: false,
  error: null,
};

// Fetch all sales orders
export const fetchSalesOrders = createAsyncThunk<any[], void>(
  "salesOrders/fetchSalesOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sales-orders");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch sales orders");
    }
  }
);

// Create new sales order
export const createSalesOrder = createAsyncThunk<any, Partial<any>>(
  "salesOrders/createSalesOrder",
  async (salesOrderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/sales-orders", salesOrderData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create sales order");
    }
  }
);

const salesOrderSlice = createSlice({
  name: "salesOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesOrders.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.salesOrders = action.payload;
        state.loading = false;
      })
      .addCase(fetchSalesOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSalesOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalesOrder.fulfilled, (state, action: PayloadAction<any>) => {
        state.salesOrders.push(action.payload);
        state.loading = false;
      })
      .addCase(createSalesOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default salesOrderSlice.reducer;
