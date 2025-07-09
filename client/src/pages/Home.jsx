import { Typography , Box } from "@mui/material";
import AppLayout from "../components/layout/AppLayout"

const Home = () => {
  return (
    <Box bgcolor={"#FFDAB9"} height={"100%"} width={"100%"} >
      <Typography variant="h5" padding={2} fontWeight={"bold"}>
         Select a Friend to Chat 
      </Typography>
    </Box>
  )
}

export default AppLayout(Home);
