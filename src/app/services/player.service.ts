import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getPlayersNames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
