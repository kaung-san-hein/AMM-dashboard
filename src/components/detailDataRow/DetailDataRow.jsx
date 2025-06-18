import { Box, Typography } from "@mui/material";

export const DetailDataRow = ({ title, text }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: "80px" }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold", minWidth: "80px" }}>
        {" "}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
};
