import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/Login";
import Layout from "./components/Layout";
import { store } from "./redux/store";
import Items from "./pages/Items";
import { Box } from "@mui/material";
import Category from "./pages/Category";

interface Props {
  children: React.ReactElement;
}

const ProtectedRoute = (props: Props) => {
    const { children } = props;
    const token = localStorage.getItem('token');
    return token ? 
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: "240px"}}>
        <Layout />
        {children}
      </Box>
     : <Navigate to="/login" />;
};

function App() {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                } />
              <Route path="/category" element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              } />
              <Route path="/items" element={
                  <ProtectedRoute>
                    <Items />
                  </ProtectedRoute>
                } />
          </Routes>
        </Router>
      </Provider>
    );
}

export default App;
