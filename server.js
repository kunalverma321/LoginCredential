const express = require('express');
const path = require('path');
const app = express();

// Serve static files (e.g., HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Define any routes (if needed)
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});
