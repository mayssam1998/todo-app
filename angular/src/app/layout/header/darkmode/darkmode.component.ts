import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-darkmode',
  standalone: true,
  imports: [],
  templateUrl: './darkmode.component.html',
})
export class DarkmodeComponent implements OnInit {
  darkmode = true;

  ngOnInit(): void {
    this.getCurrentTheme();
  }

  getCurrentTheme() {
    // Check if window is defined (for browser environment)
    if (typeof window !== 'undefined') {
      this.darkmode =
        window &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        localStorage.getItem('theme') == 'dark';
      this.setCurrentTheme();
    }
  }

  setCurrentTheme() {
    if (this.darkmode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }

  handleDarkMode() {
    if (this.darkmode) {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
      this.darkmode = false;
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.darkmode = true;
    }
  }
}
