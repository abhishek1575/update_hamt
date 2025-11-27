import React, { useState } from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Button,
  Box,
  Typography,
  Slide,
  useTheme,
  alpha,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";

const RequestFeed = () => {
  const theme = useTheme();
  const [requests, setRequests] = useState([
    {
      id: 1,
      user: "Alex Johnson",
      item: 'MacBook Pro 16"',
      status: "pending",
      time: "2 min ago",
      avatar: "AJ",
    },
    {
      id: 2,
      user: "Maria Garcia",
      item: "Dell UltraSharp Monitor",
      status: "approved",
      time: "15 min ago",
      action: "approved",
      avatar: "MG",
    },
    {
      id: 3,
      user: "David Smith",
      item: "Logitech MX Master 3S",
      status: "pending",
      time: "45 min ago",
      avatar: "DS",
    },
    {
      id: 4,
      user: "Admin",
      item: "CalDigit TS4 Dock",
      status: "rejected",
      time: "1 hour ago",
      action: "rejected",
      avatar: "AD",
    },
  ]);

  const [hoveredItem, setHoveredItem] = useState(null);

  const statusConfig = {
    pending: {
      color: "warning",
      bgColor: alpha("#f59e0b", 0.1),
      textColor: "#f59e0b",
      icon: <AccessTimeIcon sx={{ fontSize: 14 }} />,
    },
    approved: {
      color: "success",
      bgColor: alpha("#10b981", 0.1),
      textColor: "#10b981",
      icon: <CheckCircleIcon sx={{ fontSize: 14 }} />,
    },
    rejected: {
      color: "error",
      bgColor: alpha("#f43f5e", 0.1),
      textColor: "#f43f5e",
      icon: <CancelIcon sx={{ fontSize: 14 }} />,
    },
  };

  const handleApprove = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const getAvatarGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          "&:last-child": { pb: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Fixed Header */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 2,
            flexShrink: 0,
          }}
        >
          Real-Time Requests Feed
        </Typography>

        {/* Scrollable List Container */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            pr: 1,
            mr: -1,
            // Custom scrollbar styling
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: alpha(theme.palette.text.secondary, 0.2),
              borderRadius: 3,
              "&:hover": {
                bgcolor: alpha(theme.palette.text.secondary, 0.3),
              },
            },
          }}
        >
          <List sx={{ p: 0 }}>
            {requests.map((request, index) => (
              <React.Fragment key={request.id}>
                <ListItem
                  onMouseEnter={() => setHoveredItem(request.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{
                    px: 0,
                    py: 2,
                    flexDirection: "column",
                    alignItems: "stretch",
                    borderRadius: 2,
                    transition: "all 0.3s",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.hover",
                      px: 2,
                    },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
                    <ListItemAvatar sx={{ minWidth: 0 }}>
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          background: getAvatarGradient(index),
                          fontWeight: 600,
                          fontSize: 14,
                          boxShadow: `0 4px 12px ${alpha(
                            statusConfig[request.status].textColor,
                            0.2
                          )}`,
                          transition: "transform 0.3s",
                          ...(hoveredItem === request.id && {
                            transform: "scale(1.1) rotate(5deg)",
                          }),
                        }}
                      >
                        {request.avatar}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: "text.primary",
                            mb: 0.5,
                          }}
                        >
                          {request.user}{" "}
                          {request.action ? `${request.action} a` : "requested"}{" "}
                          <Box
                            component="span"
                            sx={{ fontWeight: 700, color: "primary.main" }}
                          >
                            {request.item}
                          </Box>
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          <Chip
                            icon={statusConfig[request.status].icon}
                            label={
                              request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)
                            }
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: 11,
                              fontWeight: 600,
                              bgcolor: statusConfig[request.status].bgColor,
                              color: statusConfig[request.status].textColor,
                              border: `1px solid ${alpha(
                                statusConfig[request.status].textColor,
                                0.2
                              )}`,
                              "& .MuiChip-icon": {
                                color: statusConfig[request.status].textColor,
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", fontSize: 12 }}
                          >
                            {request.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>

                  {/* Action Buttons */}
                  <Slide
                    direction="left"
                    in={hoveredItem === request.id}
                    timeout={300}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      {request.status === "pending" ? (
                        <>
                          <Button
                            size="small"
                            startIcon={<CancelIcon />}
                            onClick={() => handleReject(request.id)}
                            sx={{
                              textTransform: "none",
                              bgcolor: alpha("#f43f5e", 0.1),
                              color: "#f43f5e",
                              fontWeight: 600,
                              px: 2,
                              "&:hover": {
                                bgcolor: alpha("#f43f5e", 0.2),
                              },
                            }}
                          >
                            Reject
                          </Button>
                          <Button
                            size="small"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApprove(request.id)}
                            sx={{
                              textTransform: "none",
                              bgcolor: alpha("#10b981", 0.1),
                              color: "#10b981",
                              fontWeight: 600,
                              px: 2,
                              "&:hover": {
                                bgcolor: alpha("#10b981", 0.2),
                              },
                            }}
                          >
                            Approve
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          sx={{
                            textTransform: "none",
                            bgcolor: "action.hover",
                            color: "text.secondary",
                            fontWeight: 600,
                            px: 2,
                            "&:hover": {
                              bgcolor: "action.selected",
                            },
                          }}
                        >
                          Details
                        </Button>
                      )}
                    </Box>
                  </Slide>
                </ListItem>

                {index < requests.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestFeed;
