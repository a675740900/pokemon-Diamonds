import { SkillAttr, ViolentAttack, ReduceInjury, BloodSucking, Stiff, Bleeding, ReducePower, Dodge, IncreasePower } from "../skill/skill.component";
import { matchITFS, getPetMatchList } from "./pet-info";
import { copy } from "src/app/common-tool";

export const petList_plant: number[] = [1];
export const petList_beast: number[] = [2];
export const petList_metal: number[] = [3];
export const petList_water: number[] = [4];
export const petList_flight: number[] = [5];

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

export enum PetType {
    PLANT, // 植物系--克制飞行
    BEAST , // 猛兽系--克制植物
    METAL, // 金属系--克制猛兽
    WATER, // 海洋系--克制金属
    FLIGHT, // 飞行系--克制海洋系
}

export class Buff {
    bleeding?: number; // 流血
    seriousInjury?: boolean; // 是否重伤
    Stiff?: boolean; // 是否僵硬
    reducePower?: number; // 减少攻击力
    increasePower?: number; // 增加攻击力
    shield?: number; // 护盾
    roundNum?: number; // 回合数
    currentRound?: number; // 当前回合数
}

export class pet {
    petguid: number; // 宠物编号
    name: string; // 宠物名称
    HP: number; // 血量
    current_HP: number; // 当前血量
    MP: number; // 蓝量
    power: number; // 力量（攻击力）
    level: number; // 阶级
    defenses: number; // 防御力
    pettype: PetType; // 属性
    passiveSkills: SkillAttr[] = []; // 被动技能
    activeSkill: SkillAttr[] = []; // 主动技能
    buff: Buff[] = [];
    debuff: Buff[] = [];
}

export class Argy extends pet {
    petguid: number = 1;
    name: string = '艾草';
    HP: number = 50;
    current_HP: number = copy(this.HP);
    MP: number = 50;
    power: number = 9;
    level: number = 1; // 阶级1
    defenses: number = 0;
    pettype: PetType = PetType.PLANT;

    passiveSkills: SkillAttr[] = [
        { memo: '攻击时10%吸血效果', BloodSucking: new BloodSucking(1, 0.1) },
        { memo: '攻击时5%的几率缠绕敌人，使其无法行动一回合', Stiff: new Stiff(0.5, 1) }
    ];
}

export class Mantis extends pet {
    petguid: number = 2;
    name: string = '螳螂';
    HP: number = 60;
    current_HP: number = copy(this.HP);
    MP: number = 50;
    power: number = 10;
    level: number = 1; // 阶级1
    defenses: number = 3;
    pettype: PetType = PetType.BEAST;

    passiveSkills: SkillAttr[] = [
        { memo: '攻击时，有10%的几率使敌人进入流血状态，持续3个回合', Bleeding: new Bleeding(0.1, 0.04, 3) }
    ];
}

export class CupricSnake extends pet  {
    petguid: number = 3;
    name: string = '赤铜蛇';
    HP: number = 80;
    current_HP: number = copy(this.HP);
    MP: number = 35;
    power: number = 6;
    level: number = 1; // 阶级1
    defenses: number = 3;
    pettype: PetType = PetType.METAL;

    passiveSkills: SkillAttr[] = [
        { memo: '身体坚硬，有15%的伤害减免', ReduceInjury: new ReduceInjury(1, 0.15) },
        { memo: '攻击时5%的几率使敌人石化，无法行动一回合',  Stiff: new Stiff(0.5, 1) },
    ];
}

export class Penguin extends pet {
    petguid: number = 4;
    name: string = '企鹅';
    HP: number = 70;
    current_HP: number = copy(this.HP);
    MP: number = 60;
    power: number = 7;
    level: number = 1; // 阶级1
    defenses: number = 1;
    pettype: PetType = PetType.WATER;

    passiveSkills: SkillAttr[] = [
        { memo: '攻击时，有30%的几率使敌人水肿，其攻击力下降20%，持续一回合', ReducePower: new ReducePower(0.3, 0.2, 1) },
        { memo: '受到伤害时，有10%的几率钻入水中躲避50%的伤害',  Dodge: new Dodge(0.1, 0.5) },
    ];
} 

export class Sparrow extends pet {
    petguid: number = 5;
    name: string = '老鹰';
    HP: number = 70;
    current_HP: number = copy(this.HP);
    MP: number = 60;
    power: number = 7;
    level: number = 1; // 阶级1
    defenses: number = 1;
    pettype: PetType = PetType.FLIGHT;

    passiveSkills: SkillAttr[] = [
        { memo: '飞的快，受到伤害时，有10%的几率躲避伤害',Dodge: new Dodge(0.1, 1) },
        { memo: '居高临下，增加10%的攻击力', IncreasePower: new IncreasePower(1, 0.1) },
    ];
} 