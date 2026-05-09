import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ColorModeContext, type ColorMode } from "./colorModeContext";

const COLOR_MODE_STORAGE_KEY = "tiimi3-color-mode";

function getInitialColorMode(): ColorMode {
  const storedMode = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
  if (storedMode === "light" || storedMode === "dark") {
    return storedMode;
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

type AppThemeProviderProps = {
  children: ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mode, setMode] = useState<ColorMode>(getInitialColorMode);

  useEffect(() => {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#0b5fff" : "#7da3ff",
          },
          secondary: {
            main: mode === "light" ? "#ff6b00" : "#ff9c52",
          },
          background: {
            default: mode === "light" ? "#f5f7fb" : "#101521",
            paper: mode === "light" ? "#ffffff" : "#182033",
          },
        },
        shape: {
          borderRadius: 14,
        },
        typography: {
          fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
          h1: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
          },
          h2: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
          },
          h3: {
            fontWeight: 700,
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow:
                  mode === "light"
                    ? "0 10px 30px rgba(10, 25, 47, 0.08)"
                    : "0 10px 30px rgba(0, 0, 0, 0.3)",
                border:
                  mode === "light"
                    ? "1px solid rgba(11, 95, 255, 0.08)"
                    : "1px solid rgba(125, 163, 255, 0.2)",
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
