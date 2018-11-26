import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PageRouterParam } from '../home/home-common';
import { ActivatedRoute, Router } from '@angular/router';
import { pageRouterAnimate } from '../../component/animations/router.animate';
import { PlayerInfoITFS } from './game-home-common';

@Component({
    selector: 'app-game-home',
    templateUrl: './game-home.component.html',
    styleUrls: ['./game-home.component.css'],
    animations: [
        pageRouterAnimate,
    ]
})
// 游戏界面
export class GameHomeComponent implements OnInit {
    playerInfo: PlayerInfoITFS; // 玩家资料

    // 定义开始的状态
    private boxState: string;
    // 页面参数
    lastPageParam: PageRouterParam;

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
    }

    goHome() {
        this.boxState = 'goHome';
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
}
