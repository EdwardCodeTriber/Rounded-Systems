import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Fab,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from "@mui/icons-material/Add";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    surname: "",
    position: "",
    email: "",
    idNumber: "",
    picture: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({ email: "", idNumber: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/employees");
      setEmployees(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showAlert("Failed to fetch employees", "error");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let emailError = "";

    if (!validateEmail(employee.email)) {
      emailError = "Invalid email format";
    }

    setErrors({ email: emailError });

    return !emailError;
  };

  const handleAddEmployee = async () => {
    if (!validateForm()) {
      showAlert("Please correct the form errors", "error");
      return;
    }

    setLoading(true);

    try {
      const employeeData = {
        id: employee.id, // unique identifier
        name: employee.name,
        surname: employee.surname,
        position: employee.position,
        email: employee.email,
        idNumber: employee.idNumber,
        picture: employee.picture || null,
      };

      if (editIndex > -1) {
        await axios.put(
          `http://localhost:5000/api/employees/${employee.id}`,
          employeeData
        );
        showAlert("Employee updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/employees", employeeData);
        showAlert("Employee added successfully");
      }

      setOpenDialog(false);
      fetchEmployees();
    } catch (error) {
      showAlert("Failed to save employee", "error");
    } finally {
      setLoading(false);
      // Reset the form state
      setEmployee({
        id: "",
        name: "",
        surname: "",
        position: "",
        email: "",
        idNumber: "",
        picture: "",
      });
      setEditIndex(-1);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEmployee(employees[index]);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/employees/${id}`);
      showAlert("Employee deleted successfully", "error");
      fetchEmployees();
    } catch (error) {
      showAlert("Failed to delete employee", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployee({ ...employee, picture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleOpenDialog = () => {
    setEmployee({
      id: "",
      name: "",
      surname: "",
      position: "",
      email: "",
      idNumber: "",
      picture: "",
    });
    setEditIndex(-1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter(
        (emp) =>
          emp.id &&
          emp.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Employee Registration System
      </Typography>

      <TextField
        label="Search by Employee ID"
        variant="outlined"
        fullWidth
        margin="dense"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
          {editIndex > -1 ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Surname"
            name="surname"
            value={employee.surname}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Position"
            name="position"
            value={employee.position}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email} // Show error message for email validation
          />
          <TextField
            label="ID Number"
            name="idNumber"
            value={employee.idNumber}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <br />
          <br />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Picture
            </Button>
          </label>
          {employee.picture && (
            <img src={employee.picture} alt="Employee" width="100" />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{ color: "yellow" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddEmployee}
            color="primary"
            sx={{ color: "green" }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : editIndex > -1 ? (
              "Update Employee"
            ) : (
              "Add Employee"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />

      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center" }}
      >
        Employee List
      </Typography>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>ID Number</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEmployees.map((emp, index) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.surname}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.idNumber}</TableCell>
              <TableCell>
                {emp.picture && (
                  <img src={emp.picture} alt={emp.name} width="50" />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  sx={{ backgroundColor: "yellow" }}
                  onClick={() => handleEdit(index)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  sx={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenDialog}
        style={{
          position: "fixed",
          bottom: 80,
          right: 80,
          backgroundColor: "green",
        }}
      >
        <AddIcon />
      </Fab>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Employees;
