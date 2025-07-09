import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { orange } from "../../constants/color";
import React, { lazy, Suspense } from "react";
import { Menu as MenuIcon  , Search as SearchIcon , Add as AddIcon , Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


//lazy loading and wrap these componenets in suspense
const SearchDialog = lazy(()=>import("../../specific/search"));
const NewGroupDialog = lazy(()=>import("../../specific/NewGroup"));
const NotificationDialog = lazy(()=>import("../../specific/Notification"));

const Header = () => {
  const navigate = useNavigate();
  const [isMenu , setIsMenu] = useState(false);
  const [isSearch , setIsSearch] = useState(false);
  const [isAdd , setIsAdd] = useState(false);
  const [isNotification , setIsNotification] = useState(false);

  const handleMenuClick = ()=>{
     setIsMenu((prev)=>!prev);
  }
  const opneSearchDialog =()=>{
    setIsSearch((prev)=>!prev);
  }

  const openAddDialog =()=>{
    setIsAdd((prev)=>!prev);
  }

  const openGroupDialog =()=>{
    navigate("/groups")
  }

  const openNotifications =()=>{
    setIsNotification((prev)=>!prev);
  }

  const logoutHandler =()=>{
    console.log("LOGOUT");
  }

  return (
    <Box sx={{ flexGrow: 1 }} height={"4rem"}>
      <AppBar position="static" sx={{ bgcolor: orange }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Chattu
          </Typography>

          <Box sx={{ display: { xs: "block  ", sm: "none" } }}>
            <IconButton color="inherit" size="large" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }}></Box>

          <Iconbtn title={"Search"} icon={<SearchIcon/>} onClick={opneSearchDialog}/>

          <Iconbtn title={"Add"} icon={<AddIcon/>} onClick={openAddDialog}/>

          <Iconbtn title={"Group"} icon={<GroupIcon/>} onClick={openGroupDialog}/>

          <Iconbtn title={"Notification"} icon={<NotificationsIcon/>} onClick={openNotifications}/>

          <Iconbtn title={"Logout"} icon={<LogoutIcon/>} onClick={logoutHandler}/>

          {
            isSearch && <Suspense fallback={<div>Loading...</div>}>
              <SearchDialog/>
            </Suspense>
          }

          {
            isAdd && <Suspense fallback={<div>Loading...</div>}>
              <NewGroupDialog/>
            </Suspense>
          }

          {
            isNotification && <Suspense fallback={<div>Loading...</div>}>
              <NotificationDialog/>
            </Suspense>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
};

const Iconbtn= ({title , icon , onClick})=>{
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header;
