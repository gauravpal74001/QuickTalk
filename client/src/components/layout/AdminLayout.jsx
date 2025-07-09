import { bgGradient } from "../../constants/color";
import {
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Person as UserIcon,
  Group as GroupIcon,
  Chat as ChatIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Link as LinkComponent, useLocation } from "react-router-dom";

const adminTabs = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    icon: <UserIcon />,
    path: "/admin/users",
  },
  {
    name: "Manage Groups",
    icon: <GroupIcon />,
    path: "/admin/manage-groups",
  },
  {
    name: "Chats",
    icon: <ChatIcon />,
    path: "/admin/chats",
  },
];

const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
  borderRadius: "1rem",
  "&:hover": {
    background: "rgba(0,0,0,0.2)",
  },
});

const AdminLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const location = useLocation();

  const handleMenu = () => {
    return setMenuOpen((prev) => !prev);
  };
  return (
    <Grid container width="100vw" height="100vh">
      <Grid
        item
        sm={4}
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          background: bgGradient,
          p: 2,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          width: {
            xs: "0",
            md: "250px",
          },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        sm={8}
        md={8}
        lg={9}
        xs={12}
        sx={{
          width: "100%",
          marginLeft: {
            xs: "0",
            md: "250px",
          },
          padding: {
            xs: "10px",
            md: "20px",
          },
          height: "100vh",
          position: "relative",
        }}
      >
        {children}
        {!menuOpen ? (
          <IconButton
            onClick={() => handleMenu()}
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              zIndex: 1000,
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleMenu()}
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              zIndex: 1000,
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Grid>
      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            background: bgGradient,
            p: 2,
            height: "100vh",
            position: "fixed",
          },
        }}
      >
        <Sidebar />
      </Drawer>
    </Grid>
  );
};

const Sidebar = () => {
    const logoutHandler= () => {
        console.log("logout")
    };
  return (
    <Stack>
      <Typography
        variant="h4"
        fontWeight={500}
        color="white"
        textAlign="center"
        mb={2}
      >
        Sidebar
      </Typography>

      <Stack direction="column" gap={2} padding={2}>
        {adminTabs.map((tab) => {
          return (
            <Link
              key={tab.path}
              to={tab.path}
              sx={{
                background:
                  location.pathname === tab.path
                    ? "rgba(0,0,0,0.8)"
                    : "transparent",
              }}
            >
              <Stack
                direction="row"
                alignItems="start"
                justifyContent="space-between"
                gap={2}
              >
                {tab.icon}
                <Typography variant="body1" fontWeight={500} color="white">
                  {tab.name}
                </Typography>
              </Stack>
            </Link>
          );
        })}

        <Link onClick={logoutHandler}>
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            gap={2}
          >
            {<LogoutIcon/>}
            <Typography variant="body1" fontWeight={500} color="white">
              Logout
            </Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
