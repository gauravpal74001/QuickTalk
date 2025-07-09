import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, memo } from "react";
import {
  Menu as MenuIcon,
  KeyboardBackspace,
  Edit as EditIcon,
  Send,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Link } from "../components/styles/styledComponent";
import AvtarCard from "../components/shared/AvtarCard";
import { chats } from "../constants/sampledata";
import { useEffect } from "react";
import {  bgGradient, orange } from "../constants/color";
import DeleteDialog from "../dialog/DeleteDialog";
import AddMemberDialog from "../dialog/AddMemberDialog";
import UserItem from "../specific/UserItem";
import { sampleUser } from "../constants/sampledata";


const Group = () => {
  const ChatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [addMemberDialog, setAddMemberDialog] = useState(false);

  useEffect(() => {
    if(ChatId) setGroupName(`Group Name ${ChatId}`);
    if(ChatId) setUpdatedGroupName(`Group Name ${ChatId}`);
  }, [ChatId]);
   
  const addMemberHandler = () =>{
    console.log("addMemberHandler");
    setAddMemberDialog(false);
  }

  const deleteHandler = () => {
    console.log("deleteHandler");
    setConfirmDeleteDialog(false);
  };

  const handleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const closeDrawer = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Grid container height={"100vh"} sx={{ width: "100%" }}>
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "block" },
          position: "relative",
          background: bgGradient, 
          width: { sm: "30%" },
        }}
      >
        <GroupList myGroups={chats} Chatid={ChatId} _id={""} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          width: { xs: "100%", sm: "70%" },
          position: "relative",
        }}
      >
        {isEdit ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={2}
            sx={{
              p: 2,
              justifyContent: "space-between",
              marginLeft: 10,
            }}
          >
            <TextField
              fullWidth
              value={updatedGroupName}
              onChange={(e) => setUpdatedGroupName(e.target.value)}
              sx={{
                marginTop: 5,
              }}
            />
            <IconButton
              sx={{
                marginTop: 5,
              }}
              onClick={() => {
                setIsEdit(false);
                setUpdatedGroupName(groupName);
                setGroupName(updatedGroupName);
              }}
            >
              <Send />
            </IconButton>
          </Stack>
        ) : (
             groupName && (
                <> 
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  gap={2}
                  sx={{
                    p: 2,
                    justifyContent: "space-between",
                    marginLeft: 10,
                    marginTop: 5,
                    marginBottom: 10,
                    borderRadius: 1,
                    bgcolor: "rgba(0,0,0,0.2)",
                    border: "1px solid #ccc",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h5"> {groupName} </Typography>
                  <IconButton onClick={() => setIsEdit(true)}>
                    {" "}
                    <EditIcon />{" "}
                  </IconButton>
                </Stack>
    
                <Typography
                  sx={{
                    marginTop: -5,
                    marginLeft: 10,
                    borderRadius: 1,
                    padding: 1,
                    bgcolor: "rgba(0,0,0,0.2)",
                    border: "1px solid #ccc",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                  }}
                  variant="h6"
                >
                  {" "}
                  Members{" "}
                </Typography>
    
                {/* Members List */}
                <Stack
                  maxWidth={"45rem"}
                  width={"100%"}
                  height={"50vh"}
                  bgcolor={orange}
                  borderRadius={1}
                  border={"1px solid #ccc"}
                  boxShadow={"0 0 10px 0 rgba(0,0,0,0.1)"}
                  p={2}
                  overflow={"auto"}
                  marginTop={5}
                  marginBottom={10}
                >
                    {/* Members List */}
                    <Stack 
                      direction={"row"} 
                      gap={2} 
                      flexWrap={"wrap"}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          transition: 'background-color 0.3s ease'
                        }
                      }}
                    >
                        {
                            sampleUser.map((user)=>(
                                <UserItem 
                                  key={user._id} 
                                  user={user} 
                                  handler={()=>selectMemberHandler(user._id)} 
                                  handlerLoading={false} 
                                  isAdded={false}
                                />
                            ))
                        }
                    </Stack>

                </Stack>
    
                {/* Add and Remove Members */}
                <Stack
                 direction={{ sm: "row", xs: "column-reverse" }}
                  gap={3}
                  padding={{
                   sm: 2,
                   xs: 1,
                  }}
                  textAlign={"center"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                   marginTop: -5,
                   '& .MuiButton-root': {
                     minWidth: '150px',
                     borderRadius: 2,
                     textTransform: 'none',
                     transition: 'all 0.3s ease',
                     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                     '&:hover': {
                       transform: 'translateY(-2px)',
                       boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                     }
                   }
                  }}
                >
                 <Button
                   variant="outlined"
                   color="error"
                   startIcon={<DeleteIcon />}
                   onClick={()=>setConfirmDeleteDialog(true)}
                   sx={{
                     borderWidth: 2,
                     '&:hover': {
                       borderWidth: 2,
                       backgroundColor: 'rgba(211, 47, 47, 0.04)'
                     }
                   }}
                 >
                    <Typography fontWeight={500}>Remove</Typography>
                 </Button>
                 <Button
                   variant="contained"
                   color="primary"
                   startIcon={<AddIcon />}
                   onClick={()=>setAddMemberDialog(true)}
                   sx={{
                     fontWeight: 500,
                     '&:hover': {
                       backgroundColor: 'primary.dark'
                     }
                   }}
                 >
                    <Typography fontWeight={500}>Add</Typography>
                 </Button>
                </Stack>
              </>
             )
         
        )}

        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1000,
            bgcolor: "background.paper",
            borderRadius: "50%",
            border: "none",
            color: "black",
            "&:hover": {
              bgcolor: "white",
              color: "black",
              transform: "scale(1.1)",
              transition: "all 0.3s ease",
            },
          }}
          onClick={() => navigateBack()}
        >
          <KeyboardBackspace />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 1,
            zIndex: 1000,
            bgcolor: "background.paper",
            borderRadius: "50%",
            border: "none",
            color: "black",
            "&:hover": {
              bgcolor: "white",
              color: "black",
              transform: "scale(1.1)",
              transition: "all 0.3s ease",
            },
            display: { xs: "block", sm: "none" },
          }}
          onClick={() => handleMobileMenu()}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
      <Drawer
        open={isMobileMenuOpen}
        onClose={() => closeDrawer()}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
            background: bgGradient,
            border: "none",
          },
          display: { xs: "block", sm: "none" },
        }}
      >
        <GroupList myGroups={chats} Chatid={ChatId} _id={""} />
      </Drawer>

      {confirmDeleteDialog && (
        <DeleteDialog
          open={() => setConfirmDeleteDialog(true)}
          close={() => setConfirmDeleteDialog(false)}
          deletehandler={() => deleteHandler()}
        />
      )}

      {
        addMemberDialog && (
            <AddMemberDialog  open={()=>setAddMemberDialog(true)} close={()=>setAddMemberDialog(false)} isloading={false} addMember={()=>addMemberHandler()}/>
        ) 
      }
    </Grid>
  );
};

const GroupList = ({ myGroups = [], Chatid }) => {
  return (
    <Stack>
      {myGroups && myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem key={group._id} group={group} Chatid={Chatid} />
        ))
      ) : (
        <Typography>No groups found</Typography>
      )}
    </Stack>
  );
};

const GroupListItem = ({ group, Chatid }) => {
  const { _id, name, avatar } = group;
  //   console.log(`group id: ${_id}, Chatid: ${Chatid}`);
  return (
    <Link
      sx={{
        textDecoration: "none",
        color: "inherit",
      }}
      to={`?group=${_id}`}
      onClick={(e) => {
        if (Chatid && String(_id) === String(Chatid)) {
          e.preventDefault();
          return;
        }
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={3}
        sx={{
          p: 2,
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <AvtarCard avatar={avatar} max={4} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};

export default memo(Group);
