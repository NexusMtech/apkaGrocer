import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../store/customersSlice";
import { RootState, AppDispatch } from "../store/store";
import { CircularProgress, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const CustomersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, loading } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Customers List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Business Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.businessinfo.businessname}</TableCell>
                <TableCell>{customer.businessinfo.phonenumber}</TableCell>
                <TableCell>{customer.address.city}</TableCell>
                <TableCell>
                  <Link to={`/customers/${customer.id}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomersList;
