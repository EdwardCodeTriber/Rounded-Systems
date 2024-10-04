const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Firebase Admin SDK initialization
const serviceAccount = require('./employee-register-node-firebase-adminsdk-f7oio-5266eefcf2.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "employee-register-node.appspot.com",
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// POST /login route to authenticate user 
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    try {
      // Generate Firebase custom token
      const customToken = await admin.auth().createCustomToken(username);
      return res.status(200).json({ token: customToken });
    } catch (error) {
      console.error('Error creating custom token:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});


// Example route to verify the Firebase Admin setup
app.get('/test-firebase', (req, res) => {
    res.send('Firebase Admin SDK is set up correctly!');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const express = require('express');
// const admin = require('firebase-admin');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// // for handling file uploads
// const multer = require('multer');  

// // 
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(require('./employee-register-node-firebase-adminsdk-f7oio-5266eefcf2.json')),
//   storageBucket: 'gs://employee-register-node.appspot.com',
// });

// const db = admin.firestore();
// const bucket = admin.storage().bucket();

// // Set up file upload handling using multer
// const upload = multer({
//   storage: multer.memoryStorage(), // store files in memory
// });

// const PORT = process.env.PORT || 5000;

// // Hardcoded admin credentials 
// const adminCredentials = {
//     username: 'admin@gmail.com',
//     password: 'admin123',
//   };
  
//   // POST /login to validate user credentials
//   app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     // Validate credentials
//     if (username === adminCredentials.username && password === adminCredentials.password) {
//       try {
//         // Create a Firebase token
//         const customToken = await admin.auth().createCustomToken(username);
//         return res.status(200).json({ token: customToken });
//       } catch (error) {
//         console.error('Error creating custom token:', error);
//         return res.status(500).json({ error: 'Error generating token' });
//       }
//     } else {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }
//   });


// //API Post Method

// app.post('/employees', upload.single('photo'), async (req, res) => {
//     try {
//       const { name, surname, age, idNumber, role } = req.body;
//       const file = req.file;
  
//       // Upload employee photo to Firebase Storage
//       const fileName = `employees/${idNumber}_${file.originalname}`;
//       const fileUpload = bucket.file(fileName);
//       await fileUpload.save(file.buffer, {
//         metadata: { contentType: file.mimetype },
//       });
  
//       const photoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  
//       // Store employee details in Firestore
//       const employeeData = { name, surname, age, idNumber, role, photoUrl };
//       await db.collection('employees').doc(idNumber).set(employeeData);
  
//       res.status(201).json({ message: 'Employee added successfully', employeeData });
//     } catch (error) {
//       res.status(500).json({ error: 'Error adding employee', details: error.message });
//     }
//   });
  
//   //API GET method

//   app.get('/employees', async (req, res) => {
//     try {
//       const employeesSnapshot = await db.collection('employees').get();
//       const employees = employeesSnapshot.docs.map(doc => doc.data());
//       res.status(200).json(employees);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching employees', details: error.message });
//     }
//   });
  

//   //API PUT Method
//   app.put('/employees/:idNumber', upload.single('photo'), async (req, res) => {
//     try {
//       const { idNumber } = req.params;
//       const { name, surname, age, role } = req.body;
//       let photoUrl;
  
//       // If a new photo is uploaded, replace the old one
//       if (req.file) {
//         const file = req.file;
//         const fileName = `employees/${idNumber}_${file.originalname}`;
//         const fileUpload = bucket.file(fileName);
//         await fileUpload.save(file.buffer, {
//           metadata: { contentType: file.mimetype },
//         });
  
//         photoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//       }
  
//       const updatedData = { name, surname, age, role };
//       if (photoUrl) updatedData.photoUrl = photoUrl;
  
//       await db.collection('employees').doc(idNumber).update(updatedData);
//       res.status(200).json({ message: 'Employee updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating employee', details: error.message });
//     }
//   });

// //API DELETE Method

// app.delete('/employees/:idNumber', async (req, res) => {
//     try {
//       const { idNumber } = req.params;
  
//       // Remove photo from Firebase Storage
//       const employeeSnapshot = await db.collection('employees').doc(idNumber).get();
//       const employeeData = employeeSnapshot.data();
//       if (employeeData && employeeData.photoUrl) {
//         const fileName = `employees/${idNumber}_${employeeData.photoUrl.split('/').pop()}`;
//         await bucket.file(fileName).delete();
//       }
  
//       // Remove employee from Firestore
//       await db.collection('employees').doc(idNumber).delete();
  
//       res.status(200).json({ message: 'Employee deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error deleting employee', details: error.message });
//     }
//   });

// //API GET & SEARCH method
// app.get('/employees/:idNumber', async (req, res) => {
//     try {
//       const { idNumber } = req.params;
//       const employeeSnapshot = await db.collection('employees').doc(idNumber).get();
  
//       if (!employeeSnapshot.exists) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
  
//       res.status(200).json(employeeSnapshot.data());
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching employee', details: error.message });
//     }
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });