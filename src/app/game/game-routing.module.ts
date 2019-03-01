
import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChooseInitPetComponent } from './choose-init-pet/choose-init-pet.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { LazyComponentModuleBase } from 'iwe7-lazy-load';

const routes: Routes = [
    {
        path: '', children: [
            { path: 'choose-init-pet', component: ChooseInitPetComponent },
            { path: 'game-home', component: GameHomeComponent },

        ]
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule extends LazyComponentModuleBase  {
    getComponentByName(key: string): Type<any> {
        return ChooseInitPetComponent;
    }
}