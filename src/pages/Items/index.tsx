import { Box } from "@mui/material";
import Button from "../../components/Button";
import CommonTable from "../../components/Table";
import CommonModal from "../../components/Modal";

const Items = () => {
    const columns = [
        { id: "name", label: "Name" },
        { id: "age", label: "Age" },
        { id: "city", label: "City" },
      ];
      
      const rows = [
        { name: "John", age: 28, city: "New York" },
        { name: "Alice", age: 24, city: "Los Angeles" },
      ];
      
    return (
        <Box>
            <CommonModal open={false} onClose={function (): void {
                throw new Error("Function not implemented.");
            } } children={undefined} />
            <Box sx={{ textAlign: 'end', marginBottom: '10px'}} >
                <Button variant="primary">
                    Add Items
                </Button>
            </Box>
            <CommonTable columns={columns} rows={rows} />
        </Box>
    )
}

export default Items;