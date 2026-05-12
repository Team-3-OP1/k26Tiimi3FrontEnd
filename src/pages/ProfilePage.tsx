import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { authFetch } from "../api/items";
import { useUser } from "../context/user";

export default function ProfilePage() {
  const { user, logout } = useUser();

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "WARNING: Are you sure you want to permanently delete your account and all your data? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = await authFetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Your account has been deleted.");
        logout();
        window.location.href = "/";
      } else {
        alert("Failed to delete account.");
      }
    } catch (err) {
      alert("Connection error.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Profile Settings
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Logged in as: {user?.username || "Loading..."}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" color="error" gutterBottom>
            Warning!
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Deleting your account will remove all your personal information,
            history, and active reservations from our system permanently.
          </Typography>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteAccount}
            sx={{ py: 1.5, fontWeight: 700 }}
          >
            DELETE MY ACCOUNT
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
