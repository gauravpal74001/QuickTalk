import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/styles/styledComponent";
import {useFileHandler, useInputValidation , useStrongPassword} from "6pp"
import {usernameValidator} from "../utils/validator"

const loginSubmitHandler = (e)=>{
    e.preventDefault();
}
const signupSubmitHandler =(e)=>{
    e.preventDefault();
}

const Login = () => {
  const [islogin, setIslogin] = useState(true);
  const name=useInputValidation("");
  const username=useInputValidation("", usernameValidator);
  const password=useStrongPassword("");
  const avatar=useFileHandler("single");

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          marginTop: 15,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {islogin ? (
          <>
            <Typography variant="h4">LOGIN</Typography>
            <form onSubmit={loginSubmitHandler}>
              <TextField
                required
                fullWidth
                label="Username"
                type="text"
                autoFocus
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                autoComplete="current-password"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 2,
                }}
              >
                LOGIN
              </Button>
              <Typography
                sx={{
                  marginTop: 1,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                or
              </Typography>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: 1,
                }}
                onClick={() => setIslogin(false)}
              >
                SIGNUP
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h4">SIGNUP</Typography>
            <form onSubmit={signupSubmitHandler}>
              <Stack
                width={100}
                margin={"auto"}
                direction={"column"}
                spacing={2}
              >
                <Avatar
                  sx={{
                    height: 100,
                    width: 100,
                    margin: "auto",
                    marginBottom: 2,
                    backgroundColor: "primary.main",
                    objectFit: "cover",
                  }}
                  src={avatar.preview}
                />

                <IconButton>
                  <CameraAltIcon  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                  }}/>
                  <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                </IconButton>

              </Stack>

              <TextField
                required
                fullWidth
                label="Name"
                type="text"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                required
                fullWidth
                label="Username"
                type="text"
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {
                username.error && (
                    <Typography variant="caption" color="error">{username.error}</Typography>
                )
              }

              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password.value   }
                onChange={password.changeHandler}
              />
              {
                password.error && (
                    <Typography variant="caption" color="error">
                    {password.error}
                    </Typography>
                )
              }
              <Button
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 2,
                }}
              >
                Signup
              </Button>
              <Typography
                sx={{
                  marginTop: 1,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                or
              </Typography>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                  marginTop: 2,
                }}
                onClick={() => setIslogin((prev) => !prev)}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
