import { apiClient } from "./apiClient";
import { Post } from "./postsApi";

export interface User {
  id: string;
  email: string;
  refreshToken: string;
  avatar: string;
  posts: Post[];
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthday?: string; // Date
  about?: string;
}

export const fetchProfile = async () => {
  const res = await apiClient.get<User>("/profile");
  if (res) {
    return res.data;
  }
};
export const updateProfile = async (data: Partial<User>) => {
  const res = await apiClient.patch("/profile", data);
  return res?.data;
};
export const uploadAvatar = async (file: File, userId: string) => {
  if (!userId) {
    throw new Error("please authorize");
  }
  const formData = new FormData();
  formData.append("avatar", file);
  console.log(formData);
  const res = await apiClient.patch("/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.data) {
    return res.data;
  }
};
