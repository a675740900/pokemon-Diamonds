import { Component, Input } from '@angular/core';
import { IntroduceList } from './comp-common';

@Component({
    selector: 'app-menu-introduce',
    template: `
    <mat-accordion>
    <div>
        <mat-expansion-panel *ngFor='let introduce of introduceList'>
            <mat-expansion-panel-header>
                <mat-panel-title>
                {{introduce.title}}
                <img class='img' src="{{introduce.url}}" [hidden]='!introduce.url'>
                </mat-panel-title>
                <mat-panel-description>
                    {{introduce.description}}
                </mat-panel-description>
            </mat-expansion-panel-header>
            <p>{{introduce.detailed}}</p>
        </mat-expansion-panel>
        </div>
    </mat-accordion>
  `,
    styles: [`
    .img {
        width: 20px;
        height: 20px;
        padding-left: 5px;
    }
  `],
})

export class MenuIntroduceComponent {
    @Input() introduceList: IntroduceList[];
}
