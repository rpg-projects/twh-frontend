import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // discordTag: string = '';
  // password: string = '';

  players: string[] = [];
  filteredPlayers: string[] = [];
  selectedPlayer: string = '';

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit() {
    this.playerService.getPlayersNames().subscribe((data) => {
      this.players = data;
      this.filteredPlayers = data;
    });
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onSearch(inputElement.value);
  }

  onSearch(query: string) {
    this.filteredPlayers = this.players.filter((player) =>
      player.toLowerCase().includes(query.toLowerCase())
    );
  }

  onSelect(player: string) {
    this.selectedPlayer = player;
    this.router.navigate(['/home']); // Redirect to home
  }

  // onSubmit() {
  //   console.log('hello world');
  // }
}
