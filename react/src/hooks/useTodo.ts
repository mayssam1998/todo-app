import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTodos } from "../slices/todoSlice";
import { generateId } from "../utils/helper";

const useTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((st) => st.todos.data);

  useEffect(() => {
    const prevTodos = localStorage.getItem("todos");
    if (prevTodos) {
      dispatch(setTodos(JSON.parse(prevTodos)));
    }
  }, []);

  const addTodo = (todo: ToDoProp) => {
    const todoToAdd = { ...todo, id: generateId() };
    const prevTodos = [...todos];
    prevTodos.push(todoToAdd);
    dispatch(setTodos(prevTodos));
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    dispatch(setTodos(updatedTodos));
  };

  const editTodos = (toDo: ToDos) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== toDo.id);
    updatedTodos.push(toDo);
    dispatch(setTodos(updatedTodos));
  };

  return { addTodo, deleteTodo, editTodos };
};

export default useTodo;
