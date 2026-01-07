import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Box,
  Snackbar,
  Alert
} from "@mui/material";
import api from "../api/axios";

interface Internship {
  id: string;
  title: string;
  company: string;
}

const StudentInternships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await api.get("/internships");
      setInternships(res.data);
    } catch {
      setError("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  const applyInternship = async (internshipId: string) => {
    try {
      await api.post("/apply", { internshipId });
      setMessage("Application submitted");
    } catch {
      setError("Failed to apply");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight={700} mb={3}>
        Available Internships
      </Typography>

      {loading && <Typography>Loading...</Typography>}

      {!loading && internships.length === 0 && (
        <Typography>No internships available</Typography>
      )}

      <Stack spacing={2}>
        {internships.map((internship) => (
          <Paper
            key={internship.id}
            elevation={3}
            sx={{ p: 3, borderRadius: 2 }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Box>
                <Typography variant="h6">
                  {internship.title}
                </Typography>
                <Typography color="text.secondary">
                  {internship.company}
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => applyInternship(internship.id)}
              >
                Apply
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>

      {/* Success Snackbar */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentInternships;
