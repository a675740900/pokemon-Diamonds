import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Iwe7LazyLoadModule, LazyComponentsInterface } from 'iwe7-lazy-load';

// 用到的懒加载组件
let lazyComponentsModule: LazyComponentsInterface[] = [
    {
        // 组件的selector
        selector: 'game',
        // 组件的相对地址
        loadChildren: './game/game.module#GameModule'
    }
];

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // { path: 'game', loadChildren: './game/game.module#GameModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    // 注意加上这些
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [RouterModule]
})
export class AppRoutingModule { }
