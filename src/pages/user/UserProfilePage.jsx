import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/userAPI/usersAPI";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Chip,
  IconButton,
  alpha,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getUserProfile(userId);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [userId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Failed to load profile
        </Typography>
      </Box>
    );
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((x) => x[0])
      .join("")
      .toUpperCase();
  };

  const infoItems = [
    {
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      label: "Email Address",
      value: profile.email,
      color: "#3b82f6",
    },
    {
      icon: <BadgeIcon sx={{ fontSize: 20 }} />,
      label: "Designation",
      value: profile.designation,
      color: "#8b5cf6",
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 20 }} />,
      label: "Department",
      value: profile.department,
      color: "#10b981",
    },
    {
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 20 }} />,
      label: "Role",
      value: profile.role,
      color: "#f59e0b",
    },
  ];

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: { xs: 1, sm: 2 } }}>
      {/* Header Card with Gradient Background */}
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          mb: 2,
          position: "relative",
        }}
      >
        {/* Gradient Background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            height: 100,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))",
            },
          }}
        />

        <CardContent sx={{ mt: -7, position: "relative", pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              gap: 2,
            }}
          >
            {/* Avatar with Border */}
            <Avatar
              sx={{
                width: 100,
                height: 100,
                fontSize: 32,
                fontWeight: 700,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "4px solid white",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
              }}
            >
              {getInitials(profile.name)}
            </Avatar>

            {/* User Info */}
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", sm: "left" },
                mt: { xs: 0, sm: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: { xs: "center", sm: "flex-start" },
                  mb: 1,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {profile.name}
                </Typography>
                <Chip
                  icon={<AdminPanelSettingsIcon sx={{ fontSize: 16 }} />}
                  label={profile.role}
                  size="small"
                  sx={{
                    height: 28,
                    fontWeight: 600,
                    bgcolor: alpha("#667eea", 0.1),
                    color: "#667eea",
                    border: `1px solid ${alpha("#667eea", 0.2)}`,
                    "& .MuiChip-icon": {
                      color: "#667eea",
                    },
                  }}
                />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {profile.designation} • {profile.department}
              </Typography>
            </Box>

            {/* Edit Button */}
            <IconButton
              sx={{
                bgcolor: alpha("#667eea", 0.1),
                color: "#667eea",
                width: 48,
                height: 48,
                position: { xs: "relative", sm: "absolute" },
                top: { sm: 110 },
                right: { sm: 24 },
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "#667eea",
                  color: "white",
                  transform: "rotate(90deg)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Information Grid */}
      <Grid container spacing={2}>
        {infoItems.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                border: 1,
                borderColor: "divider",
                transition: "all 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 20px ${alpha(item.color, 0.15)}`,
                  borderColor: item.color,
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(item.color, 0.1),
                      color: item.color,
                      flexShrink: 0,
                      transition: "transform 0.3s",
                      ".MuiCard-root:hover &": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        fontSize: 11,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        mt: 0.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
