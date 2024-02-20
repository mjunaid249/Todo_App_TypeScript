import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: string) => void;
  completeHandler: (id: string) => void;
  editHandler: (id: string, newtitle: string) => void;
};

const Todoitem = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <Paper
      variant="elevation"
      sx={{
        padding: "1rem 0.5rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(w) => {
              if (w.key === "Enter" && textVal !== "") {
                editHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}

        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => setEditActive((prev) => !prev)}
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteHandler(todo.id)}
          variant="contained"
          sx={{
            margin: "0 .3rem",
          }}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default Todoitem;
