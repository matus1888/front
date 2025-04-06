import { apiClient } from "./apiClient";
import { User } from "./profileApi";

interface CreateUserDto {
  email: string;
  password: string;
}
export const register = async (params: CreateUserDto) => {
  const res = await apiClient.post<User>(`/auth/register`, params);
  if (res) {
    return res.data;
  }
};

export const login = async (params: User) => {
  const res = await apiClient.post<{
    user: User;
    access_token: string;
    refresh_toker: string;
  }>(`auth/login`, { user: params });
  if (res) {
    res.data.access_token &&
      localStorage.setItem("jwtToken", res.data.access_token);
    localStorage.setItem("mail", res.data.user.email);
    return res.data;
  }
};

export const loginFromToken = async (): Promise<User | undefined> => {
  const mail = localStorage.getItem("mail");
  try {
    if (mail) {
      const res = await apiClient.post<User>("/auth/iam", { mail });
      if (res.data) {
        return res.data;
      }
    }
  } catch (e) {
    console.error(`token is invalid, error = ${JSON.stringify(e)}`);
  }
};
