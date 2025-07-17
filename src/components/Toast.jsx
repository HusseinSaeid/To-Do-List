import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export default function MySnackbars({ open, message }) {
  return (
    <div>
      <Snackbar open={open}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
