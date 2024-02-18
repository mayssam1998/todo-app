import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import useTodo from "../hooks/useTodo";
import Modal from "./Modal";
import NoteInput from "./NoteInput";
import TodoCard from "./TodoCard";
import { useSearchParams, Navigate, useNavigate } from "react-router-dom";

const ToDoList = () => {
  const todos = useAppSelector((st) => st.todos.data);
  const [todosData, setTodosData] = useState<ToDos[]>(todos);
  const { deleteTodo, editTodos } = useTodo();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const searchParams = queryParameters.get("search");
  const [selectedTodo, setSelectedTodo] = useState<ToDos>({
    id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    if (searchParams) {
      const filter = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchParams.toLowerCase()) ||
          todo.content.toLowerCase().includes(searchParams.toLowerCase())
      );
      setTodosData(filter);
    } else {
      setTodosData(todos);
    }
  }, [searchParams, todos]);

  const resetFilter = () => {
    navigate("/");
    return;
  };

  if (todosData.length == 0) {
    return (
      <div className="p-3 text-center rounded-md font-bold text-xl py-4">
        <p>
          {searchParams
            ? "No todo found in the search result !!"
            : " No Todo Found !!"}
        </p>
        {searchParams && (
          <button onClick={resetFilter} className="btn mt-4">
            Clear Search
          </button>
        )}
      </div>
    );
  }
  return (
    <>
      {searchParams && (
        <div className="flex items-center justify-between">
          <h2>
            Showing result of :{" "}
            <span className="text-primary font-bold cursor-pointer">
              {searchParams}
            </span>
          </h2>
          <button onClick={resetFilter} className="btn">
            Show all
          </button>
        </div>
      )}
      <div className="flex flex-wrap justify-center align-top gap-6">
        {todosData.map((todo, i) => (
          <TodoCard
            key={i}
            todo={todo}
            open={open}
            setOpen={() => setOpen(true)}
            selectedTodo={selectedTodo}
            setSelectedTodo={() => setSelectedTodo(todo)}
          />
        ))}
      </div>
      <Modal open={open} closeModel={() => setOpen(false)}>
        {selectedTodo && (
          <div className="relative rounded-lg flex flex-col justify-between flex-[3] min-w-80">
            <div className="p-3">
              <input
                type="text"
                defaultValue={selectedTodo.title}
                className="text-xl font-semibold mb-4 outline-none w-full bg-transparent"
                onBlur={() => editTodos(selectedTodo)}
                onChange={(e) =>
                  setSelectedTodo((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <NoteInput
                value={selectedTodo.content}
                onBlur={() => editTodos(selectedTodo)}
                onChange={(value) =>
                  setSelectedTodo((prev) => ({ ...prev, content: value }))
                }
              />
            </div>
            <div className="borde-t-2 p-3 box-border border-t dark:border-brown sticky bottom-0 w-full flex justify-between">
              <div
                className="text-red-500 cursor-pointer w-fit"
                onClick={() => {
                  deleteTodo(selectedTodo.id);
                  setOpen(false);
                }}
              >
                <Trash2 />
              </div>
              <button
                className="btn danger w-fit"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ToDoList;
