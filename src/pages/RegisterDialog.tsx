import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router";

export default function RegisterDialog() {
  const navigate = useNavigate();

  function handleClose() {
    navigate("/login", { replace: true });
  }

  return (
    <Dialog open onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Create account
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <RegisterForm onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
