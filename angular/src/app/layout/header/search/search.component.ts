import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'header-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  private router = inject(Router);

  private route = inject(ActivatedRoute);
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchQuery: string = '';

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(300), // Adjust debounce time as needed
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.setQuery();
      });

    this.route.queryParams.subscribe((params) => {
      const searchParam = params?.['search'];
      if (params?.['search'] !== this.searchQuery) {
        this.searchQuery = params?.['search'];
      }
    });
  }

  setQuery() {
    if (this.searchQuery) {
      this.router.navigate(['/'], {
        queryParams: { search: this.searchQuery },
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
