const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {

    // Get the requested URL
    const route = req.url.split('?')[0];

    // Handle CSS file requests
if (route === '/style.css') {

    const cssPath = path.join(__dirname, 'public', 'style.css');

    fs.readFile(cssPath, 'utf8', (err, data) => {

        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('Unable to load CSS');
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/css'
        });

        res.end(data);
    });

    return;
}

    // Define the routes and their HTML files
    const routes = {
        '/': 'home.html',
        '/home': 'home.html',
        '/about': 'about.html',
        '/contact': 'contact.html'
    };

    // Check whether the requested route exists
    const page = routes[route];

    // Function to read and serve an HTML file
    function servePage(fileName, statusCode) {

        const filePath = path.join(__dirname, 'pages', fileName);

        // Read the HTML file asynchronously
        fs.readFile(filePath, 'utf8', (err, data) => {

            // Handle file reading errors
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('500 - Internal Server Error');
                return;
            }

            // Send the HTML page to the browser
            res.writeHead(statusCode, {
                'Content-Type': 'text/html'
            });

            res.end(data);
        });
    }

    // Handle invalid routes
    if (!page) {
        servePage('404.html', 404);
        return;
    }

    // Serve the requested page
    servePage(page, 200);
});

const cssPath=path.join(__dirname,'public','style.css');

// Define the port
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});