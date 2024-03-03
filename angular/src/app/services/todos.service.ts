import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { generateId } from '../../utils/helper';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private todoSubject = new BehaviorSubject<TodosProps[] | null>(null);
  todos: Observable<TodosProps[] | null> = this.todoSubject.asObservable();

  private viewSubject = new BehaviorSubject<View>('grid');
  viewType: Observable<View> = this.viewSubject.asObservable();

  constructor(private localStorage: LocalStorageService) {
    this.loadTodos();
  }

  loadTodos() {
    const jsonString = this.localStorage.getItem('todos') || '[]';
    const prevTodos = JSON.parse(jsonString);
    this.todoSubject.next(prevTodos);
  }

  getTodos() {
    return this.todoSubject.value;
  }

  getViewType() {
    return this.viewType;
  }

  setTodos(todos: TodosProps[]) {
    this.todoSubject.next(todos);
    this.localStorage.setItem('todos', JSON.stringify(todos));
  }

  setViewType(type: View) {
    this.viewSubject.next(type);
  }

  addTodo(todo: TodoProp) {
    const todoToAdd = { ...todo, id: generateId() };
    const prevTodos = [...(this.todoSubject.value || [])];
    prevTodos.push(todoToAdd);
    this.setTodos(prevTodos);
  }

  deleteTodo = (id: string) => {
    const updatedTodos = [...(this.todoSubject.value || [])].filter(
      (todo) => todo.id !== id
    );
    this.setTodos(updatedTodos);
  };

  editTodos = (toDo: TodosProps) => {
    const updatedTodos = [...(this.todoSubject.value || [])].filter(
      (todo) => todo.id !== toDo.id
    );
    updatedTodos.push(toDo);
    this.setTodos(updatedTodos);
  };
}
