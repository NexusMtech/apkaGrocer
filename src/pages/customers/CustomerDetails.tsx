import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCustomerById } from "../../store/customersSlice";
import { RootState, AppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Typography, Paper } from "@mui/material";

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { customer, loading } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    if (id) dispatch(fetchCustomerById(id));
  }, [dispatch, id]);

  if (loading) return <CircularProgress />;
  if (!customer) return <Typography>No Customer Found</Typography>;

  return (
    <Container>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">{customer.businessinfo.businessname}</Typography>
        <Typography>Phone: {customer.businessinfo.phonenumber}</Typography>
        <Typography>GSTIN: {customer.businessinfo.gstin}</Typography>
        <Typography>City: {customer.address.city}</Typography>
        <Typography>State: {customer.address.state}</Typography>
        <Typography>Remarks: {customer.remarks}</Typography>
      </Paper>
    </Container>
  );
};

export default CustomerDetail;
