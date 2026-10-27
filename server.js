const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const messageHandler = require("./api/message");

const homepage = fs.readFileSync(path.join(__dirname, "public", "index.html"));
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host || "localhost"}`).pathname;

  if (pathname === "/" && request.method === "GET") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(homepage);
    return;
  }

  if (pathname === "/api/message") {
    messageHandler(request, response);
    return;
  }

  response.statusCode = 404;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.end("Page not found");
});

server.listen(port, () => {
  console.log(`Node website running at http://localhost:${port}`);
});
