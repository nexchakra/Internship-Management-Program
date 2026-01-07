import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import StudentHome from "./pages/StudentHome";
import StudentInternships from "./pages/StudentInternships";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<StudentRegister />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ===== STUDENT ROUTES ===== */}
          <Route
            path="/student/home"
            element={
              <RoleProtectedRoute allowedRole="STUDENT">
                <StudentHome />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/student/internships"
            element={
              <RoleProtectedRoute allowedRole="STUDENT">
                <StudentInternships />
              </RoleProtectedRoute>
            }
          />

          {/* ===== ADMIN ROUTES ===== */}
          <Route
            path="/admin/dashboard"
            element={
              <RoleProtectedRoute allowedRole="ADMIN">
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
