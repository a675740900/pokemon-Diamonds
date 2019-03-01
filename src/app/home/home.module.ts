import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../component/material-module';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

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
        HomeComponent
    ],
    exports: [
    ]

})
export class HomeModule { }