import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { login } from "../../api/authApi";
import { User } from "../../api/profileApi";
import { useProfileStore } from "../../store/useProfileStore";

export const LoginModal = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setProfile } = useProfileStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<Error>();

  const handleEdit = async () => {
    try {
      const res = await login(formData as User);
      if (res?.user) {
        setProfile(res.user);
      }
      setIsLogin(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        setError(e.response?.data);
      }
    }
  };

  const onClose = () => {
    setIsLogin(false);
  };

  return (
    <Dialog open={isLogin} onClose={onClose}>
      <DialogTitle>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          display="flex"
          gap="10px"
        >
          <Box>Введите учетные данные для входа</Box>
          <Box sx={{ cursor: "pointer" }} alignItems="center" display="flex">
            <Close onClick={onClose} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Paper>
          <Box padding="16px" display="flex" gap="16px">
            <TextField
              value={formData.email}
              label="email"
              helperText="в формате xxxxx@xxx.xxx(xx)"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              value={formData.password}
              label="password"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Box>
          {error && <Box color="red" p="8px">{error?.message}</Box>}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" paddingX="16px">
          <Button variant="contained" onClick={handleEdit}>
            Войти
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
