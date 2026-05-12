import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router";
import { ColorModeContext } from "./theme/colorModeContext";
import { useUser } from "./context/user";

function App() {
  const location = useLocation();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { user, logout } = useUser();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About Us", to: "/about" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ py: 1.5, justifyContent: "space-between", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
              }}
            >
              Team 3 Catalog
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ overflowX: "auto", alignItems: "center" }}
            >
              {navItems.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);

                return (
                  <Button
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    variant={isActive ? "contained" : "outlined"}
                    size="medium"
                    sx={{
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      fontWeight: 700,
                      px: 2.5,
                      py: 0.8,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              <Tooltip
                title={
                  mode === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
              >
                <IconButton
                  onClick={toggleColorMode}
                  color="primary"
                  sx={{ border: 1, borderColor: "divider" }}
                  aria-label={
                    mode === "light"
                      ? "Enable dark theme"
                      : "Enable light theme"
                  }
                >
                  {mode === "light" ? (
                    <DarkModeRoundedIcon />
                  ) : (
                    <LightModeRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
              {user ? (
                <>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "primary.main",
                    }}
                  >
                    Logged in as {user.username}
                  </Typography>
                  <Button
                    onClick={logout}
                    variant="outlined"
                    size="medium"
                    endIcon={<LogoutIcon />}
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant={
                      location.pathname === "/login" ? "contained" : "outlined"
                    }
                    size="medium"
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Sign in
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/register"
                    variant={
                      location.pathname === "/register"
                        ? "contained"
                        : "outlined"
                    }
                    size="medium"
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </Box>
  );
}

export default App;
