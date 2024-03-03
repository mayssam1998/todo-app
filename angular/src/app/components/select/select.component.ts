import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, Select2Module],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  value = 'FR';
  data = [
    { value: 'IN', label: 'drdfg' },
    { value: 'CN', label: 'China' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
    // Add more groups (e.g., Africa, North America, etc.) as needed...
  ];

  onSelectChange(event: any) {
    
  }

  handleSearch(event: any) {
    
  }
}
