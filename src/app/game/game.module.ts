import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { ChooseInitPetComponent } from './choose-init-pet/choose-init-pet.component';
import { MaterialModule } from '../component/material-module';
import { MatTableModule } from '@angular/material/table';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { GameHomeComponent } from './game-home/game-home.component';
import { ExperienceComponent } from '../data-source/experience/experience.component';
import { PetIntroduceComponent } from '../component/pet-introduce.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule,
        MaterialModule,
        MatTableModule,
        // BrowserAnimationsModule,
        MatInputModule,
        FormsModule
    ],
    declarations: [
        ChooseInitPetComponent,
        ExperienceComponent,
        GameHomeComponent,
        PetIntroduceComponent,
    ],
    exports: [
        // PetIntroduceComponent
    ]

})
export class GameModule { }