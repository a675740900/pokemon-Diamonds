import { Component, OnInit } from '@angular/core';
import { pageRouterAnimate } from '../../component/animations/router.animate';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRouterParam } from '../home/home-common';
import { Pet, getPet } from '../../data-source/pet/pet.component';

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
    boxState: string;

    choosePets: Pet[] = [
        getPet(1),
        getPet(2),
        getPet(3)
    ]

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        activatedRoute.queryParams.subscribe((queryParams: PageRouterParam) => {
            this.lastPageParam = queryParams;
            if (this.lastPageParam.goNext) {
                this.boxState = 'fromNext';
            }
        });
    }

    ngOnInit() {
        
    }

    goBack() {
        this.boxState = 'goBack';
    }

    goNext() {
        this.boxState = 'goNext';
    }

    routerAnimateCBack() {
        switch (this.boxState) {
            case 'goBack':
                this.router.navigate(['/home/home'], {
                    queryParams: { // 页面跳转参数
                        goBack: true
                    }
                });
                break;
            case 'goNext':
                this.router.navigate(['/home/game-home'], {
                    queryParams: {
                        goNext: true
                    }
                });
                break;
        }
    }
}
