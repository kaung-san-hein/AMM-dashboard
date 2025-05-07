import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RoleList from "./pages/roles/Roles";
import CategoryList from "./pages/categories/Categories";
import ProductList from "./pages/products/Products";
import CustomerList from "./pages/customers/Customers";
import SalePage from "./pages/sale/SalePage";

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
  {
    name: "Products",
    icon: FormatListNumberedIcon,
    path: "/products",
    component: <ProductList />,
    layout: "/admin",
  },
  {
    name: "Customers",
    icon: FormatListNumberedIcon,
    path: "/customers",
    component: <CustomerList />,
    layout: "/admin",
  },
  {
    name: "SalePage",
    icon: LocalOfferIcon,
    path: "/sale-page",
    component: <SalePage />,
    layout: "/admin",
  },
];
