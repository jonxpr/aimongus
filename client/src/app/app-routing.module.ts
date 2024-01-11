import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewGameCodeScreenComponent } from './new-game-code-screen/new-game-code-screen.component';
import {EnterGameCodeScreenComponent} from './enter-game-code-screen/enter-game-code-screen.component';
import {LobbyComponent} from './game-page/lobby-page/lobby.component';
import { GamePageComponent } from './game-page/game-page.component';
import { PlayPageComponent } from './game-page/play-page/play-page.component';

const routes: Routes = [
  { path: 'new-game-code', component: NewGameCodeScreenComponent },
  { path: 'enter-code', component: EnterGameCodeScreenComponent },  
  { path: '', component: HomepageComponent },
  { path: ':gameCode', component: GamePageComponent, children: [
    {path: 'play', component: PlayPageComponent},
    { path: 'lobby', component: LobbyComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
