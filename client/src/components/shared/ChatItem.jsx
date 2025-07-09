import { Stack, Typography , Box} from "@mui/material";
import {Link} from "../styles/styledComponent";
import {memo} from "react";
import AvtarCard from "./AvtarCard";


const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    isOnline,
    sameSender,
    newMessageAlert,
    index=0,
    handleDeleteChatOpen
}) => {
  return (
    <Link style={{
        textDecoration:"none",
        color:"inherit",
    }} to={`/chat/${_id}`}
    onContextMenu={(e)=>handleDeleteChatOpen(e, _id , groupChat)}> 
    <div style={{
        display:"flex",
        alignItems:"center",
        gap:"1rem",
        padding:"1rem",
        cursor:"pointer",
        color:sameSender ? "white" : "rgba(0,0,0,0.8)   ",
        backgroundColor: sameSender ? "rgba(0,0,0,0.5)" :"white",
        position:"relative",
        "&:hover":{
            backgroundColor: "rgba(0,0,0,0.1)",
        }

    }}>
        <AvtarCard avatar={avatar} max={4} />

        <Stack>
            <Typography>{name}</Typography>
            {
                newMessageAlert && (
                    <Typography>{newMessageAlert.count + " new messages "}</Typography>
                )
            }
        </Stack>

        {
            isOnline && (
                <Box sx={{
                    width:"0.5rem",
                    height:"0.5rem",
                    borderRadius:"50%",
                    backgroundColor:"green",
                    position:"absolute",
                    top:"2.5rem",
                    right:"1.5rem",
                }}/>
            )
        }
    </div>
    </Link>
  )
}

export default memo(ChatItem);
//only re-render when the props change 
//but react idealy re-render all the component when the parent component re-render
//so we use memo to prevent this
