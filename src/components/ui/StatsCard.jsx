import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Link,
  useTheme,
  alpha,
  Fade,
  Grow,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StatCard = ({
  title,
  value,
  trend,
  trendValue,
  chartPath,
  delay,
  link,
  iconColor,
}) => {
  const theme = useTheme();
  const [raised, setRaised] = useState(false);

  const trendConfig = {
    up: {
      icon: <TrendingUpIcon sx={{ fontSize: 16 }} />,
      color: "#10b981",
      bgColor: alpha("#10b981", 0.1),
    },
    down: {
      icon: <TrendingDownIcon sx={{ fontSize: 16 }} />,
      color: "#f43f5e",
      bgColor: alpha("#f43f5e", 0.1),
    },
    flat: {
      icon: <TrendingFlatIcon sx={{ fontSize: 16 }} />,
      color: "#64748b",
      bgColor: alpha("#64748b", 0.1),
    },
  };

  const colorMap = {
    "text-emerald-500": "#10b981",
    "text-rose-500": "#f43f5e",
    "text-amber-500": "#f59e0b",
    "text-blue-500": "#3b82f6",
    "text-purple-500": "#a855f7",
  };

  const chartColor = colorMap[iconColor] || theme.palette.primary.main;

  return (
    <Grow in timeout={delay}>
      <Card
        onMouseEnter={() => setRaised(true)}
        onMouseLeave={() => setRaised(false)}
        sx={{
          height: "100%",
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: raised
            ? `0 12px 28px ${alpha(chartColor, 0.2)}`
            : "0 1px 3px rgba(0, 0, 0, 0.05)",
          transform: raised ? "translateY(-8px)" : "translateY(0)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${chartColor}, ${alpha(
              chartColor,
              0.6
            )})`,
            transform: raised ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.4s ease",
          },
        }}
      >
        <CardContent
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "&:last-child": { pb: 3 },
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: 0.3,
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Value and Trend */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: { xs: "2rem", sm: "2.25rem" },
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            <Chip
              icon={trendConfig[trend].icon}
              label={trendValue}
              size="small"
              sx={{
                height: 28,
                fontSize: 12,
                fontWeight: 700,
                bgcolor: trendConfig[trend].bgColor,
                color: trendConfig[trend].color,
                border: `1px solid ${alpha(trendConfig[trend].color, 0.2)}`,
                transition: "all 0.3s",
                "& .MuiChip-icon": {
                  color: trendConfig[trend].color,
                  ml: 0.5,
                },
                "&:hover": {
                  bgcolor: trendConfig[trend].color,
                  color: "white",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                },
              }}
            />
          </Box>

          {/* Mini Chart */}
          <Box
            sx={{
              height: 48,
              mb: 2,
              mx: -1,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              style={{
                width: "100%",
                height: "100%",
              }}
              viewBox="0 0 100 30"
              preserveAspectRatio="none"
            >
              {/* Background gradient */}
              <defs>
                <linearGradient
                  id={`gradient-${title.replace(/\s/g, "")}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={chartColor} stopOpacity="0.3" />
                  <stop
                    offset="100%"
                    stopColor={chartColor}
                    stopOpacity="0.05"
                  />
                </linearGradient>
              </defs>

              {/* Filled area */}
              <path
                d={`${chartPath} L100,30 L0,30 Z`}
                fill={`url(#gradient-${title.replace(/\s/g, "")})`}
              />

              {/* Line */}
              <path
                d={chartPath}
                fill="none"
                stroke={chartColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  filter: `drop-shadow(0 2px 4px ${alpha(chartColor, 0.3)})`,
                }}
              />
            </svg>
          </Box>

          {/* View Details Link */}
          <Fade in={raised} timeout={300}>
            <Link
              href={link}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "primary.main",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.3s",
                "&:hover": {
                  gap: 1,
                  color: chartColor,
                },
              }}
            >
              View Details
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </Fade>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default StatCard;
