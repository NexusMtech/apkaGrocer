import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { salesOrdersApi } from "../../../api";

// Types
export interface SalesOrderItem {
  id: string;
  customerName: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface SalesOrderDetail extends SalesOrderItem {
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface SalesOrderState {
  salesOrders: SalesOrderItem[];
  salesOrderDetail: SalesOrderDetail | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: SalesOrderState = {
  salesOrders: [],
  salesOrderDetail: null,
  loading: false,
  error: null,
};

// Async Actions
export const fetchSalesOrders = createAsyncThunk(
  "salesOrder/fetch",
  async () => {
    const response = await salesOrdersApi.getAll();
    return response.data;
  }
);

export const fetchSalesOrderDetail = createAsyncThunk(
  "salesOrder/fetchDetail",
  async (id: string) => {
    const response = await salesOrdersApi.getById(id);
    return response.data;
  }
);

export const addSalesOrder = createAsyncThunk(
  "salesOrder/add",
  async (orderData: Omit<SalesOrderDetail, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await salesOrdersApi.create(orderData);
    return response.data;
  }
);

export const updateSalesOrder = createAsyncThunk(
  "salesOrder/update",
  async ({ id, data }: { id: string; data: Partial<Omit<SalesOrderDetail, 'id' | 'createdAt' | 'updatedAt'>> }) => {
    const response = await salesOrdersApi.update(id, data);
    return response.data;
  }
);

// Slice
const salesOrderSlice = createSlice({
  name: "salesOrder",
  initialState,
  reducers: {
    clearSalesOrderDetail: (state) => {
      state.salesOrderDetail = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all sales orders
      .addCase(fetchSalesOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesOrders.fulfilled, (state, action: PayloadAction<SalesOrderItem[]>) => {
        state.loading = false;
        state.salesOrders = action.payload;
      })
      .addCase(fetchSalesOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sales orders";
      })

      // Fetch sales order detail
      .addCase(fetchSalesOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesOrderDetail.fulfilled, (state, action: PayloadAction<SalesOrderDetail>) => {
        state.loading = false;
        state.salesOrderDetail = action.payload;
      })
      .addCase(fetchSalesOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sales order details";
      })

      // Add new sales order
      .addCase(addSalesOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSalesOrder.fulfilled, (state, action: PayloadAction<SalesOrderItem>) => {
        state.loading = false;
        state.salesOrders.push(action.payload);
      })
      .addCase(addSalesOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add sales order";
      })

      // Update sales order
      .addCase(updateSalesOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalesOrder.fulfilled, (state, action: PayloadAction<SalesOrderItem>) => {
        state.loading = false;
        const index = state.salesOrders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.salesOrders[index] = action.payload;
        }
      })
      .addCase(updateSalesOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update sales order";
      });
  },
});

// Actions
export const { clearSalesOrderDetail, clearErrors } = salesOrderSlice.actions;

// Selectors
export const selectSalesOrders = (state: RootState) => state.salesOrder.salesOrders;
export const selectSalesOrderDetail = (state: RootState) => state.salesOrder.salesOrderDetail;
export const selectSalesOrderLoading = (state: RootState) => state.salesOrder.loading;
export const selectSalesOrderError = (state: RootState) => state.salesOrder.error;

export default salesOrderSlice.reducer;