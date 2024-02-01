"use client";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { createTheme } from "@mui/material/styles";

export const componentTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        // InputProps: {
        //   disableUnderline: true,
        // },
      },
    },
  },
});

export default function ProviderMui({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={componentTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
