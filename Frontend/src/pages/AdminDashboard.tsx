import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button
} from "@mui/material";
import StudentTable from "../components/StudentTable";

const AdminDashboard = () => {
  const students = JSON.parse(localStorage.getItem("students") || "[]");

  const totalStudents = students.length;
  const totalCourses = new Set(
    students.map((s: any) => s.course)
  ).size;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Container maxWidth="lg">
      {/* ===== HEADER ===== */}
      <Box
        mt={4}
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview of registered students
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>

      {/* ===== STATS CARDS ===== */}
      <Box
        display="flex"
        gap={3}
        mb={4}
        flexWrap="wrap"
      >
        <Paper
          elevation={2}
          sx={{ p: 3, flex: "1 1 300px" }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Total Students
          </Typography>
          <Typography variant="h3" fontWeight={600}>
            {totalStudents}
          </Typography>
        </Paper>

        <Paper
          elevation={2}
          sx={{ p: 3, flex: "1 1 300px" }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Total Courses
          </Typography>
          <Typography variant="h3" fontWeight={600}>
            {totalCourses}
          </Typography>
        </Paper>
      </Box>

      {/* ===== TABLE SECTION ===== */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Registered Students
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <StudentTable />
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
