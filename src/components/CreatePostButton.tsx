import { Button } from "@mui/material";
import { useState } from "react";
import { CreatePostModal } from "./modals/CreatePostModal";

export const CreatePostButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(true);
  return (
    <>
      <CreatePostModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button variant="contained" onClick={onClick}>
        Создать пост
      </Button>
    </>
  );
};
