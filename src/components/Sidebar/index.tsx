import { Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: "Items", path: "/items" },
    { text: "Inventory", path: "/inventory" },
    { text: "Sales Orders", path: "/sales-orders" },
    { text: "Customers", path: "/customers" }
  ];

  return (
    <Drawer variant="permanent">
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
