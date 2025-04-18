import { AxiosError } from "axios";
import { apiClient } from "./apiClient";
import { User } from "./profileApi";
export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  author: User;
  createAt: Date;
  updateAt: Date;
}
export type PostResponce = Post[];

interface GetPostsParams {
  limit?: number;
  offset?: number;
  sortBy?: string;
}
export const fetchPosts = async ({ limit, offset, sortBy }: GetPostsParams) => {
  const res = await apiClient.get<PostResponce>("/posts", {
    params: { limit, offset, sortBy },
  });
  if (res) {
    return res.data;
  }
};

export const createPost = async (data: Post) => {
  try {
    const res = await apiClient.post("/posts", data);
    if (res) {
      return res.data;
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      //TODO
      console.error(e);
    }
  }
};
export const updatePost = (id: string, data: any) =>
  apiClient.put(`/posts/${id}`, data);
export const deletePost = (id: string) => apiClient.delete(`/posts/${id}`);
