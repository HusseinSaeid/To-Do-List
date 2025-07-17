import Button from "@mui/material/Button";
import MySnackbars from "./components/Toast";
import ToDoList from "./components/ToDoList";
import { TodosContext } from "./contexts/todoscontexts";
import { ToastContext } from "./contexts/toast";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedDarkMode !== null) setDarkMode(storedDarkMode);
  }, []);
  // State for todos and its setter
  const [todos, settodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const mode = !darkMode ? "Light Mode" : "Dark Mode";
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  }
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideSnackBar(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2500);
  }

  return (
    <div
      className="App flex justify-center items-center h-screen"
      style={{
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "white" : "black",
      }}
    >
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <Button
          onClick={toggleDarkMode}
          variant="contained"
          sx={{
            background: !darkMode ? "white" : "black",
            color: darkMode ? "white" : "black",
          }}
        >
          {mode}
        </Button>
      </div>

      {/* Provide todos state to the app via context */}
      <TodosContext.Provider value={{ todos, settodos }}>
        <ToastContext.Provider value={{ showHideSnackBar }}>
          <MySnackbars open={open} message={message} />
          <ToDoList />
        </ToastContext.Provider>
      </TodosContext.Provider>
    </div>
  );
}

export default App;
