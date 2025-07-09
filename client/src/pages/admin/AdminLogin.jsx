import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { bgGradient } from "../../constants/color";
import { useNavigate } from "react-router-dom";
import {useInputValidation} from "6pp"

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isadmin, setIsadmin] = useState(false);
  const secretKey = useInputValidation("");

  if (isadmin) {
    navigate("/admin/dashboard");
  }
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "25vh",
        width: "50vw",
        marginTop: "150px",
        background: bgGradient,
      }}
    >
      <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Admin Login
        </Typography>
        <Stack direction={"column"} gap={2}>
          <TextField  type="password" label="secret key" required={true} value={secretKey.value} onChange={secretKey.changeHandler} />
          <Button
            variant="contained"
            color="primary"
            onClick={ () => {
                if(secretKey.value === "123456"){
                    setIsadmin(true);
                }else{
                    alert("Invalid secret key");
                }
            }}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
