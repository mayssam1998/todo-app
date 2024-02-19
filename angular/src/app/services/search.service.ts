import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search: string = '';
  constructor() {}
  getQuery() {
    return this.search;
  }
  setQuery(search: string) {
    this.search = search;
  }
}
