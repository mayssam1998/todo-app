import { NgFor } from '@angular/common';
import { Component, effect } from '@angular/core';
import { TodosProps, View, todos } from '../../services/todos.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';

@Component({
  selector: 'app-todoslist',
  standalone: true,
  imports: [TodoCardComponent, NgFor],
  templateUrl: './todolist.component.html',
})
export class TodoslistComponent {
  todos: TodosProps[] = todos();
  constructor() {
    console.log(todos);
  }

  viewType: View = 'list';
}
