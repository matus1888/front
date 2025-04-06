import { Box, Button, Input } from "@mui/material";
import { useState } from "react";
import { register } from "../api/authApi";

//TODO delete this component
export const Register = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <Box>
      <Box p="8px">
        <Input value={mail} onChange={(e) => setMail(e.target.value)} />
      </Box>
      <Box p="8px">
        <Input value={pass} onChange={(e) => setPass(e.target.value)} />
      </Box>
      <Button
        variant="contained"
        onClick={() => register({ email: mail, password: pass })}
      >
        create user
      </Button>
    </Box>
  );
};
