import { useEffect, useRef, useState } from "react";
import useTodo from "../hooks/useTodo";

const AddNote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState({ title: "", content: "" });
  const { addTodo } = useTodo();
  const contentInputRef = useRef<HTMLDivElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = () => {
    if (titleInputRef.current === document.activeElement) {
      return;
    }
    if (todo.title && todo.content) {
      setIsOpen(false);
      addTodo(todo);
      setTodo({ title: "", content: "" });
      if (contentInputRef.current) {
        contentInputRef.current.innerText = "";
      }
      return;
    }
  };

  return (
    <div
      onFocus={() => setIsOpen(true)}
      onBlur={handleBlur}
      className="border dark:border-brown rounded-lg max-w-2xl mx-auto shadow-search dark:shadow-md dark:shadow-brown w-full p-3 grid relative transition-all duration-300 mb-4"
    >
      {isOpen && (
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Title of note"
          value={todo.title}
          onChange={(e) =>
            setTodo((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            })
          }
          className="outline-none p-2 w-full border-b dark:border-brown bg-transparent"
        />
      )}
      <div
        ref={contentInputRef}
        contentEditable
        className={`outline-none z-10 ${!isOpen ? "p-0" : "p-2"}`}
        onInputCapture={(e) => {
          const newContent = e.currentTarget.innerText;
          if (e.currentTarget) {
            setTodo((prev) => {
              return {
                ...prev,
                content: newContent,
              };
            });
          }
        }}
      ></div>
      {todo.content == "" && (
        <div
          className={`${
            isOpen ? "top-11 pl-4 mt-1" : "top-0"
          } absolute p-3 z-0 text-gray-400`}
        >
          Add a new note...
        </div>
      )}
    </div>
  );
};

export default AddNote;
