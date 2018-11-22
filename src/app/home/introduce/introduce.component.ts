import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IntroduceList_buff, IntroduceList } from '../../component/comp-common';
import { toPercentage } from '../common-tool';
import { restraintNum } from '../../data-source/pet/pet.component';

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit, AfterViewInit {
    isComponentInit: boolean = false;
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isComponentInit = true;
        }, 200);
    }
    ngOnInit(): void {
    }

    introduceList_pet: IntroduceList[] = [
        new IntroduceList('宠物相克', '克制宠物增加力量，被克制减少力量', `克制关系：植物 <- 猛兽 <- 金属 <- 海洋 <- 飞行 <- 植物     克制增加 ${toPercentage(restraintNum)} 力量，被克制减少 ${toPercentage(restraintNum)} 力量`),
        new IntroduceList('精灵球', '死亡、被收回的宠物会进入精灵球', `进入精灵球的宠物会移除所有buff、debuff效果`),
        new IntroduceList('地形', '与宠物相匹配的地形会使宠物增加力量', `场景增加力量 20%`),
    ]

    introduceList_petBuff_buff: IntroduceList_buff[] = [
        new IntroduceList_buff('BloodSucking', '受重伤效果影响', '重伤效果降低 50% 的治疗效果。计算造成的伤害转换为吸血量，而不是发起的伤害。部分猛兽系会增加重伤效果'),
        new IntroduceList_buff('Shield', '保护宠物免受伤害', '受到攻击时优先扣除护盾'),
        new IntroduceList_buff('ReduceInjury', '按比例减少伤害', '按比例减少伤害'),
        new IntroduceList_buff('Dodge', '受到攻击时，有几率躲避一定伤害', '躲避部分伤害，飞行宠物躲避全额伤害。被缠绕、石化等定身效果无法闪避'),
        new IntroduceList_buff('IncreasePower', '增加攻击力', '在同时有增加攻击力跟减少攻击力buff时，优先计算增加。减少攻击力是按比例减少全额攻击力'),
        new IntroduceList_buff('IncreaseArmor', '增加护甲', '增加护甲'),
        new IntroduceList_buff('Immune', '免疫状态', '如：金属系宠物免疫石化、流血效果'),
    ];

    introduceList_petBuff_deBuff: IntroduceList_buff[] = [
        new IntroduceList_buff('Bleeding', '每回合按比例减少生命值', '减少最大生命百分比的伤害，效果可叠加'),
        new IntroduceList_buff('SeriousInjury', '减少治疗效果', '减少治疗效果'),
        new IntroduceList_buff('Stiff_Stone', '进入石化状态', '使敌人僵硬，跳过一回合。金属系宠物可对石化敌人造成更多伤害'),
        new IntroduceList_buff('Stiff_Twining', '被缠绕', '使敌人僵硬，跳过一回合。'),
        new IntroduceList_buff('Stiff_Sleep', '进入睡眠状态', '跳过一回合。'),
        new IntroduceList_buff('Stiff_Frozen', '进入冰冻状态', '跳过一回合。'),
        new IntroduceList_buff('ReducePower', '按比例减少力量', '按比例减少力量'),
        new IntroduceList_buff('ReduceArmor', '减少护甲', '减少护甲'),
        new IntroduceList_buff('Silent', '无法发动技能', '无法发动任何技能'),
    ];
    
}
