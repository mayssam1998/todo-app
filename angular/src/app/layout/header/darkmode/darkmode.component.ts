import { Component } from '@angular/core';

@Component({
  selector: 'header-darkmode',
  standalone: true,
  imports: [],
  templateUrl: './darkmode.component.html',
})
export class DarkmodeComponent {
  handleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
