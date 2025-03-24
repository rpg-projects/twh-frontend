import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/docs/names';

  constructor(private http: HttpClient) {}

  getPlayersNames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
