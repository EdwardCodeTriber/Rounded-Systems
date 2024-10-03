import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Employees from "./Employees";
import Footer from "./Footer";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const EmployeeList = ({ admin, setAdmin }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [profilePicture, setProfilePicture] = useState(admin.picture || "");
  const [newName, setNewName] = useState(admin.username);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [adminProfile, setAdminProfile] = useState({ username: '', password: '' });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));
    if (storedAdmin) {
      setAdminProfile(storedAdmin);
    }
  }, []);

  const handleInputChange = (e) => {
    setAdminProfile({ ...adminProfile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    localStorage.setItem('admin', JSON.stringify(adminProfile));
    setAdmin(adminProfile);
    setAlert({ open: true, message: 'Profile updated successfully', severity: 'success' });
    setOpenDialog(false);
  };

  useEffect(() => {
    if (admin.picture) {
      setProfilePicture(admin.picture);
    }
  }, [admin.picture]);

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleUpdateProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setAdmin((prev) => ({
        ...prev,
        username: newName,
        picture: profilePicture,
      }));
      setLoading(false);
      handleCloseProfile();
    }, 1000);
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#475569" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            Welcome, {admin.username}
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile"
                width="50"
                style={{
                  borderRadius: "50%",
                  marginLeft: "10px",
                }}
              />
            )}
          </Typography>
          {/* onClick={handleOpenProfile} */}
          <Button color="inherit" onClick={() => setOpenDialog(true)} >
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/deleted">
            Deleted Employees
          </Button>
          <Button color="inherit" onClick={handleOpenLogoutDialog}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", 
          padding: "20px",
          width: "100%",
        }}
      >
        <Container
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {loading ? <CircularProgress /> : <Employees />}
        </Container>
      </Box>

      <Footer /> {/* Footer is placed here */}

      {/* Profile Dialog */}
      <Dialog open={openProfile} onClose={handleCloseProfile}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            id="profile-picture-upload"
            style={{ display: "none" }}
            onChange={handleProfilePictureUpload}
          />
          <label htmlFor="profile-picture-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ mt: 2 }}
            >
              Upload Picture
            </Button>
          </label>
          {profilePicture && (
            <img
              src={profilePicture}
              alt="Profile"
              width="100"
              style={{ marginTop: "10px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="white"
            sx={{ backgroundColor: "red" }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      {/* //// */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Admin Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="dense"
            value={adminProfile.username}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            value={adminProfile.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveProfile} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeList;
