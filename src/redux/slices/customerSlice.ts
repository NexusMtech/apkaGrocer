import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../api";

interface Customer {
  id: string;
  businessinfo: {
    businessname: string;
    phonenumber: string;
    businesstype: string;
    gstin: string;
  };
  address: {
    street_address: string;
    landmark: string;
    area: string;
    pincode: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  remarks: string;
}

interface CustomerState {
  customers: Customer[];
  customerDetail: Customer | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: CustomerState = {
  customers: [],
  customerDetail: null,
  loading: false,
  error: null,
};

// Async Actions
export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const response = await api.get("/customers");
  return response.data;
});

export const fetchCustomerDetail = createAsyncThunk(
  "customers/fetchDetail",
  async (id: string) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  }
);

export const addCustomer = createAsyncThunk(
  "customers/add",
  async (customerData: Partial<Customer>) => {
    const response = await api.post("/customers", customerData);
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }: { id: string; data: Partial<Customer> }) => {
    const response = await api.put(`/customers/${id}`, data);
    return response.data;
  }
);

// Slice
const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch customers";
      })

      .addCase(fetchCustomerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerDetail.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.customerDetail = action.payload;
      })
      .addCase(fetchCustomerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch customer details";
      })

      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add customer";
      })

      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        const index = state.customers.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.customers[index] = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update customer";
      });
  },
});

// Selector
export const selectCustomers = (state: RootState) => state.customers;

export default customersSlice.reducer;
