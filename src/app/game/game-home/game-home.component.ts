import { Component, OnInit, NgModule } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PageRouterParam } from '../../home/home-common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { pageRouterAnimate } from '../../component/animations/router.animate';
import { PlayerInfoITFS, MenuInfo } from './game-home-common';
import { boxAnimate } from '../../component/animations/base-click';
import { MapComponent } from '../../data-source/map/map.component';
import { setLocalStorage } from '../../local-archiving/local-storage';

@Component({
    selector: 'app-game-home',
    templateUrl: './game-home.component.html',
    styleUrls: ['./game-home.component.css'],
    animations: [
        pageRouterAnimate,
        boxAnimate
    ]
})
@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: GameHomeComponent
        }])
    ],
    declarations: [GameHomeComponent]
})
// 游戏界面
export class GameHomeComponent implements OnInit {
    playerInfo: PlayerInfoITFS; // 玩家资料

    // 定义开始的状态
    boxState: string;
    menubox: string;
    // 页面参数
    lastPageParam: PageRouterParam;

    menuParam: MenuInfo = {
        show: false
    }

    constructor(private activatedRoute: ActivatedRoute, private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog) {
        activatedRoute.queryParams.subscribe((queryParams: PageRouterParam) => {
            this.lastPageParam = queryParams;
            if (this.lastPageParam.goNext) {
                this.boxState = 'fromNext';
            }
        });
    }

    openSnackBar() {
        setLocalStorage([{ petTrainerName: '墨菱', pets: [], age: 12 }, { petTrainerName: '墨菱', pets: [], age: 12 }]);
        // this.snackBar.open('敬请期待！', '', {
        //     duration: 2000,
        // });
    }

    ngOnInit() {
        this.setMenuBox();
    }

    goHome() {
        this.boxState = 'goBack';
    }

    menuClick() {
        this.setMenuShow();
    }

    setMenuShow() {
        this.menuParam.show = !this.menuParam.show;
        this.setMenuBox();
    }

    setMenuBox() {
        this.menubox = this.menuParam.show ? 'show' : 'hidden';
    }

    openMap() {
        this.setMenuShow();
        const dialogRef = this.dialog.open(MapComponent, {
            width: '1000px',
            data: {},
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    // 页面动画回调
    routerAnimateCBack() {
        let url: string = '';
        switch (this.boxState) {
            case 'goBack':
                url = '/home';
                this.router.navigate([url], {
                    queryParams: {
                        goBack: true
                    }
                });
                break;
        }
    }

    boxCBack() {
        console.log('aaaaaaaaaaaaa');
    }
}
