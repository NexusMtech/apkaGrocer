import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import { loginUser } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";

// Validation Schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        navigate("/");
    }
  }, [])

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await dispatch(loginUser(data), navigate);
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/"); // Redirect to dashboard on success
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
