const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build a To-Do API", completed: false },
];

app.get("/todos", (req, res) => res.json(todos));

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Task not found");
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Task not found");
  todo.task = req.body.task || todo.task;
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  res.send("Task deleted");
});

app.listen(PORT, () => {
  console.log(`To-Do API running at http://localhost:${PORT}`);
});
