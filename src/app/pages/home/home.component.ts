import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

export interface IChar {
  summer: string;
  name: string;
  fileLink: string;
  god: string;
  level: number;
  avatar: string;
  avatarId: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userName: string | null = '';
  characters: IChar[] = [];

  constructor(private router: Router, private playerService: PlayerService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName'); // Retrieve stored name

    if (!this.userName) {
      this.router.navigate(['/login']); // Redirect to login if no user found
    } else {
      this.playerService.getPlayersSheets(this.userName).subscribe((data) => {
        this.characters = data;
      });
    }
  }

  // logout() {
  //   localStorage.removeItem('userName'); // Clear localStorage
  //   this.router.navigate(['/login']); // Redirect to login
  // }
}
