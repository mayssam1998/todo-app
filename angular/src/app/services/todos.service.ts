import { Injectable, inject } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos: TodosProps[] = [];
  viewType: View = 'list';
  localStorage = inject(LocalStorageService);

  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    const todosJson = this.localStorage.getItem('todos');
    const prevTodos = JSON.parse(todosJson || '[]');
    this.todos = prevTodos;
  }

  getTodos() {
    return this.todos;
  }

  getViewType() {
    return this.viewType;
  }

  setTodos(todos: TodosProps[]) {
    this.todos = todos;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  setViewType(type: View) {
    this.viewType = type;
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
