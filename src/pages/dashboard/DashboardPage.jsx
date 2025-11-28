import React, { useEffect, useState } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import InsightCard from "../../components/ui/InsightCard";
import StatCard from "../../components/ui/StatsCard";
import LowStockItems from "../../components/ui/LowStockItems";
import RequestFeed from "../../components/ui/RequestFeed";
import { getAdminDashboardStats } from "../../services/dashboard/dashboardService.js";

const StatsCards = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminDashboardStats();
        const data = response.data;
        const newStats = [
          {
            title: "Total Items",
            value: data.totalItems || 0,
            trend: "up",
            trendValue: "2.1%",
            chartPath:
              "M0 20 L10 18 L20 22 L30 20 L40 18 L50 15 L60 12 L70 15 L80 18 L90 14 L100 12",
            delay: 100,
            link: "#",
            iconColor: "text-emerald-500",
          },
          {
            title: "Damaged Items",
            value: data.damageItems || 0,
            trend: "down",
            trendValue: "0.5%",
            chartPath:
              "M0 10 L10 12 L20 8 L30 11 L40 14 L50 16 L60 19 L70 17 L80 15 L90 18 L100 20",
            delay: 200,
            link: "#",
            iconColor: "text-rose-500",
          },
          {
            title: "Low Stock Items",
            value: data.lowStockItems || 0,
            trend: "flat",
            trendValue: "1.2%",
            chartPath:
              "M0 15 L10 18 L20 16 L30 19 L40 22 L50 20 L60 18 L70 21 L80 23 L90 20 L100 22",
            delay: 300,
            link: "#",
            iconColor: "text-amber-500",
          },
          {
            title: "Pending Approvals",
            value: data.pendingApprovals || 0,
            trend: "up",
            trendValue: "5.0%",
            chartPath:
              "M0 25 L10 22 L20 20 L30 17 L40 14 L50 11 L60 8 L70 6 L80 9 L90 7 L100 5",
            delay: 400,
            link: "#",
            iconColor: "text-emerald-500",
          },
          {
            title: "Total Requests",
            value: data.totalRequests || 0,
            trend: "up",
            trendValue: "15%",
            chartPath:
              "M0 28 L10 25 L20 26 L30 22 L40 20 L50 18 L60 15 L70 12 L80 10 L90 8 L100 5",
            delay: 500,
            link: "#",
            iconColor: "text-emerald-500",
          },
        ];
        setStats(newStats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 150 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} lg key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

// Main DashboardPage Component with New Layout
const DashboardPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "100%",
      }}
    >
      {/* Stats Cards Section - Top Row */}
      <StatsCards />

      {/* Insights and Request Feed Section - Side by Side with Fixed Height */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ height: { xs: "auto", lg: 550 } }}>
            <InsightCard />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{ height: { xs: "auto", lg: 550 } }}>
            <RequestFeed />
          </Box>
        </Grid>
      </Grid>

      {/* Low Stock Items - Full Width Bottom */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LowStockItems />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
