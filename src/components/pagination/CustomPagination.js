import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const CustomPagination = ({ pageCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const count = Math.ceil(pageCount);

  const handlePageChange = (page) => {
    navigate(`${location.pathname}?page=${page}`);
  };

  return (
    <Stack alignItems="end" mt={3}>
      <Pagination
        count={count}
        page={currentPage}
        color="primary"
        onChange={(_, page) => handlePageChange(page)}
      />
    </Stack>
  );
};

export default CustomPagination;
