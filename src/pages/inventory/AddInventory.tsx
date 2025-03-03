import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { addInventory } from "../../redux/slices/inventorySlice";

// Validation Schema
const schema = yup.object({
  name: yup.string().required("Item name is required"),
  quantity: yup.number().positive().integer().required("Quantity is required"),
  costPrice: yup.number().positive().required("Cost price is required"),
  salePrice: yup.number().positive().required("Sale price is required"),
  margin: yup.number().positive().required("Margin is required"),
});

const AddInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(addInventory(data));
    navigate("/inventory");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Inventory Item</h2>
      <TextField {...register("name")} label="Item Name" error={!!errors.name} helperText={errors.name?.message} fullWidth />
      <TextField {...register("quantity")} label="Quantity" type="number" error={!!errors.quantity} helperText={errors.quantity?.message} fullWidth />
      <TextField {...register("costPrice")} label="Cost Price" type="number" error={!!errors.costPrice} helperText={errors.costPrice?.message} fullWidth />
      <TextField {...register("salePrice")} label="Sale Price" type="number" error={!!errors.salePrice} helperText={errors.salePrice?.message} fullWidth />
      <TextField {...register("margin")} label="Margin" type="number" error={!!errors.margin} helperText={errors.margin?.message} fullWidth />
      <Button type="submit" variant="contained" color="primary">Add Inventory</Button>
    </form>
  );
};

export default AddInventory;
