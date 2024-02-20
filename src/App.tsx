import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Todoitem from "./Todoitem";
import { useEffect, useState } from "react";
import { saveTodos } from "./Feature";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((ele) => {
      if (ele.id === id) ele.isCompleted = !ele.isCompleted;
      return ele;
    });
    setTodos(newTodos);
  };
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodo: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodo);
  };
  const editHandler = (id: string, newtitle: string): void => {
    const newTodos: TodoItemType[] = todos.map((ele) => {
      if (ele.id === id) ele.title = newtitle;
      return ele;
    });
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 1000)),
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  return (
    <Container maxWidth="sm" sx={{ height: "90vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((i) => (
          <Todoitem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
            editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={"New Task"}
        onKeyDown={(w) => {
          if (w.key === "Enter" && title !== "") submitHandler();
        }}
      />
      <Button
        sx={{ margin: "1rem 0" }}
        fullWidth
        variant="contained"
        onClick={submitHandler}
        disabled={title === ""}
      >
        ADD
      </Button>
    </Container>
  );
}

export default App;
