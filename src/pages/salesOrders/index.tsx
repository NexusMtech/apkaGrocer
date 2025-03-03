import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesOrders } from "../slices/salesOrderSlice";
import Loader from "../components/Loader";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

const SalesOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.salesOrders);

  useEffect(() => {
    dispatch(fetchSalesOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/salesOrders/${orderId}`);
  };

  return (
    <div>
      <h2>Sales Orders</h2>
      {loading ? <Loader /> : <Table data={orders} onRowClick={handleRowClick} />}
    </div>
  );
};

export default SalesOrderList;
