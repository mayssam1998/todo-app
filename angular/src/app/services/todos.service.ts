import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { generateId } from '../../utils/helper';

export type TodosProps = {
  id: string;
  title: string;
  content: string;
};

export type TodoProp = {
  title: string;
  content: string;
};

export type View = 'list' | 'grid';

export const todos = signal<TodosProps[]>([]);

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: TodosProps[] = [];
  viewType: View = 'list';

  constructor(private localStorage: LocalStorageService) {
    this.loadTodos();
  }

  loadTodos() {
    const jsonString = this.localStorage.getItem('todos') || '[]';
    const prevTodos = JSON.parse(jsonString || '[]');
    this.todos = prevTodos;
    todos.set(prevTodos);
  }

  getTodos() {
    return this.todos;
  }

  getViewType() {
    return this.viewType;
  }

  setTodos(Todos: TodosProps[]) {
    this.todos = Todos;
    todos.update(() => Todos);
    this.localStorage.setItem('todos', JSON.stringify(Todos));
  }

  setViewType(type: View) {
    this.viewType = type;
    console.log(this.viewType, type);
  }

  addTodo(todo: TodoProp) {
    const todoToAdd = { ...todo, id: generateId() };
    const prevTodos = [...this.todos];
    prevTodos.push(todoToAdd);
    this.setTodos(prevTodos);
  }

  deleteTodo = (id: string) => {
    const updatedTodos = [...this.todos].filter((todo) => todo.id !== id);
    this.setTodos(updatedTodos);
  };

  editTodos = (toDo: TodosProps) => {
    const updatedTodos = [...this.todos].filter((todo) => todo.id !== toDo.id);
    updatedTodos.push(toDo);
    this.setTodos(updatedTodos);
  };
}
