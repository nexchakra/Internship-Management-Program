import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Stack
} from "@mui/material";
import { getInternships, createInternship } from "../api/internships";

interface Internship {
  id: string;
  title: string;
  company: string;
}

const AdminInternships = () => {
  const [list, setList] = useState<Internship[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const load = async () => {
    const res = await getInternships();
    setList(res.data);
  };

  const submit = async () => {
    await createInternship({ title, company });
    setTitle("");
    setCompany("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Manage Internships
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <TextField
            label="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <Button variant="contained" onClick={submit}>
            Create Internship
          </Button>

          {list.map(i => (
            <Paper key={i.id} sx={{ p: 1 }}>
              {i.title} — {i.company}
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default AdminInternships;
