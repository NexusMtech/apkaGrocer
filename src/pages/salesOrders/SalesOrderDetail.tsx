import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesOrderDetail } from "../slices/salesOrderSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const SalesOrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orderDetail, loading } = useSelector((state) => state.salesOrders);

  useEffect(() => {
    dispatch(fetchSalesOrderDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Sales Order Detail</h2>
      {loading ? (
        <Loader />
      ) : (
        <pre>{JSON.stringify(orderDetail, null, 2)}</pre>
      )}
    </div>
  );
};

export default SalesOrderDetail;
