import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/itemsSlice";
import { Button, TextField, Box, Typography } from "@mui/material";

// ✅ Validation Schema
const schema = yup.object({
  name: yup.string().required("Item name is required"),
  inventoryUnit: yup.string().required("Inventory unit is required"),
  cost: yup.number().positive().required("Cost is required"),
  price: yup.number().positive().required("Price is required"),
}).required();

const AddItem = () => {
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const margin = ((data.price - data.cost) / data.cost) * 100;
    dispatch(addItem({ ...data, margin }));
    reset();
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>Add Item</Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Item Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        
        <TextField
          label="Inventory Unit"
          fullWidth
          margin="normal"
          {...register("inventoryUnit")}
          error={!!errors.inventoryUnit}
          helperText={errors.inventoryUnit?.message}
        />

        <TextField
          label="Cost"
          type="number"
          fullWidth
          margin="normal"
          {...register("cost")}
          error={!!errors.cost}
          helperText={errors.cost?.message}
        />

        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
