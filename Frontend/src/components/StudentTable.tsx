import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

/* ================= TYPES ================= */

interface Student {
  id: number;
  name: string;
  email: string;
  password: string; // stored but NEVER shown
  course: string;
}

/* ================= COMPONENT ================= */

const StudentTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const data = localStorage.getItem("students");
    if (data) {
      setStudents(JSON.parse(data));
    }
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = () => {
    if (deleteId === null) return;

    const updated = students.filter((s) => s.id !== deleteId);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setDeleteId(null);
  };

  /* ================= EDIT ================= */

  const handleEditSave = () => {
    if (!editStudent) return;

    const updated = students.map((s) =>
      s.id === editStudent.id ? editStudent : s
    );

    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setEditStudent(null);
  };

  /* ================= EMPTY STATE ================= */

  if (students.length === 0) {
    return <Typography>No students registered yet.</Typography>;
  }

  /* ================= UI ================= */

  return (
    <>
      {/* ===== TABLE ===== */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => setEditStudent(s)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => setDeleteId(s.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ===== DELETE CONFIRMATION ===== */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>
          Are you sure you want to delete this student?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== EDIT STUDENT ===== */}
      <Dialog open={!!editStudent} onClose={() => setEditStudent(null)}>
        <DialogTitle>Edit Student</DialogTitle>

        {editStudent && (
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Name"
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    name: e.target.value
                  })
                }
              />

              <TextField
                label="Email"
                type="email"
                value={editStudent.email}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    email: e.target.value
                  })
                }
              />

              {/* ⚠️ Password intentionally NOT editable / visible */}

              <TextField
                label="Course"
                value={editStudent.course}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    course: e.target.value
                  })
                }
              />

              <Button
                variant="contained"
                onClick={handleEditSave}
              >
                Save Changes
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default StudentTable;
