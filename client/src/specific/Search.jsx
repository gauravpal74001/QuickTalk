import {
  Dialog,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  List
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from "./UserItem";
import { sampleUser } from "../constants/sampledata";
import { useState } from "react";

const users = sampleUser;

const SearchDialog = () => {
  const search = useInputValidation("");
  const [isFriendRequestLoading, setIsFriendRequestLoading] = useState(false);
  const addFriend = (id) => {
    console.log(id);
  };
  return (
    <Dialog open={true}>
      <Stack
        spacing={"1rem"}
        padding={"1rem"}
        alignItems={"center"}
        width={"25rem"}
      >
        <Typography variant="h6" fontWeight={"bold"} textAlign={"center"}>
          Search
        </Typography>
        <TextField
          label=""
          size="small"
          fullWidth
          variant="outlined"
          value={search.value}
          onChange={search.changeHandler}
          placeholder="Search users..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              handler={() => addFriend(user._id)}
              handlerLoading={isFriendRequestLoading}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
