import { useState } from "react";
import { sampleUser } from "../constants/sampledata";
import { Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";    
import UserItem from "../specific/UserItem";

const AddMemberDialog = ({ open, close, isLoading, addMember }) => {

  const [members, setMembers] = useState(sampleUser);
  const [selectedMember, setSelectedMember] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMember((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Stack padding={2} direction={"column"} gap={2}>
      <Dialog open={open} onClose={close}>
        <DialogTitle>Add Member</DialogTitle>
        <DialogContent>
          <TextField label="Member Name" />
        </DialogContent>
        <Stack direction={"column"} gap={2} padding={2}>
            {members.map((user)=>(
                <UserItem
                    user={user}
                    handler={()=>selectMemberHandler(user._id)}
                    handlerLoading={isLoading}
                    isAdded={selectedMember.includes(user._id)}
                />
            ))}
        </Stack>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={addMember}>Add</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AddMemberDialog;
