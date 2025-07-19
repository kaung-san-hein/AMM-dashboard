import React, { useEffect } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStockAlertCount } from "../../store/actions/stockAlert";

const NotificationIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stockAlertCount } = useSelector((state) => state.stockAlert);

  useEffect(() => {
    dispatch(getStockAlertCount());
  }, [dispatch]);

  const handleClick = () => {
    navigate("/admin/stock-alert");
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{
          marginRight: 2,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Badge
          badgeContent={stockAlertCount > 0 ? stockAlertCount : 0}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default NotificationIcon;
