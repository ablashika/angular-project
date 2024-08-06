import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Post = {
  id: number;
  title: string;
  body: string;
};

@Component({
  selector: 'app-display-data',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './display-data.component.html',
})
export class DisplayDataComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Post[] = [];
  sortColumn: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.fetchData();
  }

  //fetching data from jsonplaceholder
  fetchData(): void {
    this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.data = data;
        this.sortData('id');
      });
  }

// Sorting data in the ID column in ascending or descending order
  sortData(column: keyof Post): void {
    if (column !== 'id') return;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  trackById(index:number, item: Post): number {
    return item.id;
  }
}