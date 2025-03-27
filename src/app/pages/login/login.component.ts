import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
    // Check if userName is in localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      // If userName exists in localStorage, redirect to /home
      this.router.navigate(['/home']);
    } else {
      // If no userName is found, proceed with the login flow
      this.playerService.getPlayersNames().subscribe((data) => {
        this.players = data;
        this.filteredPlayers = data;
      });
    }
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
    console.log('this.selectedPlayer :>> ', this.selectedPlayer);
    if (this.selectedPlayer !== '') {
      localStorage.setItem('userName', this.selectedPlayer); // Save to localStorage
      this.router.navigate(['/home']); // Redirect to home
    } else {
      alert('Selecione sua tag de player!');
    }
  }
}
