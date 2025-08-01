const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const videoRoutes = require('./routes/videos');
const progressRoutes = require('./routes/progress');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Video Progress Tracking API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

// Set port
const PORT = process.env.PORT || 5000;

// Start server and connect to MongoDB
const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Mongo URI:', process.env.MONGO_URI); // Debug log

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
