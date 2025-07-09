import {
  Dialog,
  Stack,
  DialogTitle,
  Button,
  List,
  ListItem,
  Avatar,
  Typography,
} from "@mui/material";
import { sampleNotification } from "../constants/sampledata";
import { useTheme } from "@mui/material/styles";

const NotificationDialog = () => {
  const addToFriendHandler = ({ _id, accept }) => {
    console.log("add to friend");
  };

  return (
    <Dialog open={true}>
      <Stack
        direction={"column"}
        spacing={"1rem"}
        padding={"1rem"}
        alignItems={"center"}
        width={"30rem"}
      >
        <DialogTitle>Notifications</DialogTitle>
        {sampleNotification.length > 0 ? (
          <List>
            {sampleNotification.map((i) => (
              <NotificationItem
                sender={i.sender}
                _id={i._id}
                handler={addToFriendHandler}
              />
            ))}
          </List>
        ) : (
          <Typography>No notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = ({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  const theme = useTheme();

  return (
    <ListItem>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        width={"100%"}
        sx={{
          justifyContent: "stretch",
          alignItems: "center",
        }}
      >
        <Avatar />
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.2rem",
            fontWeight: "500",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          sx={{
            width: "9rem",
            height: "3rem",
            fontSize: "1rem",
            fontWeight: "400",
            borderRadius: "1rem",
            "&:hover": {
              opacity: "0.8",
              transform: "scale(1.05)",
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
          onClick={() => handler({ _id, accept: true })}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "9rem",
            height: "3rem",
            fontSize: "1rem",
            fontWeight: "500",
            borderRadius: "1rem",
            "&:hover": {
              opacity: "0.8",
              transform: "scale(1.05)",
              backgroundColor: "error.main",
              color: "white",
              },
          }}
          onClick={() => handler({ _id, accept: false })}
        >
          Reject
        </Button>
      </Stack>
    </ListItem>
  );
};
export default NotificationDialog;
