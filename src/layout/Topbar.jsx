import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyIcon from "@mui/icons-material/Key";
import UserProfilePage from "../pages/user/UserProfilePage.jsx";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authAPI/AuthService.js";

const Topbar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(anchorEl);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuItemClick = () => {
    setIsProfileOpen(true);
    handleClose();
  };

  const handleProfileDialogClose = () => {
    setIsProfileOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutConfirmOpen(true);
    handleClose();
  };

  const handleLogoutConfirmClose = () => {
    setIsLogoutConfirmOpen(false);
  };

  const handleLogoutConfirm = () => {
    AuthService.logout();
    navigate("/");
    handleLogoutConfirmClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar
        sx={{
          height: 80,
          px: { xs: 2, md: 4 },
          justifyContent: "space-between",
        }}
      >
        {/* Left Section - Mobile Menu Only */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: "text.primary",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Right Section - Search Bar & Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
          <TextField
            size="small"
            placeholder="Search assets..."
            variant="outlined"
            sx={{
              width: { xs: "180px", sm: "240px", md: "280px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "action.hover",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "background.paper",
                },
                "&.Mui-focused": {
                  bgcolor: "background.paper",
                  boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.12)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "action.hover",
                color: "text.primary",
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          <IconButton
            onClick={handleProfileClick}
            sx={{
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <AccountCircleIcon fontSize="small" />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isProfileMenuOpen}
            onClose={handleClose}
            PaperProps={{
              elevation: 8,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={handleProfileMenuItemClick}
              sx={{
                py: 1.5,
                "&:hover": {
                  bgcolor: "action.hover",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem
              sx={{
                py: 1.5,
                "&:hover": {
                  bgcolor: "action.hover",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon>
                <KeyIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              </ListItemIcon>
              <ListItemText>Change Password</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogoutClick}
              sx={{
                py: 1.5,
                "&:hover": {
                  bgcolor: "error.lighter",
                  "& .MuiListItemIcon-root": {
                    color: "error.main",
                  },
                  "& .MuiListItemText-primary": {
                    color: "error.main",
                  },
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
          <Dialog
            open={isProfileOpen}
            onClose={handleProfileDialogClose}
            maxWidth="md"
            fullWidth
          >
            <DialogContent>
              <UserProfilePage />
            </DialogContent>
          </Dialog>
          <Dialog
            open={isLogoutConfirmOpen}
            onClose={handleLogoutConfirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to log out?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleLogoutConfirmClose}>No</Button>
              <Button onClick={handleLogoutConfirm} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
