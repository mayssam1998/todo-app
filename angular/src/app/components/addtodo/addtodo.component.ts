import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addtodo',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './addtodo.component.html',
})
export class AddtodoComponent {
  @Output() onTodoAdded = new EventEmitter();

  title: string = '';
  content: string = '';
  todoService = inject(TodosService);

  addToDo(): void {
    if (this.title && this.content) {
      const todo = { title: this.title, content: this.content };
      this.todoService.postToDo(todo.content).subscribe(() => {
        this.todoService.addTodo(todo);
        this.onTodoAdded.emit('to do added');
      });
      (this.title = ''), (this.content = '');
    }
  }
}
