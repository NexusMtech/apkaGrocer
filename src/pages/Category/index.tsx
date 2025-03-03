import { Box, IconButton, Typography, Container, Paper, Skeleton, Chip, Button } from "@mui/material";
import CommonTable from "../../components/Table";
import CategoryForm from "./AddCategoryForm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../redux/thunk/categoryThunk";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import RefreshIcon from '@mui/icons-material/Refresh';
import './category.css';

interface Category {
  id: number;
  name: string;
  _id: string;
}

const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);

  const [openModal, setOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = (data: { name: string }) => {
    if (editingCategory) {
      dispatch(updateCategory(editingCategory._id, data.name));
      setEditingCategory(null);
    } else {
      dispatch(createCategory(data.name));
    }
    setOpenModal(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpenModal(true);
    setIsEdit(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const handleRefresh = () => {
    dispatch(fetchCategories());
  };

  const columns = [
    {
      id: "sno",
      label: "S No.",
      width: "80px"
    },
    {
      id: "category_name",
      label: "Category Name"
    },
    {
      id: "actions",
      label: "Actions",
      width: "120px"
    },
  ];

  const rows = categories.categories.map((category: Category, index: number) => ({
    sno: index + 1,
    category_name: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box className="category-icon-container">
          <CategoryIcon fontSize="small" />
        </Box>
        <Typography fontWeight={500}>
          {category.name}
        </Typography>
      </Box>
    ),
    actions: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => handleEdit(category)}
          className="edit-button"
          size="small"
        >
          <EditIcon  
          className="iconEdit"
          fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(category._id)}
          className="delete-button"
          size="small"
        >
          <DeleteIcon 
          className="iconDelete"
          fontSize="small" 
          />
        </IconButton>
      </Box>
    ),
  }));

  return (
    <Box>
      <Container>
        <Box className="category-container">
          <CategoryForm
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setIsEdit(false);
            }}
            onSubmit={handleAddCategory}
            initialData={editingCategory}
            isEdit={isEdit}
          />

          {/* Header Section */}
          <Box className="category-header">
            <Box className="category-header-title">
              <Typography variant="h5" fontWeight={600}>
                Product Categories
              </Typography>
              <Typography variant="body2">
                Manage the categories for your grocery products
              </Typography>
            </Box>

            <Box className="header-buttons">
              <Button
                variant="outlined"
                onClick={handleRefresh}
                startIcon={<RefreshIcon />}
                className="refresh-button"
              >
                Refresh
              </Button>

              <Button
                onClick={() => {
                  setEditingCategory(null);
                  setOpenModal(true);
                  setIsEdit(false);
                }}
                startIcon={<AddIcon />}
                className="add-button"
              >
                Add Category
              </Button>
            </Box>
          </Box>

          {/* Info Strip */}
          <Box className="info-strip">
            <Chip
              label={`${categories.categories.length} Categories`}
              size="small"
              className="category-chip"
            />
          </Box>

          {/* Content */}
          <Box className="content-section">
            {categories.loading ? (
              <Paper elevation={0} className="skeleton-container">
                <Box className="skeleton-header">
                  <Skeleton variant="text" width="30%" height={30} />
                </Box>
                <Box className="skeleton-content">
                  {[1, 2, 3, 4].map((item) => (
                    <Skeleton key={item} variant="rectangular" className="skeleton-item" />
                  ))}
                </Box>
              </Paper>
            ) : (
              <Paper elevation={0} className="table-container">
                <Box>
                  <CommonTable
                    columns={columns}
                    rows={rows}
                    className="custom-table"
                  />
                </Box>

                {categories.categories.length === 0 && (
                  <Box className="empty-state">
                    <Box className="empty-icon-container">
                      <CategoryIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h6" className="empty-title">
                      No Categories Found
                    </Typography>
                    <Typography className="empty-description">
                      You haven't added any product categories yet. Click the button below to create your first category.
                    </Typography>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setEditingCategory(null);
                        setOpenModal(true);
                      }}
                      startIcon={<AddIcon />}
                      className="add-button"
                    >
                      Add First Category
                    </Button>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Category;