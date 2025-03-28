import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RoleList from "./pages/roles/Roles";

export const routes = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    name: "Login",
    icon: null,
    path: "/login",
    component: <Login />,
    layout: "/auth",
    invisible: true,
  },
  {
    name: "Roles",
    icon: AccountCircleIcon,
    path: "/roles",
    component: <RoleList />,
    layout: "/admin",
  },
];
