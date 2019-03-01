
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightComponent } from './game/fight/fight.component';
import { SettingComponent } from './game/setting/setting.component';
import { MaterialModule } from './component/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HomeModule } from './game/home.module';
import { IntroduceComponent } from './game/introduce/introduce.component';
import { MenuIntroduceComponent } from './component/menu-introduce.component';
// import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from './data-source/map/map.component';
import { LocalArchivingComponent } from './local-archiving/local-archiving.component';

@NgModule({
    declarations: [
        AppComponent,
        FightComponent,
        SettingComponent,
        HomeComponent,
        IntroduceComponent,
        MenuIntroduceComponent,
        MapComponent,
        LocalArchivingComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        // HomeModule,
        MaterialModule,
        // BrowserModule,
    ],
    exports: [
        MenuIntroduceComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SettingComponent,
        FightComponent,
        IntroduceComponent,
        MapComponent,
        LocalArchivingComponent
    ]
})
export class AppModule { }
