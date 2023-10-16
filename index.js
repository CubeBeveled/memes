const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port or a custom one

// Serve all files from the project directory
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});