import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { TodosProps, TodosService } from '../../services/todos.service';
import { NgIf } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-card.component.html',
})
export class TodoCardComponent {
  @Input() todo: TodosProps | undefined;
  @Input() isSelcted: boolean = false;
  @Output() click = new EventEmitter<void>();
  @Output() removeListItem = new EventEmitter<string>();
  @Output() markAsCompleted = new EventEmitter<string>();
  todosService = inject(TodosService);
  isChecked = false;
  deleteMode = false;

  deleteTodo(id: string) {
    this.removeListItem.emit(id);
  }

  changeDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  onClick() {
    this.click.emit();
  }

  markTaskAsCompleted(event: any) {
   if(this.isChecked) {
     this.markAsCompleted.emit(this.todo?.id);
   }
  }
}
