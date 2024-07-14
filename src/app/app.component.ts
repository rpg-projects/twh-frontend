import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  discordTag: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log("hello world");
  }
}
