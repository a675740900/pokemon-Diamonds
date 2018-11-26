import { Component, OnInit } from '@angular/core';
import { pageRouterAnimate } from '../../component/animations/router.animate';
import { ActivatedRoute, Router } from '@angular/router';
import { PageRouterParam } from '../home/home-common';
import { PetIntroduce } from '../../component/comp-common';
import { Pet, getPet, getPetTypeName } from '../../data-source/pet/pet.component';

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

    choosePets: Pet[] = [
        getPet(1),
        getPet(2),
        getPet(3)
    ]

    petIntroduce: PetIntroduce[] = [];

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        activatedRoute.queryParams.subscribe((queryParams: PageRouterParam) => {
            this.lastPageParam = queryParams;
            if (this.lastPageParam.goNext) {
                this.boxState = 'fromNext';
            }
        });
    }

    ngOnInit() {
        
        // 初始化 可选择宠物的信息
        for (const pet of this.choosePets) {
            getPetTypeName(pet.pettype);
            this.petIntroduce.push(new PetIntroduce(pet.name, '', ''));
        }
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
                    queryParams: {
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
