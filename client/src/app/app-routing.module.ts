import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NewGameCodeScreenComponent } from './new-game-code-screen/new-game-code-screen.component';
import {EnterGameCodeScreenComponent} from './enter-game-code-screen/enter-game-code-screen.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'new-game-code', component:NewGameCodeScreenComponent},
  {path: 'enter-code', component: EnterGameCodeScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
