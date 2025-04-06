import { create } from "zustand";

type PostsState = {
  posts: any[];
  addPost: (post: any) => void;
  updatePost: (id: string, updatedPost: any) => void;
  deletePost: (id: string) => void;
};

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
    })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
}));
