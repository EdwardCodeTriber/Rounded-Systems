import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';

const Employees = () => {
  const [employees, setEmployees] = useState(() => JSON.parse(localStorage.getItem('employees')) || []);
  const [deletedEmployees, setDeletedEmployees] = useState(() => JSON.parse(localStorage.getItem('deletedEmployees')) || []);
  const [nextId, setNextId] = useState(() => JSON.parse(localStorage.getItem('nextId')) || 1);
  const [editIndex, setEditIndex] = useState(-1);
  const [employee, setEmployee] = useState({ id: '', name: '', surname: '', position: '', email: '', phone: '', picture: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); 
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' }); 
  const [errors, setErrors] = useState({ email: '', phone: '' }); 

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('deletedEmployees', JSON.stringify(deletedEmployees));
  }, [deletedEmployees]);

  useEffect(() => {
    localStorage.setItem('nextId', JSON.stringify(nextId));
  }, [nextId]);

  const handleInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  // Email validation function using a regex pattern
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let emailError = '';

    if (!validateEmail(employee.email)) {
      emailError = 'Invalid email format';
    }

    setErrors({ email: emailError });

    return !emailError; // Returns true if the email is valid
  };

  const handleAddEmployee = () => {
    if (!validateForm()) {
      showAlert('Please correct the form errors', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (editIndex > -1) {
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = employee;
        setEmployees(updatedEmployees);
        showAlert('Employee updated successfully');
        setEditIndex(-1);
      } else {
        const newEmployee = { ...employee, id: nextId };
        setEmployees([...employees, newEmployee]);
        setNextId(nextId + 1); // Increment the next ID
        showAlert('Employee added successfully');
      }
      setEmployee({ id: '', name: '', surname: '', position: '', email: '', phone: '', picture: '' });
      setOpenDialog(false);
      setLoading(false);
    }, 1000); // Simulate loading time
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEmployee(employees[index]);
    setOpenDialog(true); // Open the dialog for editing
  };

  const handleDelete = (index) => {
    setLoading(true);
    setTimeout(() => {
      const removedEmployee = employees[index];
      setDeletedEmployees([...deletedEmployees, removedEmployee]);
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
      showAlert('Employee deleted successfully', 'error');
      setLoading(false);
    }, 1000); // Simulate loading time
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
    setEmployee({ id: '', name: '', surname: '', position: '', email: '', phone: '', picture: '' });
    setEditIndex(-1);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((emp) =>
    emp.id.toString().includes(searchQuery)
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{display:"flex", justifyContent:'center'}}>Employee Registration System</Typography>

      <TextField
        label="Search by Employee ID"
        variant="outlined"
        fullWidth
        margin="dense"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>{editIndex > -1 ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
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
            label="Phone"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <br />
          <br />

          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="image-upload" />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" startIcon={<AddPhotoAlternateIcon />}>Upload Picture</Button>
          </label>
          {employee.picture && <img src={employee.picture} alt="Employee" width="100" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" sx={{ color: "yellow" }}>Cancel</Button>
          <Button onClick={handleAddEmployee} color="primary" sx={{ color: "green" }}>
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : (editIndex > -1 ? 'Update Employee' : 'Add Employee')}
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />

      <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>Employee List</Typography>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
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
              <TableCell>{emp.phone}</TableCell>
              <TableCell>{emp.picture && <img src={emp.picture} alt={emp.name} width="50" />}</TableCell>
              <TableCell>
                <IconButton sx={{ backgroundColor: "yellow" }} onClick={() => handleEdit(index)}><EditIcon /></IconButton>
                
                <IconButton sx={{ backgroundColor: "red" }} onClick={() => handleDelete(index)}><DeleteIcon /></IconButton>
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
          position: 'fixed',
          bottom: 80,
          right: 80,
          backgroundColor: "green"
        }}
      >
        <AddIcon />
      </Fab>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Employees;
