import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightComponent } from './home/fight/fight.component';

@NgModule({
    declarations: [
        AppComponent,
        FightComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FightComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
