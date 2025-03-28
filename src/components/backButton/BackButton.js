import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIosNewIcon />}
      sx={{
        borderColor: "var(--primary-color)",
        color: "var(--primary-color)",
        mb: "3px",
      }}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;
