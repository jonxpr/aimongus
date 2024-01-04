import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameServerService {
  private baseURL = 'http://localhost:8080/ws'; // Replace with your Go server address
  private wsocket: WebSocketSubject<any> | null = null;


  constructor(private http: HttpClient) { 
    this.wsocket = webSocket('ws://localhost:8080/ws'); 
  }

  private updateWebSocketConnection(route: string): void {
    if (this.wsocket && !this.wsocket.closed) {
      this.wsocket.complete(); // Close the existing WebSocket connection gracefully
    }
    this.wsocket = webSocket(route); // Create a new WebSocket connection with the specified route
  }


  generateRoomCode(): Promise<string> {
    return this.http.get<string>(`${this.baseURL}/createRoomCode`).toPromise().then((response: any) => response as string);
  }

  createRoom(roomData: any){
    this.http.post<any>(`${this.baseURL}/createRoom`, roomData)
    .subscribe(
      (response) => {
        console.log("room room is created")
      },
      (error) => {
        console.error('Error in POST request:', error);
      }
    )
  }

  joinRoom(roomID:string, userID:string, username:string){
    console.log(roomID,userID,username)
    this.updateWebSocketConnection(`ws://localhost:8080/ws/joinRoom/${roomID}?userId=${userID}&username=${encodeURIComponent(username)}`)
    this.wsocket?.subscribe({
      next: () => {
        console.log("WebSocket connected successfully");
      },
      error: (error) => {
        console.error("WebSocket error:", error);
      },
      complete: () => {
        console.log("WebSocket closed");
      }
    });
    
  }

  getPlayersInfoForRoom(roomID:string): Promise<any> {
    return this.http.get<any>(`${this.baseURL}/getClients/${roomID}`).toPromise()
  }

}
