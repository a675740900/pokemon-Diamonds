import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SettingComponent } from '../game/setting/setting.component';
import { FightComponent } from '../game/fight/fight.component';
import { pageRouterAnimate } from '../game/../component/animations/router.animate';
import { PageRouterParam } from './home-common';
import { IntroduceComponent } from '../game/introduce/introduce.component';
import { petsITFS } from '../game/fight/fight-common';
import { getLocalStorage } from '../local-archiving/local-storage';
import { LocalArchivingComponent } from '../game/../local-archiving/local-archiving.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        pageRouterAnimate
    ]
})
export class HomeComponent implements OnInit {
    title = '口袋妖怪-钻石版';
    lastPageParam: PageRouterParam;
    boxState: string;
    test: any = {
        a: 1,
        b: 1,
        c: 60,
        d: 3,
        e: 1,
        f: 60
    };
    animal: string;
    name: string;
    constructor(private router: Router, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
        activatedRoute.queryParams.subscribe((queryParams: PageRouterParam) => {
            this.lastPageParam = queryParams;
            if (this.lastPageParam.goBack) {
                this.boxState = 'goHome';
            }
        });
    }

    routerAnimateCBack() {
        switch (this.boxState) {
            case 'fromHome':
                this.router.navigate(['/game/choose-init-pet'], {
                    queryParams: {
                        goNext: true
                    }
                });
                break;
        }
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
            data: petInfo,
            autoFocus: false,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    startGame() {
        this.boxState = 'fromHome';
    }

    ngOnInit() {
    }

    getLocal() {
        const dialogRef = this.dialog.open(LocalArchivingComponent, {
            width: '900px',
            data: {},
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    introduce() {
        const dialogRef = this.dialog.open(IntroduceComponent, {
            width: '900px', height: '600px'
        });
    }
}
