import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Login from "../assets/images/login.jpeg";

const AuthLayout = () => {
  return (
    <Stack
      sx={{
        backgroundImage: `url(${Login})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Stack justifyContent="center">
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            sx={{
              fontWeight: "bold",
              marginTop: "30px",
              color: "white",
            }}
            align="center"
          >
            Stock Control Management
          </Typography>
        </Stack>
        <Outlet />
      </Container>
    </Stack>
  );
};

export default AuthLayout;
