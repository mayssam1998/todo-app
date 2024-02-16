import { DeleteIcon, PenIcon, Trash2, XIcon } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import useTodo from "../hooks/useTodo";
import Modal from "./Modal";
import React, { useState } from "react";
type Props = {
  setEdit?: React.Dispatch<React.SetStateAction<ToDoProp | undefined>>;
};

const ToDoList = ({ setEdit }: Props) => {
  const { deleteTodo, editTodos } = useTodo();
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ToDoProp | null>(null);
  const todos = useAppSelector((st) => st.todos.data);
  if (!todos) {
    return <div>No ToDoList</div>;
  }
  console.log(selectedTodo);
  return (
    <>
      <div key={JSON.stringify(todos)} className="flex flex-wrap gap-6">
        {todos.map((todo, i) => {
          return (
            <React.Fragment key={i}>
              <div
                onClick={() => {
                  setOpen(true);
                  setSelectedTodo(todo);
                }}
                className="border relative p-3 rounded-lg cursor-pointer shadow flex justify-between flex-[3] min-w-80"
              >
                <div className="">
                  <p className="text-xl font-semibold mb-4">{todo.title}</p>
                  <p className=" line-clamp-6">{todo.content}</p>
                </div>
                {/* <div className="btns flex items-center gap-4 absolute right-3">
                  <div className="btn" onClick={() => setEdit && setEdit(todo)}>
                    <PenIcon />
                  </div>
                  <div className="btn danger" onClick={() => deleteTodo(todo)}>
                    <Trash2 />
                  </div>
                </div> */}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <Modal open={open} closeModel={() => setOpen(false)}>
        {selectedTodo && (
          <div className="relative rounded-lg flex flex-col justify-between flex-[3] min-w-80">
            <div className="p-3">
              <input
                type="text"
                onChange={(e) =>
                  setSelectedTodo((prev) => {
                    const updatedTodo = {
                      title: e.target.value,
                      content: selectedTodo.content,
                    };
                    editTodos(updatedTodo);
                    return updatedTodo;
                  })
                }
                defaultValue={selectedTodo.title}
                className="text-xl font-semibold mb-4 outline-none w-full"
              />
              <textarea
                onChange={(e) =>
                  setSelectedTodo((prev) => {
                    const updatedTodo = {
                      title: prev?.title||"",
                      content: e.target.value,
                    };
                    editTodos(updatedTodo);
                    return updatedTodo;
                  })
                }
                rows={10}
                className="w-full outline-none h-fit"
                defaultValue={selectedTodo.content}
              ></textarea>
            </div>
            <div className="borde-t-2 p-3 box-border bg-gray-100 sticky bottom-0 w-full flex justify-between">
              <div
                className="text-red-500 cursor-pointer w-fit"
                onClick={() => {
                  deleteTodo(selectedTodo);
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
