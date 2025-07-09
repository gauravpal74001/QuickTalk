import {
  Dialog,
  Stack,
  Typography,
  TextField,
  List,
  InputAdornment,
  Button,
} from "@mui/material";
import { Group as GroupIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import { sampleUser } from "../constants/sampledata";
import UserItem from "./UserItem";
import { useState } from "react";

const users = sampleUser;

const NewGroupDialog = () => {
  const newGroup = useInputValidation("");
  const [isGroupRequestLoading, setIsGroupRequestLoading] = useState(false);
  const [members , setMembers] = useState(sampleUser);
  const [selectedMember , setSelectedMember] = useState([]);

  const selectMemberHandler = (id) => {
     setSelectedMember((prev)=> prev.includes(id) ? prev.filter((i)=>i!==id) : [...prev , id ]);
  };
  console.log(selectedMember);

  const submitGroupHandler = () => {
  
  };

  return (
    <Dialog open={true}>
      <Stack
        spacing={"1rem"}
        sx={{ xs: { padding: "1rem" }, sm: { padding: "2rem" } }}
        alignItems={"center"}
        width={"25rem"}
      >
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textAlign={"center"}
          padding={"1rem"}
        >
          New Group
        </Typography>
        <TextField
          label=""
          size="small"
          variant="outlined"
          value={newGroup.value}
          onChange={newGroup.changeHandler}
          placeholder="Enter group name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <List>
          {members.map((user) => (
            <UserItem
              user={user}
              handler={() => selectMemberHandler(user._id)}
              handlerLoading={isGroupRequestLoading}
              isAdded={selectedMember.includes(user._id)}//if the user is added to the group
            />
          ))}
          <Stack
            direction={"row"}
            spacing={"1rem"}
            padding={"1rem"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Button
              variant="outlined"
              color="error"
              width={"10rem"}
              height={"3rem"}
              fontSize={"1rem"}
              fontWeight={"500"}
              borderRadius={"1rem"}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              width={"10rem"}
              height={"3rem"}
              fontSize={"1rem"}
              fontWeight={"500"}
              borderRadius={"1rem"}
              onClick={() => submitGroupHandler()}
            >
              Create Group
            </Button>
          </Stack>
        </List>
      </Stack>
    </Dialog>
  );
};

export default NewGroupDialog;
