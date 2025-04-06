import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { updateProfile, User } from "../../api/profileApi";
import { useProfileStore } from "../../store/useProfileStore";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const EditProfileModal = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { profile, setProfile } = useProfileStore();
  const [formData, setFormData] = useState<Partial<User>>({ id: profile.id });

  const handleEdit = async () => {
    const user = await updateProfile({ ...formData, id: profile.id });
    setProfile(user);
    if (user.email) {
      localStorage.setItem("email", user.email);
    }
    setIsEditing(false);
  };

  const onClose = () => {
    setIsEditing(false);
    setFormData({ id: profile.id });
  };

  return (
    <Dialog open={isEditing} onClose={onClose}>
      <DialogTitle>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          display="flex"
          gap="10px"
        >
          <Box>Отредактируйте данные и нажмите сохранить</Box>
          <Box sx={{ cursor: "pointer" }} alignItems="center" display="flex">
            <Close onClick={onClose} />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Paper>
          <Stack padding="16px" display="flex" gap="16px">
            <TextField
              value={resolveValue(formData.email, profile.email)}
              label="email"
              helperText="в формате xxxxx@xxx.xxx(xx)"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              value={resolveValue(formData.firstName, profile.firstName)}
              label="Имя"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextField
              value={resolveValue(formData.lastName, profile.lastName)}
              label="Фамилия"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                value={
                  resolveValue(formData.birthday, profile?.birthday)
                    ? dayjs(resolveValue(formData.birthday, profile.birthday))
                    : null
                }
                label="Дата рождения"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  if (value?.isValid()) {
                    const date = value?.toISOString();
                    setFormData({ ...formData, birthday: date });
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              value={resolveValue(formData.phone, profile.phone)}
              label="Телефон"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <TextField
              value={resolveValue(formData.about, profile.about)}
              label="О себе"
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
            />
          </Stack>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" paddingX="16px">
          <Button variant="contained" onClick={handleEdit}>
            Сохранить
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
function resolveValue(one: any, two: any) {
  if (one != null) {
    return one;
  }
  return two;
}
