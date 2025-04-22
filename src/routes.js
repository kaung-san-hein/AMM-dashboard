import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RoleList from "./pages/roles/Roles";
import CategoryList from "./pages/categories/Categories";

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
  {
    name: "Categories",
    icon: FormatListNumberedIcon,
    path: "/categories",
    component: <CategoryList />,
    layout: "/admin",
  },
];
