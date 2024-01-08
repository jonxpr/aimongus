import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GameDescriptionComponent } from './game-description/game-description.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { StartGameOptionButtonsComponent } from './start-game-option-buttons/start-game-option-buttons.component';
import { EnterGameCodeScreenComponent } from './enter-game-code-screen/enter-game-code-screen.component';
import { NewGameCodeScreenComponent } from './new-game-code-screen/new-game-code-screen.component';
import { LobbyComponent } from './game-page/lobby-page/lobby.component';
import { ChatComponent } from './game-page/chat-page/chat.component';
import { VotingPageComponent } from './game-page/voting-page/voting-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameScoreboardComponent } from './game-page/game-scoreboard/game-scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    GameDescriptionComponent,
    PlayButtonComponent,
    StartGameOptionButtonsComponent,
    EnterGameCodeScreenComponent,
    NewGameCodeScreenComponent,
    LobbyComponent,
    ChatComponent,
    GameScoreboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VotingPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
