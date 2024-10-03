import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import EmployeeList from './Components/EmployeeList';
import Login from './Components/Login';
import DeletedEmployees from './Components/DeletedEmployees';

const App = () => {
  const [admin, setAdmin] = useState(() => JSON.parse(localStorage.getItem('admin')) || null);

  return (
    <Router>
      <Container>
        <Routes>
          {/* If admin is logged in, show EmployeeList, else redirect to Login */}
          <Route path="/" element={admin ? <EmployeeList admin={admin} setAdmin={setAdmin} /> : <Login setAdmin={setAdmin} />} />
          <Route path="/login" element={<Login setAdmin={setAdmin} />} />
          <Route path="/deleted" element={<DeletedEmployees />} />

        </Routes>
      </Container>
    </Router>
  );
};

export default App;
