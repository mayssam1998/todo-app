import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import ToDoList from "./components/ToDoList";
import AddNote from "./components/AddNote";

const App = () => {
  return (
    <>
      <h1 className="text-center text-4xl font-bold gradient p-3">
        To Do List
      </h1>
      <div className="container mx-auto p-3">
        <AddNote />
        <AddTodoForm />
        <ToDoList />
      </div>
    </>
  );
};

export default App;
