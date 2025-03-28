import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { PasswordTextField } from "../components/input/withPasswordTextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/auth";
import AuthTextField from "../components/input/AuthTextField";
import { NotificationManager } from "react-notifications";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (phone && password) {
      const data = {
        phone_no: phone,
        password,
      };

      dispatch(login(data));
    } else {
      NotificationManager.error("Please enter phone or password!");
    }
  };

  return (
    <Stack justifyContent="center">
      <Card
        sx={{
          margin: "30px",
          padding: "0px 30px 30px 30px",
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          sx={{
            fontWeight: "bold",
            marginTop: "30px",
            color: "var(--primary-color)",
          }}
        >
          Login
        </Typography>

        <AuthTextField
          label="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          margin="normal"
        />
        <PasswordTextField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: "18px",
            bgcolor: "var(--primary-color)",
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </Card>
    </Stack>
  );
};

export default Login;
