const express = require("express");

const app = express();
const port = 5000;

app.use(express.static("public/pages"));

app.listen(port, () => {
  console.log(`client page server listening at http://localhost:${port}`);
});
