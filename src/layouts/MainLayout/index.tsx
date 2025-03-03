import Sidebar from "../../components/Sidebar";
import Breadcrumb from "../../components/Breadcrumb";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={2}>
        <Breadcrumb />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
