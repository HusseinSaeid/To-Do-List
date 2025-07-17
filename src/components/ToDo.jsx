import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useState, useContext } from "react";
import { TodosContext } from "../contexts/todoscontexts";
import { ToastContext } from "../contexts/toast";

export default function ToDo({ todo }) {
  const { showHideSnackBar } = useContext(ToastContext);

  // Dialog state for delete and edit
  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const [showEditDialog, setEditDialog] = useState(false);
  // State for the edited todo title
  const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title });
  const { todos, settodos } = useContext(TodosContext);

  // Toggle the completion state of the todo
  // Toggle the completion state of the todo and show toast
  function handleCheckClick() {
    const updatedTodo = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    settodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    // Show toast after marking as completed/uncompleted
    showHideSnackBar(
      updatedTodo.find((t) => t.id === todo.id).isCompleted
        ? "Task marked as completed"
        : "Task marked as uncompleted"
    );
  }

  // Confirm deletion of the todo
  function handlClickConfirmation() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setDeleteDialog(false);
    showHideSnackBar("the task has been deleted successfully"); // Show toast after deletion
  }

  // Open the delete confirmation dialog
  function handlDeleteClick() {
    setDeleteDialog(true);
  }

  // Close the confirmation dialog
  function handlDeletClose() {
    setDeleteDialog(false);
  }

  // Confirm edit and update the todo title
  function handlEditConfirmation() {
    // If the input is empty, just close the dialog and reset the value
    if (!updatedTodo.title.trim()) {
      setEditDialog(false); // Just close the dialog without updating
      setUpdatedTodo({ title: todo.title });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      // Reset to original value
      return;
    }
    // Otherwise, update the todo title
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) return { ...t, title: updatedTodo.title };
      else {
        return t;
      }
    });

    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setEditDialog(false);
    showHideSnackBar("Task updated successfully"); // Show toast after edit
  }

  // Open the edit dialog
  function handleEditClick() {
    setEditDialog(true);
  }

  // Close the edit dialog
  function handleEditClose() {
    setEditDialog(false);
  }

  return (
    <>
      {/* Delete confirmation dialog */}
      <Dialog
        onClose={handlDeletClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This task will be deleted permanently and you can't undo this
            action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlDeletClose}>No</Button>
          <Button autoFocus onClick={handlClickConfirmation}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit task dialog */}
      <Dialog open={showEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Edit the title of your task below.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="edit-title"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />

          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handlEditConfirmation}>Save</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Todo card */}
      <Card
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
            paddingTop: 2,
            paddingBottom: 2,
          },
          marginTop: 4,
          minWidth: 275,
          backgroundColor: "primary.main",
          color: "white",
          opacity: todo.isCompleted ? 1 : 0.8,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid sx={{ marginTop: 3 }} size={8}>
              {/* Todo title */}
              <Typography
                variant="h5"
                align="left"
                sx={{
                  fontFamily: '"Cairo", "Roboto", "Arial", sans-serif',
                }}
              >
                {todo.title}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Stack sx={{ marginTop: 2 }} direction="row" spacing={1}>
                {/* Complete button */}
                <IconButton
                  onClick={handleCheckClick}
                  aria-label="check"
                  sx={{
                    color: todo.isCompleted ? "white" : "#4caf50",
                    backgroundColor: todo.isCompleted ? "#4caf50" : "white",
                    border: "2px solid #4caf50",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: todo.isCompleted ? "#66bb6a" : "#c8e6c9",
                      boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <CheckIcon />
                </IconButton>
                {/* Edit button */}
                <IconButton
                  onClick={handleEditClick}
                  aria-label="edit"
                  sx={{
                    color: "#fb8c00",
                    backgroundColor: "white",
                    border: "2px solid #fb8c00",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ffe0b2",
                      boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                {/* Delete button */}
                <IconButton
                  onClick={handlDeleteClick}
                  aria-label="delete"
                  sx={{
                    color: "#d32f2f",
                    backgroundColor: "white",
                    border: "2px solid #d32f2f",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ef9a9a",
                      boxShadow: "0px 7px 7px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </>
  );
}
