import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(true);
  isDarkMode$ = this.isDarkMode.asObservable();

  toggleTheme() {
    this.isDarkMode.next(!this.isDarkMode.value);
    this.updateTheme();
  }

  private updateTheme() {
    document.body.classList.toggle('light-mode', !this.isDarkMode.value);
  }
}