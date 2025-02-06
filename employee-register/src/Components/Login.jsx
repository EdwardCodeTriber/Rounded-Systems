import { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Picture from '/registerIcon.png';

const Login = ({ setAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error'
  });
  const navigate = useNavigate();
  const auth = getAuth();

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setAdmin({ username: user.email });
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Successfully logged in!',
        severity: 'success'
      });

      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Invalid email or password',
        severity: 'error'
      });
      console.error('Login error:', error);
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
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <Button variant="contained" color="error" onClick={handleLogin} fullWidth>
        Login
      </Button>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;