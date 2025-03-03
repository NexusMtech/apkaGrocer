import { AppDispatch } from "../store";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../slices/categorySlice";
import api from "../api";

// ✅ Fetch Categories Thunk
export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCategoriesStart()); // 🔥 Start loading
    const response = await api.get("/category/list");
    dispatch(fetchCategoriesSuccess(response.data)); // ✅ Set categories
  } catch (error: any) {
    dispatch(fetchCategoriesFailure(error.message || "Failed to fetch categories"));
  }
};

// ✅ Create Category Thunk
export const createCategory = (categoryName: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCategoriesStart()); // 🔥 Start loading
    await api.post("/category/add", { name: categoryName });
    dispatch(fetchCategories()); // ✅ Add new category
  } catch (error: any) {
    dispatch(fetchCategoriesFailure(error.message || "Failed to add category"));
  }
};

export const updateCategory = (id: string, categoryName: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchCategoriesStart()); // 🔥 Start loading
        await api.put("/category/update/"+id, { name: categoryName });
        dispatch(fetchCategories()); // ✅ Add new category
    } catch (error: any) {
        dispatch(fetchCategoriesFailure(error.message || "Failed to add category"));
    }
};

export const deleteCategory = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchCategoriesStart()); // 🔥 Start loading
        await api.delete("/category/delete/"+id);
        dispatch(fetchCategories()); // ✅ Add new category
    } catch (error: any) {
        dispatch(fetchCategoriesFailure(error.message || "Failed to add category"));
    }
};
