const express = require("express");
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: "Complete web development course", completed: false },
  { id: 2, task: "Learn JavaScript", completed: true },
  { id: 3, task: "Learn React", completed: true },
  { id: 4, task: "Learn python", completed: false },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const foundTodo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!foundTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(foundTodo);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: req.body.completed ?? false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const foundTodo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!foundTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  foundTodo.task = req.body.task ?? foundTodo.task;
  foundTodo.completed = req.body.completed ?? foundTodo.completed;

  res.json(foundTodo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
  res.json({ message: "Todo deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
