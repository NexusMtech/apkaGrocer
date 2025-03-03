import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../api";

interface InventoryItem {
  id: string;
  name: string;
  available_units: number;
  cost_price: number;
  sale_price: number;
  margin: number;
}

interface InventoryState {
  inventory: InventoryItem[];
  inventoryDetail: InventoryItem | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: InventoryState = {
  inventory: [],
  inventoryDetail: null,
  loading: false,
  error: null,
};

// Async Actions
export const fetchInventory = createAsyncThunk("inventory/fetch", async () => {
  const response = await api.get("/inventory");
  return response.data;
});

export const fetchInventoryDetail = createAsyncThunk(
  "inventory/fetchDetail",
  async (id: string) => {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  }
);

export const addInventory = createAsyncThunk(
  "inventory/add",
  async (inventoryData: Partial<InventoryItem>) => {
    const response = await api.post("/inventory", inventoryData);
    return response.data;
  }
);

export const updateInventory = createAsyncThunk(
  "inventory/update",
  async ({ id, data }: { id: string; data: Partial<InventoryItem> }) => {
    const response = await api.put(`/inventory/${id}`, data);
    return response.data;
  }
);

// Slice
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action: PayloadAction<InventoryItem[]>) => {
        state.loading = false;
        state.inventory = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventory";
      })

      .addCase(fetchInventoryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryDetail.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        state.loading = false;
        state.inventoryDetail = action.payload;
      })
      .addCase(fetchInventoryDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventory details";
      })

      .addCase(addInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInventory.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        state.loading = false;
        state.inventory.push(action.payload);
      })
      .addCase(addInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add inventory item";
      })

      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        state.loading = false;
        const index = state.inventory.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.inventory[index] = action.payload;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update inventory item";
      });
  },
});

// Selector
export const selectInventory = (state: RootState) => state.inventory;

export default inventorySlice.reducer;
