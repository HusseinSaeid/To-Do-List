import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F9FAFB",
      paper: "#ffffff",
    },
    primary: {
      main: "#1976D2",
    },
    success: {
      main: "#388E3C",
    },
    warning: {
      main: "#F57C00",
    },
    error: {
      main: "#D32F2F",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: '"Cairo", "Roboto", "Arial", sans-serif',
  },
});
export default theme;
