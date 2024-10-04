import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCeIPWSeQqBOYbqQdWSS3lpZX8wGqJMQJ8",
  authDomain: "employee-register-node.firebaseapp.com",
  projectId: "employee-register-node",
  storageBucket: "employee-register-node.appspot.com",
  messagingSenderId: "905002802497",
  appId: "1:905002802497:web:8cdd4656e5b17a7f5615c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);