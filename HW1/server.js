const http = require('http');
const url = require('url');

let homeCounter = 0;
let aboutCounter = 0;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/') {
        homeCounter++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>Home Page</h1>`);
        res.write(`<p>This page has been viewed ${homeCounter} times.</p>`);
        res.write(`<a href="/about">Go to About Page</a>`);
        res.end();
    } else if (parsedUrl.pathname === '/about') {
        aboutCounter++;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<h1>About Page</h1>`);
        res.write(`<p>This page has been viewed ${aboutCounter} times.</p>`);
        res.write(`<a href="/">Go to Home Page</a>`);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<h1>404 Not Found</h1>`);
        res.write(`<p>The page you are looking for does not exist.</p>`);
        res.write(`<a href="/">Go to Home Page</a>`);
        res.end();
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
