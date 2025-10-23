import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-page-loader',
  imports: [CommonModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent {

  isLoading$: Observable<boolean>;
  public readonly isLoading = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isLoading$ = this.isLoading.asObservable();
  }


  /**
   * Shows the loader
   */
  show(): void {
    this.isLoading.next(true);
  }

  /**
   * Hides the loader
   */
  hide(): void {
    this.isLoading.next(false);
  }
}
