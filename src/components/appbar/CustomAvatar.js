import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import avatar from "../../assets/images/avatar.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth";

const CustomMenuItemIcon = ({ name, icon: Component }) => {
  return (
    <>
      <ListItemIcon>
        <Component fontSize="small" sx={{ color: "var(--primary-color)" }} />
      </ListItemIcon>
      {name}
    </>
  );
};

const CustomAvatar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar" src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem>
          <Typography
            subtitle1="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            Welcome
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleCloseUserMenu}>
          <CustomMenuItemIcon name={user.name} icon={AccountCircleIcon} />
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <CustomMenuItemIcon name={user.phone_no} icon={VerifiedUserIcon} />
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <CustomMenuItemIcon
            name={"Change Password"}
            icon={SettingsSuggestIcon}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            dispatch(logout());
          }}
        >
          <CustomMenuItemIcon name={"Logout"} icon={Logout} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CustomAvatar;
