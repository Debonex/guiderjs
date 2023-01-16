import React, { FC } from "react";
import theme from "@site/src/misc/muiTheme";
import { ThemeProvider } from "@mui/material";

const Root: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Root;
