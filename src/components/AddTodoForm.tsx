import React, { useEffect, useState } from "react";
import useTodo from "../hooks/useTodo";

const AddTodoForm = ({ edit }: { edit?: ToDoProp }) => {
  const { addTodo, editTodos } = useTodo();
  const [editTodo, setEditTodo] = useState<ToDoProp | undefined>();

  useEffect(() => {
    setEditTodo(edit);
  }, [edit]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = (e.target as any).todoTitle.value;
    const content = (e.target as any).todocontent.value;
    if (editTodo) {
      editTodos({ title, content });
    } else {
      addTodo({ title, content });
    }
    (e.target as any).todoTitle.value = "";
    (e.target as any).todocontent.value = "";
    return;
  };

  return (
    <>
      <form
        key={JSON.stringify(edit)}
        onSubmit={handleSubmit}
        className="border rounded-lg shadow p-3 my-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="todoTitle">Enter The title of todo :-</label>
          <input
            defaultValue={editTodo?.title}
            type="text"
            id="todoTitle"
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="todocontent">Write To Do :-</label>
          <textarea
            defaultValue={editTodo?.content}
            rows={5}
            id="todocontent"
            className="input"
          />
        </div>
        <button className="btn mt-4">Add To Do</button>
      </form>
    </>
  );
};

export default AddTodoForm;
