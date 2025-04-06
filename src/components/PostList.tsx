import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostItem } from "./PostItem";
import { Box, Button, Paper, Typography } from "@mui/material";
import { fetchPosts } from "../api/postsApi";

export const PostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("new");
  console.log(setSortBy, page, sortBy);

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts({}),
  });

  const handleLoadMore = () => setPage((prev) => prev + 1);
  console.log({ data });

  if (isLoading) return <p>Загрузка...</p>;

  if (!data?.length) {
    return (
      <Box p="16px">
        <Paper>
          <Typography variant="body1">Пока нет ни одного поста</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      {data?.map((post: any) => post && <PostItem key={post.id} post={post} />)}
      <Button variant="outlined" onClick={handleLoadMore}>
        Загрузить еще
      </Button>
    </Box>
  );
};
