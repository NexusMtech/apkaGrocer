import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "./redx/slices/inventorySlice";
import Loader from "../../components/Loader";
import Table from "../components/Table";

const InventoryList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <div>
      <h2>Inventory List</h2>
      {loading ? <Loader /> : <Table data={items} />}
    </div>
  );
};

export default InventoryList;
