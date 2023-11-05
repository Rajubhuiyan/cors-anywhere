// Require the necessary modules
const express = require('express');
const request = require('request');
const cors = require('cors');

// Create an Express app
const app = express();

// Use the CORS middleware
app.use(cors());

// Enable pre-flight requests for all routes
app.options('*', cors());

// Proxy endpoint
app.use('/cors-anywhere/*', (req, res) => {
    // Target URL is passed as a query parameter 
    const targetUrl = req.params[0]; 
    if (!targetUrl) {
        res.status(400).send('No URL specified');
        return;
    }

    // Options for the proxy request
    const options = {
        url: targetUrl,
        method: req.method,
        headers: {
            'User-Agent': req.get('User-Agent'),
        },
    };

    // Pipe the request to the target URL
    req.pipe(request(options)).pipe(res);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
