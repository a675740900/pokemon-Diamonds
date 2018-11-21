import { Component, OnInit } from '@angular/core';
import { IntroduceList } from '../../component/comp-common';

@Component({
    selector: 'app-introduce',
    templateUrl: './introduce.component.html',
    styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
    ngOnInit(): void {
    }

    introduceList_pet: IntroduceList[] = [
        new IntroduceList('Bleeding', '受重伤效果影响', '重伤效果降低 50% 的治疗效果。计算造成的伤害转换为吸血量，而不是发起的伤害。部分猛兽系会增加重伤效果'),    ]

    introduceList_petBuff_buff: IntroduceList[] = [
        new IntroduceList('BloodSucking', '受重伤效果影响', '重伤效果降低 50% 的治疗效果。计算造成的伤害转换为吸血量，而不是发起的伤害。部分猛兽系会增加重伤效果'),
        new IntroduceList('Shield', '保护宠物免受伤害', '受到攻击时优先扣除护盾'),
        new IntroduceList('ReduceInjury', '按比例减少伤害', '按比例减少伤害'),
        new IntroduceList('Dodge', '受到攻击时，有几率躲避一定伤害', '躲避部分伤害，飞行宠物躲避全额伤害。被缠绕、石化等定身效果无法闪避'),
        new IntroduceList('IncreasePower', '增加攻击力', '在同时有增加攻击力跟减少攻击力buff时，优先计算增加。减少攻击力是按比例减少全额攻击力'),
        new IntroduceList('IncreaseArmor', '增加护甲', '增加护甲'),
        new IntroduceList('Immune', '免疫状态', '如：金属系宠物免疫石化、流血效果'),
    ];

    introduceList_petBuff_deBuff: IntroduceList[] = [
        new IntroduceList('Bleeding', '每回合按比例减少生命值', '减少最大生命百分比的伤害，效果可叠加'),
        new IntroduceList('SeriousInjury', '减少治疗效果', '减少治疗效果'),
        new IntroduceList('Stiff_Stone', '进入石化状态', '使敌人僵硬，跳过一回合。金属系宠物可对石化敌人造成更多伤害'),
        new IntroduceList('Stiff_Twining', '被缠绕', '使敌人僵硬，跳过一回合。'),
        new IntroduceList('Stiff_Sleep', '进入睡眠状态', '跳过一回合。'),
        new IntroduceList('Stiff_Frozen', '进入冰冻状态', '跳过一回合。'),
        new IntroduceList('ReducePower', '按比例减少力量', '按比例减少力量'),
        new IntroduceList('ReduceArmor', '减少护甲', '减少护甲'),
        new IntroduceList('Alient', '无法发动技能', '无法发动任何技能'),
    ];
}
