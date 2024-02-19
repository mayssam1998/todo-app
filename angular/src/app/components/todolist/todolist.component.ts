import { Component, inject } from '@angular/core';
import { TodosProps, TodosService, View } from '../../services/todos.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-todoslist',
  standalone: true,
  imports: [TodoCardComponent, NgFor],
  templateUrl: './todolist.component.html',
})
export class TodoslistComponent {
  todosService = inject(TodosService);
  todos: TodosProps[] = [];
  viewType: View = 'grid';
  constructor() {
    this.todos = this.todosService.getTodos();
    this.viewType = this.todosService.getViewType();
  }
  
}
