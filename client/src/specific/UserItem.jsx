import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack , Typography } from "@mui/material";
const UserItem = ({ user, handler, handlerLoading , isAdded=false }) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        width={"100%"}      
        fullWidth
        sx={{
            justifyContent:"stretch",
            alignItems:"center" 
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
            width:"100%",
          }}
          fullWidth
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            color:"white",
            backgroundColor: isAdded ? "error.main" : "primary.main",
            "&:hover": {
              "color": "white",
              "backgroundColor": isAdded ? "error.main" : "primary.main",
              "transform": "scale(1.05)",
              "transition": "all 0.3s ease",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default UserItem;
