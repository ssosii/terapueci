import { h, render } from 'preact';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
            contrastText: "#fff"
        },
        secondary: {
            main: "#ff9328",
            contrastText: "#fff"
            
        },
    },
    overrides: {
        MuiButton: {
          raisedPrimary: {
            color: 'white',
          },
        },
      }
});

export default theme;