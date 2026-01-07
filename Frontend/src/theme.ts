import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB" // Royal Blue
    },
    secondary: {
      main: "#14B8A6" // Teal
    },
    background: {
      default: "#F4F6F8", // Whole app background
      paper: "#FFFFFF"
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280"
    }
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },

  shape: {
    borderRadius: 10
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0px 8px 24px rgba(0, 0, 0, 0.06)"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 16px"
        }
      }
    }
  }
});

export default theme;
