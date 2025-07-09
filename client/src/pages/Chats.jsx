import { IconButton, InputBase, Stack, Typography, Paper } from '@mui/material';
import AppLayout from '../components/layout/AppLayout'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { useRef } from 'react';
import { orange } from '../constants/color';
import { sampleMesages } from '../constants/sampledata';
import MessageComponent from '../components/shared/MessageComponenet';

const user = {
  _id:"1",
  name:"John Doe",
  avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4q0-hFsRa8s1kzziYZVHIW1zg-yH0S2POA&s",
}

const Chats = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack 
        ref={containerRef}
        padding={2}
        height={"90%"}
        width={"100%"}
        bgcolor={"#f0f2f5"}
        position={"relative"}
        spacing={2}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
          {sampleMesages.map((i)=>
            <MessageComponent message={i} user={user}  key={i._id}/>
          )}

      </Stack>

      <form style={{ height: "10%", width: "100%" }}>
        <Stack 
          direction={"row"} 
          spacing={2} 
          padding={2} 
          sx={{
            justifyContent: "space-between",
            bgcolor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider"
          }}
        >
          <IconButton 
            sx={{
              position: "relative",
              padding: "0.5rem",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: `${orange}20`,
                transform: "scale(1.05)"
              },
              "&:active": {
                bgcolor: `${orange}40`
              }
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBase 
            sx={{
              backgroundColor: "background.default",
              borderRadius: "1rem",
              padding: "0.5rem 1rem",
              width: "100%",
              "&::placeholder": {
                color: "text.secondary",
                fontSize: "1rem",
              },
              "&:hover": {
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              },
              "&:focus-within": {
                outline: "none",
                boxShadow: `0 0 0 2px ${orange}40`,
              },
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.3s ease"
            }} 
            placeholder='Type a message'
          />

          <IconButton 
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: `${orange}20`,
                transform: "scale(1.05)"
              },
              "&:active": {
                bgcolor: `${orange}40`
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </>
  )
}

export default AppLayout(Chats);
