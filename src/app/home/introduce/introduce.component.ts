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

    introduceList_petBuff_buff: IntroduceList[] = [
        { title: '吸血', description: '受重伤效果影响', detailed: '重伤效果降低 50% 的治疗效果。计算造成的伤害转换为吸血量，而不是发起的伤害' },
        { title: '护盾', description: '保护宠物免受伤害', detailed: '受到攻击时优先扣除护盾', url: 'assets/image/petBuff/shield.png' },
        { title: '暴击', description: '发起按比例增加的伤害', detailed: '发起按比例增加的伤害' },
        { title: '减伤', description: '按比例减少伤害', detailed: '按比例减少伤害', url: 'assets/image/petBuff/defenses_up.png' },
        { title: '闪避', description: '受到攻击时，有几率躲避一定伤害', detailed: '躲避部分伤害，飞行宠物躲避全额伤害。被缠绕、石化等定身效果无法闪避' },
        { title: '增加攻击力', description: '增加攻击力', detailed: '在同时有增加攻击力跟减少攻击力buff时，优先计算增加。减少攻击力是按比例减少全额攻击力', url: 'assets/image/petBuff/power_up.png' },
        { title: '增加护甲', description: '增加护甲', detailed: '增加护甲', url: '' },
        { title: '免疫', description: '免疫状态', detailed: '如：金属系宠物免疫石化、流血效果'},
    ];

    introduceList_petBuff_deBuff: IntroduceList[] = [
        { title: '流血', description: '每回合按比例减少生命值', detailed: '减少最大生命百分比的伤害，效果可叠加', url: 'assets/image/petBuff/bleeding.png' },
        { title: '重伤', description: '减少治疗效果', detailed: '减少治疗效果', url: 'assets/image/petBuff/seriousinjury.png' },
        { title: '石化', description: '进入石化状态', detailed: '使敌人僵硬，跳过一回合。金属系宠物可对石化敌人造成更多伤害' },
        { title: '缠绕', description: '被缠绕', detailed: '使敌人僵硬，跳过一回合。' },
        { title: '睡眠', description: '进入睡眠状态', detailed: '跳过一回合。', url: 'assets/image/petBuff/sleep.png' },
        { title: '冰冻', description: '进入冰冻状态', detailed: '跳过一回合。', url: 'assets/image/petBuff/frozen.png' },
        { title: '减少力量', description: '按比例减少力量', detailed: '按比例减少力量', url: 'assets/image/petBuff/power_low.png' },
        { title: '破甲', description: '减少护甲', detailed: '减少护甲', url: 'assets/image/petBuff/defenses_low.png' },
        { title: '沉默', description: '无法发动技能', detailed: '无法发动技能' },
    ];
}
