import MySnackbars from "./components/Toast";
import ToDoList from "./components/ToDoList";
import { TodosContext } from "./contexts/todoscontexts";
import { ToastContext } from "./contexts/toast";
import { useState } from "react";
import "./App.css";

function App() {
  // State for todos and its setter
  const [todos, settodos] = useState([]);
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
    <div className="App flex justify-center items-center h-screen">
      <div style={{ position: "absolute", top: 20, right: 20 }}></div>

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
