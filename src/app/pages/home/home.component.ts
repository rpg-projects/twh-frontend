import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName'); // Retrieve stored name
    console.log('this.userName :>> ', this.userName);
    if (!this.userName) {
      this.router.navigate(['/login']); // Redirect to login if no user found
    }
  }

  logout() {
    localStorage.removeItem('userName'); // Clear localStorage
    this.router.navigate(['/login']); // Redirect to login
  }
}
