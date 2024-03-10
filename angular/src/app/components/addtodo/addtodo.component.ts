import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-addtodo',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './addtodo.component.html',
})
export class AddtodoComponent {
  isOpen: boolean = false;
  title: string = '';
  content: string = '';
  todoService = inject(TodosService);

  onFocus(): void {
    this.isOpen = true;
  }

  addToDo(): void {
    if (this.title && this.content) {
      this.isOpen = false;
      const todo = { title: this.title, content: this.content };
      this.todoService.postToDo(todo.content).subscribe(() => {
        this.todoService.addTodo(todo);
      });
      (this.title = ''), (this.content = '');
    }
  }

  setContent(event: Event) {
    const newContent = (event.target as HTMLDivElement).innerText;
    this.content = newContent;
  }
}
