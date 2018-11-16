import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { petsITFS, FightComponent } from '../fight/fight.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    test: any = {};
    animal: string;
    name: string;
    constructor(private router: Router, public dialog: MatDialog) {

    }

    setting(): void {
        const dialogRef = this.dialog.open(SettingComponent, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    fight() {
        let petInfo: petsITFS = {
            petInfo_my: {
                petguid: this.test.a,
                level: this.test.b,
                grade: this.test.c
            },
            petInfo_Enemy: {
                petguid: this.test.d,
                level: this.test.e,
                grade: this.test.f
            },
        }
        const dialogRef = this.dialog.open(FightComponent, {
            width: '900px', height: '500px',
            data: petInfo
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    startGame() {
        this.router.navigate(['/home/choose-init-pet']);
    }

    ngOnInit() {
    }

}
