import { useEffect, useState } from "react";
import { Container, Paper, Button, Typography } from "@mui/material";
import { getInternships } from "../api/internships";
import { applyInternship } from "../api/applications";

const StudentHome = () => {
  const [internships, setInternships] = useState<any[]>([]);

  useEffect(() => {
    getInternships().then(res => setInternships(res.data));
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Available Internships</Typography>

        {internships.map(i => (
          <Paper key={i.id} sx={{ p: 2, mt: 2 }}>
            <Typography>{i.title}</Typography>
            <Typography color="text.secondary">{i.company}</Typography>

            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => applyInternship(i.id)}
            >
              Apply
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default StudentHome;
