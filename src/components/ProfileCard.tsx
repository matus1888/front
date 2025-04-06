import React, { useEffect, useState } from "react";
import { uploadAvatar } from "../api/profileApi";
import { Box, Button, Stack } from "@mui/material";
import { useProfileStore } from "../store/useProfileStore";
import { baseURL } from "../api/apiClient";
import { EditProfileModal } from "./modals/EditProfileModal";
import { LoginModal } from "./modals";
import { loginFromToken } from "../api/authApi";
import dayjs from "dayjs";

export const ProfileCard: React.FC = () => {
  const { profile, setProfile } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const userInLs = localStorage.getItem("mail");

  useEffect(() => {
    if (userInLs) {
      loginFromToken()
        .then((user) => {
          if (user) {
            setProfile(user);
          }
        })
        .catch((error: Error) => {
          console.error(error);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("mail");
        });
    }
  }, [userInLs, setProfile]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const user = await uploadAvatar(file, profile.id);
      setProfile(user);
    }
  };
  const filesPath = "/uploads/";
  const isDefaultUser = profile.email === "unautorized user";
  console.log({ isDefaultUser });

  return (
    <Box
      paddingX="16px"
      flexDirection="row"
      display="flex"
      justifyContent="space-between"
    >
      <Stack
        flexDirection="row"
        justifyContent="space-around"
        gap="15px"
        alignItems="center"
      >
        <img
          src={`${baseURL}${filesPath}${profile?.avatar || "default.jpeg"}`}
          alt="Avatar"
          onClick={() => document.getElementById("avatarInput")?.click()}
          width="120px"
          height="120px"
        />
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarUpload}
        />
        <div>
          {/* <h2>{`${profile?.email} ${profile?.id}`}</h2> */}
          {Boolean(profile.lastName || profile.firstName) && (
            <h4>{`${profile?.firstName} ${profile.lastName}`}</h4>
          )}
          {profile.birthday && (
            <h4>{dayjs(profile.birthday).format("DD-MM-YYYY")}</h4>
          )}
          {profile.about && (
            <>
              О себе:<h4>{profile.about}</h4>
            </>
          )}
          {profile.phone && <h4>{profile.phone}</h4>}
          {profile.email && <h4>{profile.email}</h4>}
        </div>
      </Stack>
      <Box display="flex" alignItems="center">
        {!isDefaultUser ? (
          <Button
            variant="outlined"
            size="large"
            fullWidth={false}
            onClick={() => setIsEditing(true)}
          >
            Редактировать профиль
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="large"
            fullWidth={false}
            onClick={() => setIsLogin(true)}
          >
            Войти
          </Button>
        )}
      </Box>
      <EditProfileModal isEditing={isEditing} setIsEditing={setIsEditing} />
      <LoginModal isLogin={isLogin} setIsLogin={setIsLogin} />
    </Box>
  );
};
