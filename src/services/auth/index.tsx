import api from "../../redux/api";

export const login = (data: { email: string; password: string }) =>
    api.post("/auth/login", data);

export const getItems = () => api.get("/items");
export const addItem = (data: any) => api.post("/items", data);
export const updateItem = (id: string, data: any) =>
    api.put(`/items/${id}`, data);
export const deleteItem = (id: string) => api.delete(`/items/${id}`);

export const getInventory = () => api.get("/inventory");
export const addInventory = (data: any) => api.post("/inventory", data);
export const updateInventory = (id: string, data: any) =>
    api.put(`/inventory/${id}`, data);
export const deleteInventory = (id: string) => api.delete(`/inventory/${id}`);

export const getSalesOrders = () => api.get("/sales-orders");
export const getSalesOrderById = (id: string) => api.get(`/sales-orders/${id}`);
export const createSalesOrder = (data: any) => api.post("/sales-orders", data);
export const updateSalesOrder = (id: string, data: any) =>
    api.put(`/sales-orders/${id}`, data);
export const deleteSalesOrder = (id: string) =>
    api.delete(`/sales-orders/${id}`);

export const getCustomers = () => api.get("/customers");
export const getCustomerById = (id: string) => api.get(`/customers/${id}`);
export const addCustomer = (data: any) => api.post("/customers", data);
export const updateCustomer = (id: string, data: any) =>
    api.put(`/customers/${id}`, data);
export const deleteCustomer = (id: string) => api.delete(`/customers/${id}`);