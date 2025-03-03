import { Drawer, List, ListItem, ListItemText, Typography, Box, CssBaseline } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240; // Sidebar width

const SidebarBelowAppbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Theme color from the reference image (red/crimson)
  const themeColor = 'linear-gradient(135deg, #a81c1c 0%,rgb(244, 66, 66) 50%, #a81c1c 100%)';
  const hoverEffect = 'linear-gradient(135deg,rgb(241, 52, 52) 0%,rgb(255, 83, 83) 50%,rgb(214, 34, 34) 100%)';
  const hoverColor = '#fff';
  
  const menuItems = [
    { text: "Category", icon: <CategoryIcon />, route: "/category" },
    { text: "Items", icon: <ShoppingBasketIcon />, route: "/items" },
    { text: "Inventory", icon: <InventoryIcon />, route: "/inventory" },
    { text: "Settings", icon: <SettingsIcon />, route: "/settings" },
    { text: "Logout", icon: <LogoutIcon />, route: "/login" }
  ];

  const handleItemClick = (text, route) => {
    if(text === 'Logout') {
      localStorage.removeItem('token');
    }
    navigate(route);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
          },
        }}
      >
        <Box sx={{
          color: "#000",
          padding: 2,
          display: 'flex',
          px: 4,
        }}>
          <Typography variant="h6" fontWeight="bold" color="#000">
            Apka
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="rgb(222, 0, 0)">
            Grocer
          </Typography>
        </Box>
        
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.route;
            
            return (
              <ListItem 
                button 
                key={item.text}
                onClick={() => handleItemClick(item.text, item.route)}
                sx={{
                  padding: 1,
                  '& .MuiTypography-root:hover': {
                    color: hoverColor + '!important',
                  }
                }}
              >
                <Box 
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    background: isSelected ? themeColor : 'transparent',
                    borderRadius: "10px",
                    px: 2,
                    py: 0.5,
                    '&:hover': {
                      background: hoverEffect,
                    },
                    '&:hover .MuiSvgIcon-root': {
                      color: hoverColor,
                    },
                    '&:hover .MuiTypography-root': {
                      color: hoverColor + '!important',
                    }
                  }}
                >
                  <Box 
                    sx={{
                      mr: 1,
                      display: 'flex',
                      alignItems: 'center',
                      '& .MuiSvgIcon-root': {
                        color: isSelected ? hoverColor : 'rgba(0,0,0,0.6)',
                      }
                    }}
                  >
                    {item.icon}
                  </Box>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontWeight: isSelected ? 500 : 400,
                        color: isSelected ? hoverColor : 'rgba(0,0,0,0.8)',
                        transition: 'color 0.2s',
                      }
                    }}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default SidebarBelowAppbar;