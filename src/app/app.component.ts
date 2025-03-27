import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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

  isDropdownVisible: boolean = false;

  players: string[] = [];
  filteredPlayers: string[] = [];
  selectedPlayer: string = '';

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

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
    const searchTerm = query?.trim() || ''; // Ensure it's always a string

    this.filteredPlayers =
      searchTerm.length > 0
        ? this.players.filter((player) =>
            player.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    this.isDropdownVisible = this.filteredPlayers.length > 0;
  }

  onSelect(player: string) {
    this.selectedPlayer = player;
    this.isDropdownVisible = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // ✅ Prevents immediate closing
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Detect clicks outside the dropdown
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.isDropdownVisible) {
      this.isDropdownVisible = false;
    }
  }

  onSubmit() {
    this.router.navigate(['/home']); // Redirect to home
  }
}
