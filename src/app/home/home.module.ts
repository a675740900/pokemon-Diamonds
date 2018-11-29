import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ChooseInitPetComponent } from './choose-init-pet/choose-init-pet.component';
import { MaterialModule } from '../component/material-module';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { GameHomeComponent } from './game-home/game-home.component';
import { ExperienceComponent } from '../data-source/experience/experience.component';
import { PetIntroduceComponent } from '../component/pet-introduce.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule
    ],
    declarations: [
        ChooseInitPetComponent,
        ExperienceComponent,
        GameHomeComponent,
        PetIntroduceComponent,
        MapComponent
    ],
    exports: [
        PetIntroduceComponent
    ]

})
export class HomeModule { }