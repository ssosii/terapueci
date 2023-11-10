import { h, render } from "preact";
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiSelect: {
            defaultProps: {
                MenuProps: {
                    PaperProps: {
                        style: {
                            background: "#efedf1",
                            "&:hover": {
                                background: "#efedf1"
                            }
                        },
                    },
                },
            },
            styleOverrides: {
            //     root: {
            //         "&.Mui-selected": {
            //           backgroundColor: "green",
            //           outline:"1px solid red",
            //           "&.Mui-focusVisible": { background: "orange" }
            //         }
            //       }
            },
        },
        MuiMenuItem: {
            styleOverrides: {
              root: {
                // backgroundColor: "yellow",
                "&.Mui-selected": {
                  backgroundColor: "#dbdbdb !important",
                  "&:hover" :{
                    backgroundColor:"#dbdbdb !important",
                  },
                  "&.Mui-focusVisible": { 
                    backgroundColor: "#dbdbdb !important",
                    "&:hover" :{
                        backgroundColor:"#dbdbdb !important",
                      },
                 }
                }
              }
            }
          }
    },
});

const ThemeProvider = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    )
}

export { ThemeProvider }