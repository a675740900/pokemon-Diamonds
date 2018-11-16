import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ChooseInitPetComponent } from './home/choose-init-pet/choose-init-pet.component';

const routes: Routes = [
  { path: 'home/home', component: HomeComponent },
  { path: 'home/choose-init-pet', component: ChooseInitPetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
