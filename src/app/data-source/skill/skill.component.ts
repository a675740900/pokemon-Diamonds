/**
 * 技能属性
 */
export class SkillAttr {
    memo: string; // 技能说明
    Bleeding?: Bleeding; // 流血
    BloodSucking?: BloodSucking; // 吸血
    ViolentAttack?: ViolentAttack; // 暴击
    ReduceInjury?: ReduceInjury; // 减伤
    ShieldFromAttack?: ShieldFromAttack; // 护盾
    Stiff?: Stiff; // 僵硬
    ReducePower?: ReducePower; // 减少攻击力
    Dodge?: Dodge; // 闪避
    IncreasePower?: IncreasePower // 增加攻击力
}

export const beAttackedSkill: string[] = ['ReduceInjury'];
export const beforeAttackSkill: string[] = ['IncreasePower', 'ViolentAttack'];
export const attackSkill: string[] = ['Dodge'];
export const afterAttackSkill: string[] = ['Bleeding', 'BloodSucking', 'ShieldFromAttack'];

/**
 * 攻击时间段
 */
export enum AttackTime {
    beforeAttack = -1, // 攻击前
    toAttack = 0, // 攻击
    afterAttack = 1, // 攻击后
}

/**
 * 伤害折算前后
 */
export enum InjuryStatus {
    beforeCount = -1, // 伤害折算前
    afterCount = 1, // 伤害折算后
}

/**
 * 技能类型
 */
export enum SkillType {
    BUFF = 1, // 增益技能
    DEBUFF = 2 // 减益技能
}

/**
 * 使用对象
 */
export enum Target {
    self = 1, // 对自己释放
    enemy = 2 // 对敌人释放
}

/**
 * 流血效果
 */
export class Bleeding {
    name: string = 'Bleeding';
    probability: number; // 流血几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%的伤害吸血
    seriousInjury: number; // 重伤效果，0.5表示回血效果减半
    roundNum: number; // 持续时间
    attackTime: AttackTime = AttackTime.afterAttack;
    skillType: SkillType = SkillType.DEBUFF;
    target: Target = Target.enemy;
    tip: string = '流血效果，HP'

    constructor(probability: number, efficiency: number, roundNum: number, seriousInjury: number = 0.5) {
        [this.probability, this.efficiency, this.roundNum, this.seriousInjury] = [probability, efficiency, roundNum, seriousInjury];
    }
}

/**
 * 吸血效果
 */
export class BloodSucking {
    name: string = 'BloodSucking';
    probability: number; // 吸血几率 0.5表示50%
    efficiency: number; // 吸血效率 0.5表示50%的伤害吸血
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;
    skillType: SkillType = SkillType.BUFF;
    target: Target = Target.self;

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}

/**
 * 无视护甲伤害（真实伤害）
 */
export class RealAttack {
    name: string = 'RealAttack';
    probability: number;
    hurtNum: number; // 造成多少真实伤害
    efficiency: number; // 伤害效率 0.5表示50%的伤害吸血
    InjuryStatus: InjuryStatus = InjuryStatus.beforeCount;
    skillType: SkillType = SkillType.DEBUFF;
    target: Target = Target.enemy;

    constructor(probability: number, efficiency: number, hurtNum: number) {
        [this.probability, this.efficiency, this.hurtNum] = [probability, efficiency, hurtNum];
    }
}

/**
 * 暴击
 */
export class ViolentAttack {
    name: string = 'ViolentAttack';
    probability: number; // 暴击几率 0.5表示50%的暴击几率
    hurtNum: number; // 暴击伤害 2表示200%
    InjuryStatus: InjuryStatus = InjuryStatus.beforeCount;
    AttackTime: AttackTime = AttackTime.toAttack;

    constructor(probability: number, hurtNum: number) {
        [this.probability, this.hurtNum] = [probability, hurtNum];
    }
}

/**
 * 减伤
 */
export class ReduceInjury {
    name: string = 'ReduceInjury';
    probability: number; // 减伤几率
    efficiency: number; // 减伤效率 0.5表示50%的伤害吸血
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}

/**
 * 因为造成伤害而产生的护盾
 */
export class ShieldFromAttack {
    name: string = 'ShieldFromAttack';
    probability: number;
    efficiency: number; // 生成护盾效率 0.5表示50%的伤害吸血
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}

/**
 * 使敌人僵硬
 */
export class Stiff {
    name: string = 'Stiff';
    probability: number; // 僵硬几率
    roundNum: number; // 僵硬回合数

    constructor(probability: number, roundNum: number) {
        [this.probability, this.roundNum] = [probability, roundNum];
    }
}

/**
 * 使敌人减少力量
 */
export class ReducePower {
    name: string = 'ReducePower';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%
    roundNum: number; // 持续时间

    constructor(probability: number, efficiency: number, roundNum: number) {
        [this.probability, this.efficiency, roundNum] = [probability, efficiency, roundNum];
    }
}

/**
 * 闪避伤害
 */
export class Dodge {
    name: string = 'Dodge';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}

/**
 * 增加攻击力
 */
export class IncreasePower {
    name: string = 'IncreasePower';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}