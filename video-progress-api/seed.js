require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Video = require('./models/Video'); // Adjust path if needed

const videosData = [
  {
    _id: uuidv4(),
    title: "Full Stack Web Development Tutorial",
  description: "Learn full-stack development using the MERN stack – MongoDB, Express, React, and Node.js.",
  url: "https://www.youtube.com/embed/4Zvr0bKfK3E",
  duration: 7800, // 2 hours 10 minutes
  thumbnail:  "https://img.youtube.com/vi/nu_pCVPKzTk/maxresdefault.jpg",
  isPublished: true
  },
  {
    _id: uuidv4(),
    title: "React Tutorial For Beginners",
    description: "Learn React as an absolute beginner! This beginner-friendly tutorial covers everything you need to start coding.",
    url: "https://www.youtube.com/embed/pBFWFswUK2c?si=SObpsLZaopGaWxM2",
    duration: 1983,
    thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    isPublished: true
  },
  {
    _id: uuidv4(),
    title: "Node.js Backend Development Mastery",
  description: "Master Node.js for backend development with REST APIs, authentication, and MongoDB integration.",
  url: "https://www.youtube.com/embed/Oe421EPjeBE",
  duration: 6600, // 1 hour 50 minutes
  thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg",
  isPublished: true
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    await Video.deleteMany({}); // Optional: clear existing videos
    await Video.insertMany(videosData);
    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    await Video.deleteMany({});
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error('Error destroying data:', err);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}