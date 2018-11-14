import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { getPet, pet } from '../../data-source/pet/pet.component';


export interface petsITFS {
    petInfo_my: petInfo;
    petInfo_Enemy: petInfo;
}

export interface petInfo {
    petguid: number;
    level: number;
    grade: number;
}

@Component({
    selector: 'app-fight',
    templateUrl: './fight.component.html',
    styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
    pet_my: pet;
    pet_Enemy: pet;
    tiles: Tile[];


    constructor(
        public dialogRef: MatDialogRef<SettingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: petsITFS) {
        this.pet_my = getPet(data.petInfo_my.petguid);
        this.pet_Enemy = getPet(data.petInfo_Enemy.petguid);
    }

    ngOnInit() {
        this.tiles = [
            { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
            { text: this.pet_Enemy.name, cols: 1, rows: 1, color: '#DDBDF1' },
            { text: this.pet_my.name, cols: 1, rows: 1, color: '#DDBDF1' },
            { text: '技能区', cols: 1, rows: 1, color: 'lightblue' },
        ];
        console.log('开始打架');
        console.log(this.pet_my);
        console.log(this.pet_Enemy);
    }
}

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}