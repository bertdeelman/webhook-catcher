const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let webhooks = [];

app.use(express.json());
app.use(express.static("public"));

app.post("/webhook", (req, res) => {
  const payload = {
    data: req.body,
    timestamp: new Date().toISOString(),
  };
  webhooks.push(payload);
  res.json({ status: "received", received: payload });
});

app.get("/api/webhooks", (req, res) => {
  res.json(webhooks);
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
