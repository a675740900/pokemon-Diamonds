
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightComponent } from './home/fight/fight.component';
import { SettingComponent } from './home/setting/setting.component';
import { MaterialModule } from './component/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { HomeModule } from './home/home.module';
import { IntroduceComponent } from './home/introduce/introduce.component';
import { MenuIntroduceComponent } from './component/menu-introduce.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        AppComponent,
        FightComponent,
        SettingComponent,
        HomeComponent,
        IntroduceComponent,
        MenuIntroduceComponent,
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HomeModule,
        MaterialModule,
        BrowserModule,
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
    ]
})
export class AppModule { }
