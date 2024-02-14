import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [editTodo, seteditTodo] = useState<ToDoProp | undefined>();
  return (
    <>
      <h1 className="text-center text-4xl font-bold gradient p-3">
        To Do List
      </h1>
      <div className="container mx-auto p-3">
        
        <AddTodoForm edit={editTodo} />
        <ToDoList setEdit={seteditTodo} />
      </div>
    </>
  );
};

export default App;
