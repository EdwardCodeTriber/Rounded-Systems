import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Picture from '/registerIcon.png';

const Login = ({ setAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load admin credentials from localStorage or default to a hardcoded admin
  const storedAdmin = JSON.parse(localStorage.getItem('admin')) || {
    username: 'admin',
    password: 'admin123',
  };

  const handleLogin = () => {
    // Matches the local
    if (username === storedAdmin.username && password === storedAdmin.password) {
      localStorage.setItem('admin', JSON.stringify({ username }));
      setAdmin({ username });
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: `url(${Picture}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Admin Login
      </Typography>
      {error && <Typography color="error" style={{ marginBottom: '20px' }}>{error}</Typography>}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Container>
  );
};

export default Login;
