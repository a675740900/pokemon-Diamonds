
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightComponent } from './home/fight/fight.component';
import { SettingComponent } from './home/setting/setting.component';
import { MaterialModule } from './component/material-module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';

@NgModule({
    declarations: [
        AppComponent,
        FightComponent,
        SettingComponent,
        HomeComponent,
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        HomeModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SettingComponent,
        FightComponent
    ]
})
export class AppModule { }
