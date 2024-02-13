import { useEffect, useState } from "react";

const useTodo = () => {
  const [todos, setTodos] = useState<ToDoProp[] | undefined | null>();

  // useEffect(() => {
  //   const prevTodos = localStorage.getItem("todolist");
  //   if (prevTodos) {
  //     setToDos(JSON.parse(prevTodos));
  //   }
  // }, []);

  const addTodo = (todo: ToDoProp) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos ? [...prevTodos, todo] : [todo];
      return updatedTodos;
    });
    alert("To do added successfully");
  };

  const updateTodo = (updatedTodo: ToDoProp) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos?.map((todo) =>
        todo.title === updatedTodo.title ? updatedTodo : todo
      );
      localStorage.setItem("todolist", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const deleteTodo = (todoprop: ToDoProp) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos?.filter(
        (todo) => todo.title !== todoprop.title
      );
      localStorage.setItem("todolist", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    alert("Todo is deleted successfully");
  };


  return { todos, addTodo, deleteTodo, updateTodo };
};

export default useTodo;
