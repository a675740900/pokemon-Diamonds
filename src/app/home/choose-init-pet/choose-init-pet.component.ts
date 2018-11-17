import { Component, OnInit, HostBinding } from '@angular/core';
import { boxAnimate } from '../../component/animations/base-click';
import { pageRouterAnimate } from '../../component/animations/router.animate';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRouterParam } from '../home/home-common';

@Component({
    selector: 'app-choose-init-pet',
    templateUrl: './choose-init-pet.component.html',
    styleUrls: ['./choose-init-pet.component.css'],
    animations: [
        pageRouterAnimate,
    ]
})
export class ChooseInitPetComponent implements OnInit {
    title: string = '选择初始宠物';
    lastPageParam: PageRouterParam;

    // 定义开始的状态
    private boxState: string;

    private _isTrue: Boolean = true;

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        activatedRoute.queryParams.subscribe((queryParams: PageRouterParam) => {
            this.lastPageParam = queryParams;
            if (this.lastPageParam.isNext) {
                this.boxState = 'fromNext';
            }
        });
    }

    ngOnInit() {
    }

    goBack() {
        this.boxState = 'goBack';

    }

    routerAnimateCBack() {
        switch (this.boxState) {
            case 'goBack':
                this.router.navigate(['/home/home'], {
                    queryParams: {
                        isBack: true
                    }
                });
                break;
        }
    }
}
