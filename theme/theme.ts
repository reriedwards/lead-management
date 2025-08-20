import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    grey: {
      400: "#e0e0e0",
    },
  },
  typography: {
    fontFamily: "Verdana, Arial, sans-serif",
    h6: {
      fontWeight: "bold",
    },
    body2: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#222222",
          },
        },
        outlinedPrimary: {
          borderColor: "#000000",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
        },
        textPrimary: {
          color: "#000000",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.08)",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          fontWeight: "normal",
        },
      },
    },
  },
});

export default theme;
