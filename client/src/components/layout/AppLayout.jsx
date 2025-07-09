import ChatList from "../../specific/ChatList";
import Title from "../shared/Title";
import Header from "./Header";
import { Grid } from "@mui/material";
import {chats} from "../../constants/sampledata";
import Profile from "../shared/Profile";

const AppLayout = (WrapperComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />

        <Grid container height={`calc(100vh - 4rem)`}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            width={"30%"}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <ChatList chats={chats} avatar={chats.avatar}/>
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} width={"40%"}>
            <WrapperComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            width={"30%"}
            sx={{
              display: { xs: "none", md: "block", padding: "2rem" },
              bgcolor: "rgba(0,0,0,0.1)",
            }}
          >
            <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
