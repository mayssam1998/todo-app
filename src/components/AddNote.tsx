import { useEffect, useState } from "react";
import useTodo from "../hooks/useTodo";

const AddNote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState({ title: "", content: "" });
  const { addTodo } = useTodo();
  //   useEffect(() => {
  //     if (isOpen && todo.title !== "" && todo.content !== "") {
  //       setIsOpen(false);
  //       addTodo(todo);
  //       setTodo({ title: "", content: "" }); // Clear input fields after adding todo
  //     }
  //   }, [isOpen, todo, addTodo]);
  return (
    <div
      onFocus={() => setIsOpen(true)}
      onBlur={() => {
        if (todo.title !== "") {
          setIsOpen(false);
          addTodo(todo);
          setTodo({ title: "", content: "" });
        }
      }}
      //   onBlur={(e)=>e.currentTarget.style.background="green"}
      className="border rounded-lg shadow-xl w-full p-3 grid"
    >
      {isOpen && (
        <input
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
          className=" outline-none p-2 w-full border-b"
        />
      )}
      <div
        contentEditable
        role="textbox"
        aria-label="take a note..."
        className="outline-none py-2"
        onInput={(e) => {
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
    </div>
  );
};

export default AddNote;
