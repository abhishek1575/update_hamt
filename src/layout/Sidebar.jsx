import React, { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemoryIcon from "@mui/icons-material/Memory";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuItems = [
    { id: "dashboard", icon: <DashboardIcon />, label: "Dashboard" },
    { id: "assets", icon: <StorageIcon />, label: "Assets" },
    { id: "components", icon: <BuildIcon />, label: "Components" },
    { id: "users", icon: <PeopleIcon />, label: "Users" },
  ];

  const drawerWidth = isCollapsed ? 80 : 256;

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const DrawerContent = () => (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      {/* Header/Logo */}
      <Box
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
          px: isCollapsed ? 0 : 3,
          transition: "all 0.3s",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "rotate(10deg) scale(1.05)",
              },
            }}
          >
            <MemoryIcon sx={{ color: "white", fontSize: 26 }} />
          </Box>
          <Collapse in={!isCollapsed} orientation="horizontal">
            <Box
              sx={{
                fontWeight: 700,
                fontSize: 20,
                color: "text.primary",
                letterSpacing: 0.5,
              }}
            >
              HAM
            </Box>
          </Collapse>
        </Box>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Navigation Menu */}
      <List
        sx={{
          flex: 1,
          px: 1.5,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {menuItems.map((item) => (
          <Tooltip
            key={item.id}
            title={isCollapsed ? item.label : ""}
            placement="right"
            arrow
            TransitionProps={{ timeout: 300 }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={activeItem === item.id}
                onClick={() => handleItemClick(item.id)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: isCollapsed ? 2 : 2.5,
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    bgcolor: "primary.main",
                    transform:
                      activeItem === item.id ? "scaleY(1)" : "scaleY(0)",
                    transition: "transform 0.3s",
                  },
                  "&.Mui-selected": {
                    bgcolor: "primary.lighter",
                    color: "primary.main",
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                      transform: "scale(1.1)",
                    },
                  },
                  "&:hover": {
                    bgcolor:
                      activeItem === item.id
                        ? "primary.lighter"
                        : "action.hover",
                    transform: "translateX(4px)",
                    "& .MuiListItemIcon-root": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isCollapsed ? 0 : 40,
                    color: "text.secondary",
                    transition: "all 0.3s",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <Collapse in={!isCollapsed} orientation="horizontal">
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  />
                </Collapse>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Settings */}
      <Box sx={{ px: 1.5, py: 2 }}>
        <Tooltip title={isCollapsed ? "Settings" : ""} placement="right" arrow>
          <ListItemButton
            sx={{
              borderRadius: 2,
              py: 1.5,
              px: isCollapsed ? 2 : 2.5,
              justifyContent: isCollapsed ? "center" : "flex-start",
              transition: "all 0.3s",
              "&:hover": {
                bgcolor: "action.hover",
                "& .MuiListItemIcon-root": {
                  transform: "rotate(45deg)",
                  color: "primary.main",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isCollapsed ? 0 : 40,
                color: "text.secondary",
                transition: "transform 0.3s",
                justifyContent: "center",
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            <Collapse in={!isCollapsed} orientation="horizontal">
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            </Collapse>
          </ListItemButton>
        </Tooltip>
      </Box>

      {/* Collapse Button (Desktop Only) */}
      {!isMobile && (
        <Box sx={{ px: 1.5, pb: 2 }}>
          <Tooltip
            title={isCollapsed ? "Expand" : "Collapse"}
            placement="right"
          >
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{
                width: "100%",
                borderRadius: 2,
                py: 1,
                border: 1,
                borderColor: "divider",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              {isCollapsed ? (
                <ChevronRightIcon sx={{ color: "text.secondary" }} />
              ) : (
                <ChevronLeftIcon sx={{ color: "text.secondary" }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: 1,
            borderColor: "divider",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <DrawerContent />
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: 256,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    </>
  );
};

export default Sidebar;
