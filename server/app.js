const express = require("express");
const http = require("http");

const app = express();
const port = 4000;

let clients = [];

app.get("/subscribe", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  };
  res.writeHead(200, headers);

  const newClient = {
    id: Date.now(),
    res,
  };

  clients.push(newClient);

  req.on("close", () => {
    console.log(`connection closed: ${newClient.id}`);
    clients = clients.filter((client) => client.id !== newClient.id);
  });
});

app.get("/test", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  http.get("http://localhost:3000/download", (res) => {
    const totalBytes = parseInt(res.headers["x-file-size"]);
    let recieved = 0;

    res.on("data", (chunk) => {
      recieved += chunk.length;

      const data = `data: ${((recieved / totalBytes) * 100).toFixed(2)}\n\n`;

      clients.forEach((client) => client.res.write(data));
    });
  });

  res.end();
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
