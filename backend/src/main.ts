import express from "express";
const app = express();

const todos = [{ description: "D", done: true }];

app.get("/todos", function (req, res) {
  res.json(todos);
});

app.listen(3000);
