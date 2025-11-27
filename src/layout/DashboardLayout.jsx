// DashboardLayout.jsx
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <Topbar onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />

        {/* Page Content with Container */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: "background.default",
            // Custom scrollbar styling
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              borderRadius: 2,
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.2)",
              },
            },
          }}
        >
          <Box sx={{ maxWidth: "1600px", mx: "auto" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

// import React from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex flex-1 flex-col">
//         <Topbar />
//         <main className="flex-1 overflow-y-auto p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
