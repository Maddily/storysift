
// tests/setup.js

// Import necessary modules
const app = require("../app");
const mongoose = require("mongoose");

// Function to close the Express server
const closeServer = async () => {
  await new Promise(resolve => {
    app.close(resolve); // Close Express server
  });
  await mongoose.disconnect(); // Close MongoDB connection
};

// Run after all tests have finished
afterAll(async () => {
  await closeServer();
});

