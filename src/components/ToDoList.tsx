import useTodo from "../hooks/useTodo";
type Props = {
  setEdit?: React.Dispatch<React.SetStateAction<ToDoProp | undefined>>;
};

const ToDoList = ({ setEdit }: Props) => {
  const { todos, deleteTodo } = useTodo();
  console.log(todos)
  if (!todos) {
    return <div>No ToDoList</div>;
  }
  return (
    <>
      <div key={JSON.stringify(todos)} className="flex flex-col gap-6">
        {todos.map((todo, i) => {
          return (
            <div
              key={i}
              className="border p-3 rounded-lg cursor-pointer shadow flex justify-between"
            >
              <div className="">
                <p className="text-xl font-semibold">{todo.title}</p>
                <p>{todo.content}</p>
              </div>
              <div className="btns flex items-center gap-4">
                <div className="btn" onClick={() => setEdit && setEdit(todo)}>
                  Edit
                </div>
                <div className="btn danger" onClick={() => deleteTodo(todo)}>
                  Delete
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToDoList;
