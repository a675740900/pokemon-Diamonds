import { SkillAttr, ViolentAttack, ReduceInjury, ShieldFromAttack, Bleeding } from "../skill/skill.component";

export class base_role_attr {
    roleguid: number; // 角色编号
    power: number; // 力量
    magic: number; // 智慧
    defenses: number; // 护甲

    constructor(roleguid: number, power: number, magic: number, defenses: number) {
        [this.roleguid, this.power, this.magic, this.defenses] = [roleguid, power, magic, defenses];
    }
}

/**
 * 战士
 */
export class Warrior {
    roleguid: number = 1; // 角色编号
    HP: number = 100;
    MP: number = 100;
    power: number = 6; // 力量
    magic: number = 2; // 智慧
    defenses: number = 3; // 防御力
    // new base_role_attr(1, 6, 2, 4);

    SkillAttr: SkillAttr[] = [
        { memo: '攻击时，有20%的几率造成双倍伤害', ViolentAttack: new ViolentAttack(0.2, 2) },
        { memo: '减少受到的10%的伤害', ReduceInjury: new ReduceInjury(1, 0.1) },
    ];

}

/**
 * 魔法师
 */
export class Magician {
    roleguid: number = 2; // 角色编号
    HP: number = 100;
    MP: number = 150;
    power: number = 2; // 力量
    magic: number = 6; // 智慧
    defenses: number = 0; // 防御力

    SkillAttr: SkillAttr[] = [
        { memo: '攻击时，有20%的几率使敌人进入流血状态', Bleeding: new Bleeding(0.2, 0.05, 2, 0.5) },
        { memo: '攻击时，能将造成伤害的10%转为自己的护盾', ShieldFromAttack: new ShieldFromAttack(1, 0.1) },
    ];
}