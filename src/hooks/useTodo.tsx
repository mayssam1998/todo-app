import { useEffect, useState } from "react";

const useTodo = () => {
  const [todos, settodos] = useState<ToDoProp[] | undefined | null>();
  const prevTodos = localStorage.getItem("todolist");
  
  useEffect(() => {
    if (prevTodos) {
      settodos(JSON.parse(prevTodos));
    }
  }, []);

  const addTodo = (todo: ToDoProp) => {
    const prevTodos = localStorage.getItem("todolist");
    if (!prevTodos) {
      localStorage.setItem("todolist", JSON.stringify([todo]));
      return;
    }
    const prev = JSON.parse(prevTodos) as ToDoProp[];
    prev.push(todo);
    localStorage.setItem("todolist", JSON.stringify(prev));
    settodos(prev);
    alert("To do added sucessfully");
  };

  const deleteTodo = (todoprop: ToDoProp) => {
    const prevTodos = JSON.parse(
      localStorage.getItem("todolist")!
    ) as ToDoProp[];

    const filter = prevTodos.filter((todo) => todo.title !== todoprop.title);
    localStorage.setItem("todolist", JSON.stringify(filter));
    settodos(filter);
    alert("Todo is deleted sucessfully");
  };

  const editTodos = (todoprop: ToDoProp) => {
    const prevTodos = JSON.parse(
      localStorage.getItem("todolist")!
    ) as ToDoProp[];

    const filter = prevTodos.filter((todo) => todo.title !== todoprop.title);
    filter.push(todoprop);
    localStorage.setItem("todolist", JSON.stringify(filter));
    settodos(filter);
  };

  return { todos, addTodo, deleteTodo, editTodos };
};

export default useTodo;
