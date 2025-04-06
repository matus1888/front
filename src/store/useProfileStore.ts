import { create } from "zustand";
import { User } from "../api/profileApi";

type ProfileState = {
  profile: User;
  setProfile: (profile: any) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    email: "unautorized user",
    id: "none",
    refreshToken: "none",
    avatar: "default.jpeg",
    posts: [],
  },
  setProfile: (profile) => set({ profile }),
}));
