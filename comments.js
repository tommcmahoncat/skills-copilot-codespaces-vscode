// Create web server that serves the comments.html file
// Use the fs module to read the file and send it to the client
// The comments.html file should contain a form that allows users to submit comments
// When the form is submitted, the server should append the comment to a file called comments.txt
// The server should also serve the comments.txt file when the user visits /comments

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("comments.html", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else if (req.url === "/comments") {
    fs.readFile("comments.txt", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.setHeader("Content-Type", "text/plain");
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/comments") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      fs.appendFile("comments.txt", body + "\n", (err) => {
        if (err) {
          res.statusCode = 500;
          res.end("Internal Server Error");
        } else {
          res.end("Comment added");
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Run the server by running node comments.js in the terminal.
// Open your browser and go to http://localhost:3000 to view the comments.html page.
// Submit a comment in the form and click the "Submit" button.
// The comment should be added to the comments.txt file.
// Go to http://localhost:3000/comments to view the comments in the comments.txt file.

// Explanation
// The server is created using the http module's createServer method, which takes a callback function that handles incoming

// Create a web server that listens on port 3000 and serves the comments.html file. 
// Use the fs module to read the file and send it to the client.
