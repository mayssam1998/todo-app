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
    if (window !== undefined) {
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
      console.log('Dark mode is preferred');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
      console.log('Light mode is preferred');
    }
  }
  handleDarkMode() {
    if (this.darkmode) {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
      this.darkmode = false;
      return;
    }
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.darkmode = true;
  }
}
