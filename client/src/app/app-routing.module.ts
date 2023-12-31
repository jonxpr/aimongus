import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewGameCodeScreenComponent } from './new-game-code-screen/new-game-code-screen.component';
import {EnterGameCodeScreenComponent} from './enter-game-code-screen/enter-game-code-screen.component';
import {LobbyComponent} from './game-page/lobby-page/lobby.component';
import { ChatComponent } from './game-page/chat-page/chat.component';
import { VotingPageComponent } from './game-page/voting-page/voting-page.component';
import { RevealPageComponent } from './game-page/reveal-page/reveal-page.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'new-game-code', component:NewGameCodeScreenComponent},
  {path: 'enter-code', component: EnterGameCodeScreenComponent },
  {path: ':gameCode/lobby', component: LobbyComponent},
  {path: ':gameCode/chat', component: ChatComponent},
  {path: ':gameCode/vote', component: VotingPageComponent},
  {path: ':gameCode/reveal', component: RevealPageComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
