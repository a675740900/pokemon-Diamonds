import { Component, Input } from '@angular/core';
import { PetIntroduce } from './comp-common';

@Component({
    selector: 'app-pet-introduce',
    template: `
    <mat-card class="example-card">
        <mat-card-header>
            <div mat-card-avatar class="example-header-image"></div>
            <mat-card-title>{{petIntroduce.title}}</mat-card-title>
            <mat-card-subtitle>{{petIntroduce.subtitle}}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image src="{{petIntroduce.url}}" alt="Photo of a Shiba Inu">
        <mat-card-content>
            <p>
                {{petIntroduce.content}}
            </p>
        </mat-card-content>
    </mat-card>
  `,
    styles: [`
    .topLayout {
        display: flex;
        justify-content: space-around;
    }
    
    .secondLayout {
        width: 20%;
    }
  `],
})

export class PetIntroduceComponent {
    @Input() petIntroduce: PetIntroduce;
}
