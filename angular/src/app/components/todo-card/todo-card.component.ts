import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { TodosProps, TodosService } from '../../services/todos.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './todo-card.component.html',
})
export class TodoCardComponent {
  @Input() todo: TodosProps | undefined;
  @Input() isSelcted: boolean = false;
  @Output() click = new EventEmitter<void>();
  todosService = inject(TodosService);

  deleteTodo(id: string) {
    this.todosService.deleteTodo(id);
  }

  onClick() {
    this.click.emit();
  }
}
