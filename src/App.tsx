import { PostList } from "./components/PostList";
import { ProfileCard } from "./components/ProfileCard";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Register } from "./components/Register";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box width="100vw" height="100vh">
        <ProfileCard />
        <PostList />
        <Register />
      </Box>
    </QueryClientProvider>
  );
};
