import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../contexts/todoscontexts";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import ToDo from "./ToDo";
import { ToastContext } from "../contexts/toast";

export default function ToDoList() {
  const { showHideSnackBar } = useContext(ToastContext);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) settodos(storageTodos);
  }, []);
  // Get todos state and setter from context
  const { todos, settodos } = useContext(TodosContext);
  // State for the input field
  const [titleinput, settitleinput] = useState("");
  // State for the filter alignment
  const [alignment, setAlignment] = useState("all");

  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);
  const unCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);
  let filteredTodos = todos;
  // Filter todos based on the selected alignmenti

  if (alignment === "completed") {
    filteredTodos = completedTodos;
  } else if (alignment === "uncompleted") {
    filteredTodos = unCompletedTodos;
  } else {
    filteredTodos = todos;
  }

  // Render all todo items
  const todojsx = filteredTodos.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  // Handle filter change
  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };
  // Handle adding a new todo
  function handleClick() {
    if (titleinput == "") {
      return;
    }
    const newtodo = { id: uuidv4(), title: titleinput, isCompleted: false };
    const updatedTodos = [...todos, newtodo];
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // Clear the input field after adding
    settitleinput("");
    showHideSnackBar("the task have been added successfully"); // Show toast after adding
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight: "80vh", overflowY: "auto" }}>
        <CardContent>
          {/* Title */}
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            sx={{
              fontWeight: "bold",
              fontFamily: '"Cairo", "Roboto", "Arial", sans-serif',
            }}
          >
            My Tasks
          </Typography>
          <Divider className="mt-[-13px]" />
          {/* Filter buttons */}
          <ToggleButtonGroup
            class="flex justify-center mt-8"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="uncompleted">Uncompleted</ToggleButton>
          </ToggleButtonGroup>
          {/* Todo list */}
          {todojsx}
          {/* Add new todo input and button */}
          <Grid sx={{ marginTop: 2 }} container spacing={2}>
            <Grid size={8}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task Title"
                variant="outlined"
                value={titleinput}
                onChange={(e) => {
                  settitleinput(e.target.value);
                }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                disabled={titleinput === ""}
                variant="contained"
                color="primary"
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "26px",
                }}
                onClick={() => {
                  handleClick();
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
}
