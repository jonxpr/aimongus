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
import { LobbyComponent } from './lobby/lobby.component';

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
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
