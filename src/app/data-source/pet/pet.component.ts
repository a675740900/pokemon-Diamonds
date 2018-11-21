import { SkillAttr, ReduceInjury, BloodSucking, Bleeding, ReducePower, Dodge, IncreasePower, ShieldFromAttack, ViolentAttack, IncreaseBlood, SkillTip, AttackAbnormal, Ailent, ImmuneSkill, Stiff_Stone, Stiff_Twining } from "../skill/skill.component";
import { matchITFS, getPetMatchList } from "./pet-info";
import { copy, rmFloatPoint, toPercentage } from "../../home/common-tool";
import { petBuffIcon, PetDataITFS } from "../../home/fight/fight-common";

export const petList_plant: number[] = [1];
export const petList_beast: number[] = [2];
export const petList_metal: number[] = [3];
export const petList_water: number[] = [4];
export const petList_flight: number[] = [5];

export const petInfo: petInfoITFS = {
    maxGrade: 60
}

export const getPet = (petguid: number) => {
    const petMatchList: matchITFS[] = getPetMatchList();
    let pet: any;
    for (const petInfo of petMatchList) {
        if (petInfo.petguid == petguid) {
            pet = eval(`new ${petInfo.className}`);
        }
    }
    return pet;
}

// 宠物信息
export interface petInfoITFS {
    maxGrade: number; // 最高等级
}

export enum PetType {
    PLANT, // 植物系--克制飞行
    BEAST, // 猛兽系--克制植物
    METAL, // 金属系--克制猛兽
    WATER, // 海洋系--克制金属
    FLIGHT, // 飞行系--克制海洋系
}

export class Buff {
    Bleeding?: number; // 流血
    Poisoning?: number; // 中毒
    SeriousInjury?: number; // 是否重伤
    Stiff_Twining?: boolean; // 是否被缠绕
    Stiff_Stone?: boolean; // 是否石化
    Stiff_Frozen?: boolean; // 是否被冰冻
    Stiff_Sleep?: boolean; // 是否睡眠
    Ailent?: boolean; // 是否沉默
    ReducePower?: number; // 减少攻击力
    IncreasePower?: number; // 增加攻击力
    IncreaseBleedingProbability?: number; // 增加流血几率
    roundNum: number; // 回合数
    currentRound: number; // 当前回合数
}

export class pet {
    petguid: number; // 宠物编号
    name: string; // 宠物名称
    HP: number; // 血量
    current_HP: number; // 当前血量
    MP: number; // 蓝量
    shield: number = 0; // 护盾
    power: number; // 力量（攻击力）
    level: number = 1; // 阶级
    HPProp: number;
    MPProp: number;
    powerProp: number;
    defensesProp: number;
    maxLevel: number;
    maxGrade: number = 60;
    defenses: number; // 防御力
    pettype: PetType; // 属性
    passiveSkills: SkillAttr[] = []; // 被动技能
    activeSkill: SkillAttr[] = []; // 主动技能
    petInstructions: Array<{ memo: string }>; // 技能说明
    grade: number = 1; // 等级
    exp: number = 0; // 当前经验值
    buff: Buff[] = [];
    debuff: Buff[] = [];
    buffIcon: petBuffIcon[] = []; // buff图标
    petData: PetDataITFS = {}; // 数据信息
}

export class LevelPropITFS {
    level: number;
    HPProp: number; // 比例
    MPProp: number; // 比例
    powerProp: number; // 比例
    defensesProp: number; // 比例

    constructor(level: number, powerProp: number, HPProp: number, MPProp: number, defensesProp: number) {
        [this.level, this.powerProp, this.HPProp, this.MPProp, this.defensesProp] = [level, powerProp, HPProp, MPProp, defensesProp];
    }
}

// 提升阶级属性提升比例
export const LevelProp: LevelPropITFS[] = [
    new LevelPropITFS(0, -0.15, -0.15, -0.15, -0.15),
    new LevelPropITFS(1, 0, 0, 0, 0),
    new LevelPropITFS(2, 0.14, 0.14, 0.14, 0.14),
    new LevelPropITFS(3, 0.28, 0.28, 0.28, 0.28),
    new LevelPropITFS(4, 0.42, 0.42, 0.42, 0.42),
    new LevelPropITFS(5, 0.56, 0.56, 0.56, 0.56),
];

export const getLevelProp = (): LevelPropITFS[] => {
    return LevelProp;
}

export class Argy extends pet {
    petguid: number = 1;
    name: string = '艾草';
    HP: number = 50;
    current_HP: number = copy(this.HP);
    MP: number = 50;
    power: number = 9;
    level: number = 1; // 阶级1
    HPProp: number = 6.7;
    MPProp: number = 2.6;
    powerProp: number = 2;
    defensesProp: number = 0.5;
    maxLevel: number = 3;
    defenses: number = 1;
    pettype: PetType = PetType.PLANT;

    passiveSkills: SkillAttr[] = [
        { BloodSucking: new BloodSucking(1, 0.2, 0.15 / petInfo.maxGrade), level: 1, },
        { Stiff_Twining: new Stiff_Twining(0.1, 1), level: 2, skillTip: SkillTip.TWINING },
        // { memo: '攻击时，将造成的伤害的15%转换为护盾', ShieldFromAttack: new ShieldFromAttack(1, 0.15, 0, 0.15 / petInfo.maxGrade), level: 2 },
        { IncreaseBlood: new IncreaseBlood(0.35, 0.20, 0.3, 0, 0.15 / petInfo.maxGrade), level: 2, skillTip: SkillTip.DRAGONBOAT },
        // { memo: '攻击时，10%的几率是敌人中毒，持续3回合', Bleeding: new Bleeding(0.1, 0.04, 3, 0), level: 2},
    ];

    petInstructions: any[] = [
        { memo: `攻击时 ${toPercentage(this.passiveSkills[0].BloodSucking.efficiency)} 吸血效果` },
        { memo: `攻击时，${toPercentage(this.passiveSkills[1].Stiff_Twining.probability)} 的几率缠绕敌人，使其无法行动一回合` },
        {
            memo: `终极奥义：过端午！生命值低于 ${toPercentage(this.passiveSkills[2].IncreaseBlood.bloodCondition)}，被攻击时有 ${toPercentage(this.passiveSkills[2].IncreaseBlood.probability)} 的几率会回复已损失生命值 ${toPercentage(this.passiveSkills[2].IncreaseBlood.efficiency)} 的生命值`
        }
    ]
}

export class Mantis extends pet {
    petguid: number = 2;
    name: string = '螳螂';
    HP: number = 50;
    current_HP: number = copy(this.HP);
    MP: number = 50;
    power: number = 10;
    level: number = 1; // 阶级1
    HPProp: number = 6.8;
    MPProp: number = 2.5;
    powerProp: number = 2.2;
    defensesProp: number = 0.6;
    maxLevel: number = 2;
    defenses: number = 2;
    pettype: PetType = PetType.BEAST;

    passiveSkills: SkillAttr[] = [
        { Bleeding: new Bleeding(0.15, 0.04, 3, 0.5, 0.2 / petInfo.maxGrade, 0.02 / petInfo.maxGrade), level: 1, skillTip: SkillTip.BLEEDING },
        { ViolentAttack: new ViolentAttack(0.1, 0.5, 1, 0.1 / petInfo.maxGrade), level: 2 },
    ];

    petInstructions: any[] = [
        { memo: `攻击时，有${toPercentage(this.passiveSkills[0].Bleeding.probability)} 几率使敌人进入流血状态，持续 ${this.passiveSkills[0].Bleeding.roundNum} 个回合` },
        {
            memo: `攻击时，有${toPercentage(this.passiveSkills[1].ViolentAttack.probability)} 的几率暴击，暴击伤害 ${toPercentage(rmFloatPoint(this.passiveSkills[1].ViolentAttack.probability + 1))}，暴击造成的伤害流血几率增加 ${toPercentage(this.passiveSkills[1].ViolentAttack.IncreaseBleedingProbability)}`
        },
    ]
}

export class CupricSnake extends pet {
    petguid: number = 3;
    name: string = '赤铜蛇';
    HP: number = 70;
    current_HP: number = copy(this.HP);
    MP: number = 35;
    power: number = 6;
    level: number = 1; // 阶级1
    HPProp: number = 9.8;
    MPProp: number = 2.2;
    powerProp: number = 1.6;
    defensesProp: number = 0.7;
    maxLevel: number = 2;
    defenses: number = 3;
    pettype: PetType = PetType.METAL;

    passiveSkills: SkillAttr[] = [
        { ReduceInjury: new ReduceInjury(1, 0.10, 0.1 / petInfo.maxGrade), level: 1, skillTip: SkillTip.BODYHARD },
        { ImmuneSkill: new ImmuneSkill(1, 0, ['Bleeding', 'Stiff_Stone']), level: 1 },
        { Stiff_Stone: new Stiff_Stone(0.1, 1), level: 2, skillTip: SkillTip.PETRIFACTION },
        { AttackAbnormal: new AttackAbnormal(1, 0.5, 'Stiff_Stone'), level: 2, skillTip: SkillTip.PETRIFACTION },
    ];

    petInstructions: any[] = [
        { memo: `身体坚硬，减免 ${this.passiveSkills[0].ReduceInjury.efficiency} 的伤害` },
        { memo: `免疫 流血、石化状态` },
        { memo: `攻击时 ${this.passiveSkills[2].Stiff_Stone.probability} 的几率使敌人石化，无法行动 ${this.passiveSkills[2].Stiff_Stone.roundNum} 回合` },
        { memo: `攻击石化状态的敌人伤害增加 ${this.passiveSkills[3].AttackAbnormal.efficiency}` }
    ]
}

export class Penguin extends pet {
    petguid: number = 4;
    name: string = '企鹅';
    HP: number = 55;
    current_HP: number = copy(this.HP);
    MP: number = 60;
    power: number = 8;
    level: number = 1; // 阶级1
    HPProp: number = 7;
    MPProp: number = 3.2;
    powerProp: number = 1.8;
    defensesProp: number = 0.6;
    maxLevel: number = 2;
    defenses: number = 1;
    pettype: PetType = PetType.WATER;

    passiveSkills: SkillAttr[] = [
        { ReducePower: new ReducePower(0.2, 0.25, 1, 0.15 / petInfo.maxGrade, 0.1 / petInfo.maxGrade), level: 1, skillTip: SkillTip.EDEMA },
        { Dodge: new Dodge(0.2, 0.3, true, 0.15 / petInfo.maxGrade, 0.2 / petInfo.maxGrade), level: 1, skillTip: SkillTip.DIVING },
        { Ailent: new Ailent(0.5, 1), level: 2, skillTip: SkillTip.AILENT },
    ];

    petInstructions: any[] = [
        {
            memo: `攻击时，有 ${this.passiveSkills[0].ReducePower.probability} 的几率使敌人水肿，其攻击力下降 ${this.passiveSkills[0].ReducePower.efficiency}， 持续 ${this.passiveSkills[0].ReducePower.roundNum} 回合`
        },
        { memo: `受到伤害时，有 ${this.passiveSkills[1].Dodge.probability} 的几率钻入水中躲避 ${this.passiveSkills[1].Dodge.efficiency} 的伤害，并移除所有减异效果` },
        { memo: `攻击时，有 ${this.passiveSkills[2].Ailent.probability} 的几率使敌人沉默，无法发动被动技能，持续 ${this.passiveSkills[2].Ailent.roundNum} 回合` }
    ]
}

export class Sparrow extends pet {
    petguid: number = 5;
    name: string = '老鹰';
    HP: number = 55;
    current_HP: number = copy(this.HP);
    MP: number = 60;
    power: number = 7;
    level: number = 1; // 阶级1
    HPProp: number = 6.8;
    MPProp: number = 2.6;
    powerProp: number = 1.8;
    defensesProp: number = 0.6;
    maxLevel: number = 2;
    defenses: number = 1;
    pettype: PetType = PetType.FLIGHT;

    passiveSkills: SkillAttr[] = [
        { Dodge: new Dodge(0.1, 1, false, 0.1 / petInfo.maxGrade), level: 1, skillTip: SkillTip.FLYINGFAST },
        { IncreasePower: new IncreasePower(1, 0.2, 1, 0.1 / petInfo.maxGrade), level: 1 },
    ];

    petInstructions: any[] = [
        { memo: `飞的快，受到伤害时，有 ${this.passiveSkills[0].Dodge.probability} 的几率躲避伤害` },
        { memo: `居高临下，增加 ${this.passiveSkills[1].IncreasePower.efficiency} 的攻击力` }
    ]
} 