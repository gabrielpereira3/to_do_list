import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

const todos = [{ id: 1, description: "My first todo", done: false }];

app.get("/todos", function (req, res) {
  res.json(todos);
});

app.listen(3000);
