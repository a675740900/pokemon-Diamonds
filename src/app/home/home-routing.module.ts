
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChooseInitPetComponent } from './choose-init-pet/choose-init-pet.component';
import { Page1Component } from './page1/page1.component';
import { HomeComponent } from './home/home.component';
import { GameHomeComponent } from './game-home/game-home.component';

const routes: Routes = [
    { path: 'home/home', component: HomeComponent },
    { path: 'home/choose-init-pet', component: ChooseInitPetComponent },
    { path: 'home/page1', component: Page1Component },
    { path: 'home/game-home', component: GameHomeComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }