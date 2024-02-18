import { Trash2 } from "lucide-react";
import useTodo from "../hooks/useTodo";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";

type Props = {
  todo: ToDos;
  open: boolean;
  setOpen: () => void;
  selectedTodo: ToDos;
  setSelectedTodo: () => void;
};

const TodoCard = (props: Props) => {
  const { todo, setOpen, selectedTodo, setSelectedTodo, open } = props;
  const { deleteTodo } = useTodo();
  const { title, id, content } = todo;
  const viewType = useAppSelector((st) => st.todos.viewType);

  return (
    <>
      <div
        className={`border relative p-3 rounded-lg cursor-pointer dark:border-brown hover:shadow-md dark:shadow-brown flex flex-col justify-start min-w-80 transition-all duration-200 ${
          open && selectedTodo.id == todo.id && "opacity-0"
        } ${viewType == "list" ? "w-full" : "flex-[3]"}`}
      >
        <div
          onClick={() => {
            setOpen();
            setSelectedTodo();
          }}
        >
          <p className="text-xl font-semibold mb-4">{title}</p>
          <p className="line-clamp-6 mb-6">{content}</p>
        </div>
        <div className="btns flex items-center gap-4 absolute bottom-2  right-3">
          <div
            className="text-red-500 cursor-pointer w-fit"
            onClick={() => {
              deleteTodo(id);
            }}
          >
            <Trash2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
