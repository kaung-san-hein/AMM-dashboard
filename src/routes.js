import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import RoleList from "./pages/roles/Roles";
import CategoryList from "./pages/categories/Categories";
import ProductList from "./pages/products/Products";
import CustomerList from "./pages/customers/Customers";
import SalePage from "./pages/sale/SalePage";
import SaleInvoiceList from "./pages/sale/SaleInvoices";
import SupplierList from "./pages/suppliers/Suppliers";
import PurchasePage from "./pages/purchase/PurchasePage";
import PurchaseInvoiceList from "./pages/purchase/PurchaseInvoices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import StockAlert from "./pages/products/StockAlert";
import StarIcon from "@mui/icons-material/Star";
import MostSaleProducts from "./pages/sale/MostSaleProducts";

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
  // {
  //   name: "Roles",
  //   icon: VpnKeyIcon,
  //   path: "/roles",
  //   component: <RoleList />,
  //   layout: "/admin",
  // },
  {
    name: "Categories",
    icon: CategoryIcon,
    path: "/categories",
    component: <CategoryList />,
    layout: "/admin",
  },
  {
    name: "Products",
    icon: Inventory2Icon,
    path: "/products",
    component: <ProductList />,
    layout: "/admin",
  },
  {
    name: "Stock Alert",
    icon: ProductionQuantityLimitsIcon,
    path: "/stock-alert",
    component: <StockAlert />,
    layout: "/admin",
  },
  {
    name: "Customers",
    icon: PeopleAltIcon,
    path: "/customers",
    component: <CustomerList />,
    layout: "/admin",
  },
  {
    name: "Sale Page",
    icon: LocalOfferIcon,
    path: "/sale-page",
    component: <SalePage />,
    layout: "/admin",
  },
  {
    name: "Customer Invoice Page",
    icon: ReceiptLongIcon,
    path: "/customer-invoices",
    component: <SaleInvoiceList />,
    layout: "/admin",
  },
  {
    name: "Best Sellers",
    icon: StarIcon,
    path: "/best-sellers",
    component: <MostSaleProducts />,
    layout: "/admin",
  },
  {
    name: "Suppliers",
    icon: PeopleAltIcon,
    path: "/suppliers",
    component: <SupplierList />,
    layout: "/admin",
  },
  {
    name: "Purchase Page",
    icon: LocalOfferIcon,
    path: "/purchase-page",
    component: <PurchasePage />,
    layout: "/admin",
  },
  {
    name: "Supplier Invoice Page",
    icon: ReceiptLongIcon,
    path: "/supplier-invoices",
    component: <PurchaseInvoiceList />,
    layout: "/admin",
  },
];
