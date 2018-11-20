import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { petsITFS, FightComponent } from '../fight/fight.component';
import { homeRouterAnimate } from '../../component/animations/router.animate';
import { PageRouterParam } from './home-common';
import { IntroduceComponent } from '../introduce/introduce.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        homeRouterAnimate
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
            if (this.lastPageParam.isBack) {
                this.boxState = 'fromBack';
            }
        });
    }

    routerAnimateCBack() {
        switch (this.boxState) {
            case 'goNext':
                this.router.navigate(['/home/choose-init-pet'], {
                    queryParams: {
                        isNext: true
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
            data: petInfo
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    startGame() {
        this.boxState = 'goNext';
    }

    ngOnInit() {
    }

    introduce() {
        const dialogRef = this.dialog.open(IntroduceComponent, {
            width: '900px', height: '500px'
        });
    }
}
