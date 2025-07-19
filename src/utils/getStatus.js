import { Chip } from "@mui/material";

export const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return (
          <Chip
            label="Pending"
            color="warning"
            variant="filled"
            size="small"
            sx={{
              backgroundColor: "#ff9800",
              color: "white",
              fontWeight: "bold",
            }}
          />
        );
      case "paid":
        return (
          <Chip
            label="Paid"
            color="success"
            variant="filled"
            size="small"
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              fontWeight: "bold",
            }}
          />
        );
      case "cancelled":
        return (
          <Chip
            label="Cancelled"
            color="error"
            variant="filled"
            size="small"
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              fontWeight: "bold",
            }}
          />
        );
      default:
        return (
          <Chip
            label={status || "Unknown"}
            color="default"
            variant="filled"
            size="small"
            sx={{
              backgroundColor: "#9e9e9e",
              color: "white",
              fontWeight: "bold",
            }}
          />
        );
    }
  };