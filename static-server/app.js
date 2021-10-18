const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.get("/download", async (req, res) => {
  const filePath = path.join(__dirname, "public/files/hearthstone.zip");
  const { size } = await fs.promises.stat(filePath);
  res.setHeader("x-file-size", size);

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`static server listening at http://localhost:${port}`);
});
