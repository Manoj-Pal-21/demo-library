const express = require('express');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./connection/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes//auth');
const path = require('path');
const booksRoutes = require('./routes/books');
const transactionsRoutes = require('./routes/transactions');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cors())

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/checkserver", (req, res) => {
  res.send("server is running")
})

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/transactions', transactionsRoutes);

// Serve static files from the frontend build directory
const frontendPath = path.join(__dirname, '../FRONTEND/dist');
app.use(express.static(frontendPath));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  console.log(frontendPath)
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
