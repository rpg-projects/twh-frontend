import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // Function to check if the current route is the login page
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  logout() {
    localStorage.removeItem('userName'); // Clear localStorage
    this.router.navigate(['/login']); // Redirect to login
  }
}
