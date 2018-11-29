import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PageRouterParam } from '../home/home-common';
import { ActivatedRoute, Router } from '@angular/router';
import { pageRouterAnimate } from '../../component/animations/router.animate';
import { PlayerInfoITFS, MenuInfo } from './game-home-common';
import { boxAnimate } from '../../component/animations/base-click';

@Component({
    selector: 'app-game-home',
    templateUrl: './game-home.component.html',
    styleUrls: ['./game-home.component.css'],
    animations: [
        pageRouterAnimate,
        boxAnimate
    ]
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

    constructor(private activatedRoute: ActivatedRoute, private router: Router, public snackBar: MatSnackBar) {
        activatedRoute.queryParams.subscribe((queryParams: PageRouterParam) => {
            this.lastPageParam = queryParams;
            if (this.lastPageParam.goNext) {
                this.boxState = 'fromNext';
            }
        });
    }

    openSnackBar() {
        this.snackBar.open('敬请期待！', '', {
            duration: 2000,
        });
    }

    ngOnInit() {
        this.setMenuBox();
    }

    goHome() {
        this.boxState = 'goHome';
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

    routerAnimateCBack() {
        let url: string = '';
        switch (this.boxState) {
            case 'goHome':
                url = '/home/home';
            case 'goBack':
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
