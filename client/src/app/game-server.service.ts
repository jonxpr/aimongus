import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GameServerService {
  private baseURL = 'http://localhost:8080/ws'; // Replace with your Go server address
  private webSocket: WebSocketSubject<any> | null = null;


  constructor(private http: HttpClient) { }

  generateRoomCode(): Promise<string> {
    return this.http.get<string>(`${this.baseURL}/createRoomCode`).toPromise().then((response: any) => response as string);
  }

}
