import { Component, Input, OnInit } from '@angular/core';
import { PetIntroduce } from './comp-common';
import { getPetTypeIcon } from '../game/common-tool';
import { Pet, getPetTypeNameEn, getPetTypeName } from '../data-source/pet/pet.component';

@Component({
    selector: 'app-pet-introduce',
    template: `
    <mat-card class="example-card">
        <mat-card-header>
            <div mat-card-avatar class="example-header-image"></div>
            <mat-card-title>{{petIntroduce.title}}</mat-card-title>
            <mat-card-subtitle>
            <img style='width: 15px; height: 15px; padding-right: 5px;' src="{{petIntroduce.petTypeImg}}">
            <span>{{petIntroduce.subtitle}}</span></mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image src="{{petIntroduce.url}}">
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

export class PetIntroduceComponent implements OnInit{
    @Input() pet: Pet;

    petIntroduce: PetIntroduce = {};

    ngOnInit(): void {
        this.petIntroduce.petTypeImg = getPetTypeIcon(getPetTypeNameEn(this.pet.pettype));
        this.petIntroduce.title = this.pet.name;
        this.petIntroduce.subtitle = getPetTypeName(this.pet.pettype);
    }
}
