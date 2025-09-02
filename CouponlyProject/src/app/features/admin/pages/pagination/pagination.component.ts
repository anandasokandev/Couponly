// src/app/pagination/pagination.component.ts

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  @Input() fromModel: boolean = false;
  @Input() maxVisiblePages: number = 2; // Max visible page buttons besides first/last
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  totalPages: number = 0;
  pages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate pagination whenever inputs change
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = this.getPages();
  }

  /**
   * Generates the array of pages to be displayed, including ellipses.
   */
  private getPages(): any[] {
    // if (this.totalPages < this.maxVisiblePages + 2) {
    //   // If total pages are few, show all of them
    //   for (let i = 1; i <= this.totalPages; i++) {
    //     this.pages.push(i);
    //   }
    //   return this.pages;
    // }

    const pagesToShow: (number | string)[] = [1];
    const startPage = Math.max(2, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    if (startPage > 2) {
      pagesToShow.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < this.totalPages - 1) {
      pagesToShow.push('...');
    }

    pagesToShow.push(this.totalPages);
    return pagesToShow;
  }

  /**
   * Select a new page.
   */
  selectPage(page: number | string): void {
    if(typeof page === "number" && page != this.currentPage) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }}
    this.pages = this.getPages();
  }

  /**
   * Go to the previous page.
   */
  onPrev(): void {
    if (this.currentPage > 1) {
      this.selectPage(this.currentPage - 1);
    }
  }

  /**
   * Go to the next page.
   */
  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.selectPage(this.currentPage + 1);
    }
  }
  
  /**
   * Helper function to check if a value is a number for the template.
   */
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = Number(selectElement.value);
    this.itemsPerPageChange.emit(newSize);
  }
}