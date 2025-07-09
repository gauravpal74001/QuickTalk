import AdminLayout from "../../components/layout/AdminLayout";
import { Navigate } from "react-router-dom";
import { Box, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Group as GroupIcon
} from "@mui/icons-material";

const AdminDashboard = () => {
  const isAdmin = true;

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <AdminLayout>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          pt: "5rem",
          pb: 3,
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Appbar />

        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 3,
            height: "15rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary">
            Analytics Dashboard
          </Typography>
          
        </Paper>

        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 3,
            height: "25rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600} color="primary">
            Statistics Overview
          </Typography>
          {/* Add your statistics content here */}
        </Paper>

        <Paper elevation={3} sx={{
            width: "100%",
            p: 3,
            height: "25rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
             <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            sx={{ 
              mt: 2,
              height: "100%",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            {/* Users Widget */}
            <Paper
              elevation={2}
              sx={{
                p: 1.5,
                width: { xs: '100%', sm: '30%' },
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <PersonIcon sx={{ fontSize: 30 }} />
                <Typography variant="h5" fontWeight={600}>
                  250
                </Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Total Users
              </Typography>
            </Paper>

            {/* Messages Widget */}
            <Paper
              elevation={2}
              sx={{
                p: 1.5,
                width: { xs: '100%', sm: '30%' },
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <MessageIcon sx={{ fontSize: 30 }} />
                <Typography variant="h5" fontWeight={600}>
                  1.2K
                </Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Total Messages
              </Typography>
            </Paper>

            {/* Groups Widget */}
            <Paper
              elevation={2}
              sx={{
                p: 1.5,
                width: { xs: '100%', sm: '30%' },
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <GroupIcon sx={{ fontSize: 30 }} />
                <Typography variant="h5" fontWeight={600}>
                  50
                </Typography>
              </Stack>
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Total Groups
              </Typography>
            </Paper>
          </Stack>
        </Paper>
       
      </Container>
    </AdminLayout>
  );
};

const Appbar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        position:"absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        borderRadius: 0,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: 2,
          gap: { xs: 1, md: 2 },
          maxWidth: "xl",
          margin: "0 auto",
        }}
      >
        <IconButton color="primary" sx={{ p: 1 }}>
          <AdminPanelSettingsIcon />
        </IconButton>

        <TextField
          placeholder="Search"
          size="small"
          sx={{
            width: { xs: "100%", md: "300px" },
            backgroundColor: "background.paper",
          }}
        />

        <Button
          startIcon={<SearchIcon />}
          variant="contained"
          color="primary"
          sx={{
            display: { xs: "none", md: "flex" },
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Search
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="primary"
          sx={{
            p: 1,
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <NotificationsIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default AdminDashboard;
