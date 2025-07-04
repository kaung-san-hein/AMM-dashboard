import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { routes } from "../routes";
import SidebarButton from "../components/sidebar/SidebarButton";
import SidebarCollapseButton from "../components/sidebar/SidebarCollapseButton";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomAvatar from "../components/appbar/CustomAvatar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? true : false;
  };

  return (
    <Box
      sx={{ display: "flex", bgcolor: "var(--bg-color)", minHeight: "100vh" }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{
          bgcolor: "var(--primary-color)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Stock Control Management System
          </Typography>
          <CustomAvatar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          [`& .MuiDrawer-paper`]: {
            bgcolor: "var(--bg-color)",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon
                sx={{
                  color: "var(--primary-color)",
                }}
              />
            ) : (
              <ChevronLeftIcon
                sx={{
                  color: "var(--primary-color)",
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route, index) => {
            if (route.collapse) {
              return route.views.map((view, index) => (
                <SidebarCollapseButton
                  key={index}
                  route={route}
                  view={view}
                  open={open}
                  activeRoute={activeRoute(view.layout + view.path)}
                />
              ));
            } else {
              return route.invisible ? null : (
                <SidebarButton
                  key={index}
                  route={route}
                  open={open}
                  activeRoute={activeRoute(route.layout + route.path)}
                />
              );
            }
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
