const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port or a custom one

// Custom middleware to log requests
app.use((req, res, next) => {
  // Log information about the incoming request
  console.log(`Request: ${req.method} ${req.url}`);
  next(); // Continue to the next middleware or route
});

// Serve all files from the project directory
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});