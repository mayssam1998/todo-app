import { useState } from 'react'
import AddTodoForm from './components/AddTodoForm'
import ToDoList from './components/ToDoList'

const App = () => {
  const [editTodo, seteditTodo] = useState<ToDoProp | undefined>()
  return (
    <div>
      <div className="container mx-auto p-3">
        <AddTodoForm edit={editTodo} />
        <ToDoList setEdit={seteditTodo} />
      </div>
    </div>
  );
}

export default App