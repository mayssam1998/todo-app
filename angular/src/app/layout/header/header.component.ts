import { Component, inject } from '@angular/core';
import { TodosService, View } from '../../services/todos.service';
import { DarkmodeComponent } from './darkmode/darkmode.component';
import { SearchComponent } from './search/search.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, DarkmodeComponent,NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  todoService = inject(TodosService);
  viewType: View = 'grid';
  constructor() {
    this.viewType = this.todoService.getViewType();
  }

  handleViewType = () => {
    if (this.todoService.getViewType() == 'grid') {
      this.todoService.setViewType('list');
    } else {
      this.todoService.setViewType('grid');
    }
    console.log(this.todoService.getViewType());
  };
}
