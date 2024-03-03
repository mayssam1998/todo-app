import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'model-cmp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './model.component.html',
})
export class ModelComponent {
  @Input() open: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  closeModel() {
    this.open = false;
    this.closeModal.emit();
  }
}
