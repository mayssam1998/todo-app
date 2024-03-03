import { Component, inject } from '@angular/core';
import { TodosService, View } from '../../services/todos.service';
import { DarkmodeComponent } from './darkmode/darkmode.component';
import { SearchComponent } from './search/search.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, DarkmodeComponent, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  viewType: View = 'grid';
  constructor(private todoService: TodosService) {
    this.todoService.viewType.subscribe((type) => {
      this.viewType = type;
    });
  }

  handleViewType = () => {
    if (this.viewType == 'grid') {
      this.todoService.setViewType('list');
    } else {
      this.todoService.setViewType('grid');
    }
  };
}
