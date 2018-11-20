import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1/page1.component';
import { HomeRoutingModule } from './home-routing.module';
import { ChooseInitPetComponent } from './choose-init-pet/choose-init-pet.component';
import { MaterialModule } from '../component/material-module';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatInputModule,
    ],
    declarations: [
        Page1Component,
        ChooseInitPetComponent,
    ]
})
export class HomeModule { }