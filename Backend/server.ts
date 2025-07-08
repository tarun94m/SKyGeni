// Import necessary modules
import express from 'express'; // Express framework
import cors from 'cors';       // Middleware for Cross-Origin Resource Sharing
import fs from 'fs';           // File system module for reading JSON files
import path from 'path';       // Path utility for resolving file locations

// Initialize Express app
const app = express();
const PORT = 5000;

// Enable CORS to allow frontend requests from different origins
app.use(cors());

// Helper function to read and parse JSON files from the data folder
const getData = (filename: string) => {
  const filePath = path.join(__dirname, 'data', filename); // Construct full path to file
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));    // Read and parse JSON content
};

// Define API routes to serve different datasets

// Route to serve Customer Type data
app.get('/api/customer-type', (_req, res) => {
  res.json(getData('customerType.json'));
});

// Route to serve Account Industry data
app.get('/api/account-industry', (_req, res) => {
  res.json(getData('accountIndustry.json'));
});

// Route to serve Team data
app.get('/api/team', (_req, res) => {
  res.json(getData('team.json'));
});

// Route to serve ACV Range data
app.get('/api/acv-range', (_req, res) => {
  res.json(getData('acvRange.json'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Log server URL
});
