import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const CustomProfileAvatar = ({
  name,
  backgroundColor = "#3F51B5",
  textColor = "#FFFFFF",
}) => {
  const firstChar = name ? name.charAt(0).toUpperCase() : "";

  return (
    <Avatar
      sx={{
        bgcolor: backgroundColor,
        color: textColor,
        width: 35,
        height: 35,
        fontSize: "2rem",
        fontWeight: "bold",
        borderRadius: "50%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      aria-label={`Avatar for ${name}`}
    >
      <Typography variant="body1">{firstChar}</Typography>
    </Avatar>
  );
};

export default CustomProfileAvatar;
