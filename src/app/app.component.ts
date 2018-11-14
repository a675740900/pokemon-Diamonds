import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingComponent } from './home/setting/setting.component';
import { goNewPage } from './common-tool';
import { ChooseInitPetComponent } from './home/choose-init-pet/choose-init-pet.component';
ChooseInitPetComponent

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = '口袋妖怪-钻石版';

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

    startGame () {
        goNewPage('./home/choose-init-pet/choose-init-pet', this.router);
    }
}