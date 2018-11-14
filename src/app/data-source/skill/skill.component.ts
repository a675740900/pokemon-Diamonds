/**
 * 技能属性
 */
export class SkillAttr {
    memo: string; // 技能说明
    Bleeding?: Bleeding;
    BloodSucking?: BloodSucking;
    ViolentAttack?: ViolentAttack;
    ReduceInjury?: ReduceInjury;
    ShieldFromAttack?: ShieldFromAttack;
    stiff?: stiff;
    ReducePower?: ReducePower;
    Dodge?: Dodge ;
}

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
 * 流血效果
 */
export class Bleeding {
    probability: number; // 流血几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%的伤害吸血
    numPerSecond: number; // 每秒伤害百分比 0.05表示目标最大生命值5%的伤害
    seriousInjury: number; // 重伤效果，0.5表示回血效果减半
    roundNum: number; // 持续时间
    attackTime: AttackTime = AttackTime.afterAttack;
    tip: string = '流血效果，HP'

    constructor(probability: number, numPerSecond: number, roundNum: number, seriousInjury: number = 0.5) {
        [this.probability, this.numPerSecond, this.roundNum, this.seriousInjury] = [probability, numPerSecond, roundNum, seriousInjury];
    }
}

/**
 * 吸血效果
 */
export class BloodSucking {
    probability: number; // 吸血几率 0.5表示50%
    efficiency: number; // 吸血效率 0.5表示50%的伤害吸血
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}

/**
 * 无视护甲伤害（真实伤害）
 */
export class RealAttack {
    probability: number;
    hurtNum: number; // 造成多少真实伤害
    efficiency: number; // 伤害效率 0.5表示50%的伤害吸血
    InjuryStatus: InjuryStatus = InjuryStatus.beforeCount;

    constructor(probability: number, efficiency: number, hurtNum: number) {
        [this.probability, this.efficiency, this.hurtNum] = [probability, efficiency, hurtNum];
    }
}

/**
 * 暴击
 */
export class ViolentAttack {
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
export class stiff {
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
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%

    constructor(probability: number, efficiency: number) {
        [this.probability, this.efficiency] = [probability, efficiency];
    }
}