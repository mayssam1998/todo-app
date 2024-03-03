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

  @ViewChild('contentInput', { static: false }) contentInput!: ElementRef;

  onFocus(): void {
    this.isOpen = true;
  }

  onBlur(): void {
    if (this.title && this.content) {
      this.isOpen = false;
      this.todoService.addTodo({ title: this.title, content: this.content });
      (this.title = ''), (this.content = '');
      if (this.contentInput) {
        this.contentInput.nativeElement.innerText = '';
      }
    }
  }

  setContent(event: Event) {
    const newContent = (event.target as HTMLDivElement).innerText;
    this.content = newContent;
  }
}
