import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from "@mui/material";

const AssetByCategoryChart = () => {
  const theme = useTheme();

  const categories = [
    { label: "Laptops (60%)", color: "#3b82f6", percentage: 60 },
    { label: "Monitors (25%)", color: "#10b981", percentage: 25 },
    { label: "Other (15%)", color: "#f59e0b", percentage: 15 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 3, md: 6 },
        py: 3,
        height: "100%",
      }}
    >
      {/* Donut Chart */}
      <Box sx={{ position: "relative", width: 192, height: 192 }}>
        <svg
          style={{
            width: "100%",
            height: "100%",
            transform: "rotate(-90deg)",
          }}
          viewBox="0 0 36 36"
        >
          {/* Background Circle */}
          <circle
            cx="18"
            cy="18"
            fill="none"
            r="15.91549430918954"
            strokeWidth="3"
            stroke={
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[200]
            }
          />
          {/* Blue Segment - 60% */}
          <circle
            cx="18"
            cy="18"
            fill="none"
            r="15.91549430918954"
            strokeDasharray="60, 100"
            strokeDashoffset="25"
            strokeLinecap="round"
            strokeWidth="3"
            stroke="#3b82f6"
          />
          {/* Green Segment - 25% */}
          <circle
            cx="18"
            cy="18"
            fill="none"
            r="15.91549430918954"
            strokeDasharray="25, 100"
            strokeDashoffset="-35"
            strokeLinecap="round"
            strokeWidth="3"
            stroke="#10b981"
          />
          {/* Amber Segment - 15% */}
          <circle
            cx="18"
            cy="18"
            fill="none"
            r="15.91549430918954"
            strokeDasharray="15, 100"
            strokeDashoffset="-60"
            strokeLinecap="round"
            strokeWidth="3"
            stroke="#f59e0b"
          />
        </svg>

        {/* Center Text */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            1,428
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            Total Assets
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: category.color,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: 14,
              }}
            >
              {category.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const ComponentStockLevelChart = () => {
  const components = [
    { label: "RAM", height: 80, color: "#3b82f6" },
    { label: "SSD", height: 60, color: "#10b981" },
    { label: "CPU", height: 45, color: "#f59e0b" },
    { label: "PSU", height: 90, color: "#a855f7" },
    { label: "GPU", height: 30, color: "#f43f5e" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 2,
        px: 2,
        py: 3,
        height: "100%",
        minHeight: 280,
      }}
    >
      {components.map((item) => (
        <Box
          key={item.label}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover .bar": {
              bgcolor: "primary.main",
              transform: "scaleY(1.05)",
            },
          }}
        >
          <Box
            className="bar"
            sx={{
              width: "100%",
              height: `${item.height}%`,
              bgcolor: "action.hover",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              transition: "all 0.3s",
              position: "relative",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: "text.secondary",
              fontSize: 12,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const InsightCard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
          Assets & Components Insights
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", flexShrink: 0 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 40,
                textTransform: "none",
                fontWeight: 500,
                fontSize: 14,
                px: 1,
                minWidth: "auto",
                mr: 3,
              },
            }}
          >
            <Tab label="Asset by Category" />
            <Tab label="Component Stock Level" />
          </Tabs>
        </Box>

        {/* Tab Content - Flexible Height */}
        <Box sx={{ flex: 1, mt: 2, overflow: "hidden" }}>
          {activeTab === 0 ? (
            <AssetByCategoryChart />
          ) : (
            <ComponentStockLevelChart />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
