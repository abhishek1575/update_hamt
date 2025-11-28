import http from "../http";

import Config from "../Config";

const BASE_URL = Config.API_BASE_URL + "api/users/";

export const getAdminDashboardStats = async () => {
  return http.get(`${BASE_URL}dashboard/admin`);
};

// GET: /api/requests/all
export const getAllRequests = async () => {
  try {
    const res = await http.get(`${BASE_URL}requests/all`);
    return res.data;
  } catch (err) {
    console.error("Error loading requests:", err);
    // fallback mock
    return [
      {
        id: 1,
        approvalStatus: "ISSUED",
        itemName: "Arduino Mega",
        userFullName: "Abhishek Khobe Updated",
        requestedAt: "2025-11-19T12:34:53.923084",
      },
    ];
  }
};

// GET: /api/items/inventory/summary
export const getInventorySummary = async () => {
  try {
    const res = await http.get("/api/items/inventory/summary");
    return res.data;
  } catch (err) {
    console.error("Error loading inventory summary:", err);
    return {
      outOfStock: 0,
      lowStock: 1,
    };
  }
};
