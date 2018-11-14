import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightComponent } from './home/fight/fight.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { SettingComponent } from './home/setting/setting.component';
import { DemoMaterialModule } from './material-module';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ChooseInitPetComponent } from './home/choose-init-pet/choose-init-pet.component';

@NgModule({
    declarations: [
        AppComponent,
        // FightComponent,
        SettingComponent,
        ChooseInitPetComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // SettingComponent,
        BrowserAnimationsModule,
        DemoMaterialModule,
        MatInputModule,
        MatTableModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SettingComponent
    ]
})
export class AppModule { }
