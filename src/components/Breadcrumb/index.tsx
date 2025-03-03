import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => (
        <Typography key={index}>{value}</Typography>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
