import { useEffect, useState } from "react";
import { setTodos } from "../slices/todoSlice";
import { useAppDispatch } from "../app/hooks";

const useTodo = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const prevTodos = localStorage.getItem("todolist");
    if (prevTodos) {
      dispatch(setTodos(JSON.parse(prevTodos)));
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
    dispatch(setTodos(prev));
    localStorage.setItem("todolist", JSON.stringify(prev));
    alert("To do added sucessfully");
  };

  const deleteTodo = (todoprop: ToDoProp) => {
    const prevTodos = JSON.parse(
      localStorage.getItem("todolist")!
    ) as ToDoProp[];

    const filter = prevTodos.filter((todo) => todo.title !== todoprop.title);
    localStorage.setItem("todolist", JSON.stringify(filter));
    dispatch(setTodos(filter));
    alert("Todo is deleted sucessfully");
  };

  const editTodos = (todoprop: ToDoProp) => {
    const prevTodos = JSON.parse(
      localStorage.getItem("todolist")!
    ) as ToDoProp[];

    const filter = prevTodos.filter((todo) => todo.title !== todoprop.title);
    filter.push(todoprop);
    localStorage.setItem("todolist", JSON.stringify(filter));
    dispatch(setTodos(filter));
  };

  return {  addTodo, deleteTodo, editTodos };
};

export default useTodo;
