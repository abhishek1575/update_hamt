import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Chip,
  useTheme,
  alpha,
  Tooltip,
  Grow,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const LowStockItems = () => {
  const theme = useTheme();

  const items = [
    {
      name: "NVIDIA RTX 4090",
      current: 2,
      total: 10,
      percentage: 20,
      color: "#f43f5e",
      status: "critical",
      icon: <ErrorOutlineIcon sx={{ fontSize: 16 }} />,
    },
    {
      name: "Corsair Vengeance DDR5 32GB",
      current: 8,
      total: 50,
      percentage: 16,
      color: "#f43f5e",
      status: "critical",
      icon: <ErrorOutlineIcon sx={{ fontSize: 16 }} />,
    },
    {
      name: "Samsung 980 Pro 2TB NVMe SSD",
      current: 15,
      total: 100,
      percentage: 15,
      color: "#f59e0b",
      status: "low",
      icon: <WarningAmberIcon sx={{ fontSize: 16 }} />,
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Low Stock Items
          </Typography>
          <Chip
            icon={<TrendingDownIcon sx={{ fontSize: 16 }} />}
            label={`${items.length} Items`}
            size="small"
            sx={{
              height: 28,
              fontSize: 12,
              fontWeight: 600,
              bgcolor: alpha("#f43f5e", 0.1),
              color: "#f43f5e",
              border: `1px solid ${alpha("#f43f5e", 0.2)}`,
              "& .MuiChip-icon": {
                color: "#f43f5e",
              },
            }}
          />
        </Box>

        {/* Items List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {items.map((item, index) => (
            <Grow
              key={index}
              in
              timeout={300 + index * 100}
              style={{ transformOrigin: "0 0 0" }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    bgcolor: item.color,
                    transition: "width 0.3s",
                  },
                  "&:hover": {
                    bgcolor: alpha(item.color, 0.02),
                    borderColor: alpha(item.color, 0.3),
                    boxShadow: `0 4px 12px ${alpha(item.color, 0.15)}`,
                    "&::before": {
                      width: 6,
                    },
                  },
                }}
              >
                {/* Item Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: 1.5,
                        bgcolor: alpha(item.color, 0.1),
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: 14,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>

                  <Chip
                    label={
                      item.status === "critical" ? "Critical" : "Low Stock"
                    }
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      bgcolor: alpha(item.color, 0.1),
                      color: item.color,
                      border: `1px solid ${alpha(item.color, 0.2)}`,
                    }}
                  />
                </Box>

                {/* Stock Count */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: 12,
                    }}
                  >
                    Stock Level
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      fontSize: 13,
                    }}
                  >
                    <Box component="span" sx={{ color: item.color }}>
                      {item.current}
                    </Box>{" "}
                    / {item.total}
                  </Typography>
                </Box>

                {/* Progress Bar */}
                <Tooltip
                  title={`${item.percentage}% remaining`}
                  placement="top"
                  arrow
                >
                  <Box sx={{ position: "relative" }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: alpha(item.color, 0.1),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 1,
                          background: `linear-gradient(90deg, ${
                            item.color
                          }, ${alpha(item.color, 0.7)})`,
                          boxShadow: `0 0 8px ${alpha(item.color, 0.4)}`,
                          transition: "transform 0.3s",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 9,
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.percentage}%
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grow>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LowStockItems;
