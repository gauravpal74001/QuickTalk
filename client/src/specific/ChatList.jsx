import { Stack } from "@mui/material";
import ChatItem from "../components/shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat
}) => {
  return <Stack width={w} direction={"column"} spacing={"1rem"}>
    {
        chats.map((data)=>{
            return (
                <ChatItem 
                key={data._id}
                avatar={data.avatar}
                name={data.name}
                _id={data._id}
                groupChat={data.groupChat}
                isOnline={data.isOnline}
                sameSender={data.sameSender}
                newMessageAlert={data.newMessageAlert}
                index={data.index}
                handleDeleteChatOpen={handleDeleteChat}
                />
            )
        })
    }
  </Stack>;
};

export default ChatList;
