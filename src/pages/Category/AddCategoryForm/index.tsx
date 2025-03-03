import React, { useEffect } from "react";
import { 
  Modal, 
  Box, 
  TextField, 
  Button as MuiButton, 
  Typography, 
  IconButton,
  InputAdornment,
  alpha,
  useTheme,
  Button
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import SaveIcon from '@mui/icons-material/Save';


interface Category {
  id?: number;
  name: string;
  _id?: string;
}

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
  isEdit: boolean;
  initialData: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  open,
  onClose,
  onSubmit,
  isEdit,
  initialData,
}) => {
  const theme = useTheme();
  const { control, handleSubmit, reset } = useForm<{ name: string }>();

  const handleFormSubmit = (data: { name: string }) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (isEdit && initialData) {
      reset({
        name: initialData.name,
      });
    } else {
      reset({ name: "" });
    }
  }, [isEdit, initialData, reset, open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="category-form-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%", // Restored this line to center the modal vertically
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          maxWidth: "100%",
          outline: "none",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header with gradient background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #a81c1c 0%,rgb(244, 66, 66) 50%, #a81c1c 100%)",
            color: "white",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CategoryIcon sx={{ fontSize: 24 }} />
            <Typography
              id="category-form-title"
              variant="h6"
              component="h2"
              sx={{
                fontWeight: 600,
              }}
            >
              {isEdit ? "Edit Category" : "Add New Category"}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Content */}
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3,
                color: alpha(theme.palette.text.primary, 0.7),
              }}
            >
              {isEdit 
                ? "Update the category name below. This will be reflected throughout your grocery store."
                : "Enter a name for your new product category. Your customers will see this when browsing products."}
            </Typography>
            
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Category name is required",
                minLength: {
                  value: 2,
                  message: "Category name must be at least 2 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Category Name"
                  placeholder="e.g. Fruits, Vegetables, Dairy"
                  fullWidth
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      bgcolor: "#f8fafc",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.1)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#4b6cb7",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4b6cb7",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4b6cb7",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon 
                          sx={{ 
                            color: "#4b6cb7",
                            opacity: 0.8
                          }} 
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <MuiButton
                variant="outlined"
                fullWidth
                onClick={onClose}
                sx={{
                  borderRadius: 1.5,
                  py: 1.2,
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: alpha(theme.palette.text.primary, 0.7),
                  background: "#F5F5F5",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    border: "1px solid rgba(0,0,0,0.2)",
                    bgcolor: "#E8E8E8",
                  },
                }}
              >
                Cancel
              </MuiButton>
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="add-button" // Added this className to match the Add Category button
                sx={{
                  borderRadius: 1.5,
                  py: 1,
                  fontSize:"12px",
                  // fontWeight: 600,
                  textTransform: "none",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(75, 108, 183, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(75, 108, 183, 0.4)",
                  },
                }}
                startIcon={<SaveIcon />}
              >
                {isEdit ? "Update" : "Save"} Category
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryForm;