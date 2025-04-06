import { Post } from "../api/postsApi";

export const PostItem = (props: { post: Post }) => {
  return <div>{JSON.stringify(props)}</div>;
};
