import {
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const DashboardCard = ({ title, total, linkText, linkHref }) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {total}
        </Typography>
        <Box mt={2}>
          <MuiLink component={RouterLink} to={linkHref} underline="hover">
            {linkText}
          </MuiLink>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
