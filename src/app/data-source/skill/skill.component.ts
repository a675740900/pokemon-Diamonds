/**
 * 技能属性
 */
export class SkillAttr {
    memo?: string; // 技能说明
    level?: number; // 技能所需阶级
    grade?: number; // 技能所需等级
    Bleeding?: Bleeding; // 流血
    BloodSucking?: BloodSucking; // 吸血
    ViolentAttack?: ViolentAttack; // 暴击
    ReduceInjury?: ReduceInjury; // 减伤
    ShieldFromAttack?: ShieldFromAttack; // 护盾
    Stiff_Twining?: Stiff_Twining; // 缠绕僵硬
    Stiff_Stone?: Stiff_Stone; // 石化僵硬
    Stiff_Frozen?: Stiff_Frozen; // 冰冻僵硬
    Silent?: Silent; // 沉默
    ReducePower?: ReducePower; // 减少攻击力
    Dodge?: Dodge; // 闪避
    IncreasePower?: IncreasePower; // 增加攻击力
    IncreaseBlood?: IncreaseBlood; // 增加已损失生命值百分比的血量
    AttackAbnormal?: AttackAbnormal; // 攻击异常状态,增加伤害
    ImmuneSkill?: ImmuneSkill; // 免疫状态
    skillTip?: SkillTip; // 提示词
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

// 无限回合
export enum InfiniteRound {
    infinite = 99
}

/**
 * 技能类型
 */
export enum SkillType {
    BUFF = 'buff', // 增益技能
    DEBUFF = 'debuff' // 减益技能
}

/**
 * 使用对象
 */
export enum Target {
    self = 1, // 对自己释放
    enemy = 2 // 对敌人释放
}

export enum SkillTip {
    TWINING = '被缠绕',
    PETRIFACTION = '石化',
    DRAGONBOAT = '发动终极奥义：过端午！',
    BLEEDING = '流血',
    POISONING = '中毒',
    EDEMA = '水肿',
    DIVING = '潜入水中',
    FLYINGFAST = '飞得快',
    BODYHARD = '身体坚硬',
    AILENT = '沉默了',
}

/**
 * 流血效果
 */
export class Bleeding {
    name: string = 'Bleeding';
    probability: number; // 流血几率 0.5表示50%的
    efficiency: number; // 效率 0.05表示每回合扣除最大生命值5%的生命值
    SeriousInjury: number; // 重伤效果，0.5表示回血效果减半
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    roundNum: number; // 持续时间
    attackTime: AttackTime = AttackTime.afterAttack;
    skillType: SkillType = SkillType.DEBUFF;
    target: Target = Target.enemy;
    triggerRound: Target = Target.enemy; // 触发回合

    constructor(probability: number, efficiency: number, roundNum: number, SeriousInjury: number = 0.5, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.roundNum, this.SeriousInjury, this.probabilityProp, this.efficiencyProp] =
            [probability, efficiency, roundNum, SeriousInjury, probabilityProp, efficiencyProp];
    }
}

/**
 * 吸血效果
 */
export class BloodSucking {
    name: string = 'BloodSucking';
    probability: number; // 吸血几率 0.5表示50%
    efficiency: number; // 吸血效率 0.5表示50%的伤害吸血
    efficiencyProp: number; // 每级提升吸血效率 0.1表示每级增加10%的吸血效率
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;
    skillType: SkillType = SkillType.BUFF;
    target: Target = Target.self;
    triggerRound: Target = Target.self; // 触发回合

    constructor(probability: number, efficiency: number, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.efficiencyProp] = [probability, efficiency, efficiencyProp];
    }
}

/**
 * 无视护甲伤害（真实伤害）
 */
export class RealAttack {
    name: string = 'RealAttack';
    probability: number;
    hurtNum: number; // 造成多少真实伤害
    efficiency: number; // 伤害效率 0.5表示50%的护甲无视
    efficiencyProp: number; // 每级增加多少点护甲无视
    InjuryStatus: InjuryStatus = InjuryStatus.beforeCount;
    skillType: SkillType = SkillType.DEBUFF;
    target: Target = Target.enemy;
    triggerRound: Target = Target.self; // 触发回合

    constructor(probability: number, efficiency: number, hurtNum: number, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.hurtNum, this.efficiencyProp] = [probability, efficiency, hurtNum, efficiencyProp];
    }
}

/**
 * 暴击
 */
export class ViolentAttack {
    name: string = 'ViolentAttack';
    probability: number; // 暴击几率 0.5表示50%的暴击几率
    efficiency: number; // 暴击伤害 2表示200%
    IncreaseBleedingProbability: number; // 增加流血几率
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    InjuryStatus: InjuryStatus = InjuryStatus.beforeCount;
    AttackTime: AttackTime = AttackTime.toAttack;
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, IncreaseBleedingProbability: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.IncreaseBleedingProbability, this.probabilityProp, this.efficiencyProp] = 
        [probability, efficiency, IncreaseBleedingProbability, probabilityProp, efficiencyProp];
    }
}

/**
 * 减伤
 */
export class ReduceInjury {
    name: string = 'ReduceInjury';
    probability: number; // 减伤几率
    efficiency: number; // 减伤效率 0.5表示50%
    roundNum: number;
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;
    triggerRound: Target = Target.enemy; // 触发回合
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, roundNum: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.roundNum, this.probabilityProp, this.efficiencyProp] = [probability, efficiency, roundNum, probabilityProp, efficiencyProp];
    }
}

/**
 * 因为造成伤害而产生的护盾
 */
export class ShieldFromAttack {
    name: string = 'ShieldFromAttack';
    probability: number;
    efficiency: number; // 生成护盾效率 0.5表示50%
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    InjuryStatus: InjuryStatus = InjuryStatus.afterCount;
    triggerRound: Target = Target.self; // 触发回合
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.probabilityProp, this.efficiencyProp] = [probability, efficiency, probabilityProp, efficiencyProp];
    }
}

/**
 * 使敌人缠绕僵硬
 */
export class Stiff_Twining {
    name: string = 'Stiff_Twining';
    probability: number; // 僵硬几率
    roundNum: number; // 僵硬回合数
    probabilityProp: number; // 每级提升触发几率
    triggerRound: Target = Target.self; // 触发回合
    skillType: SkillType = SkillType.DEBUFF;

    constructor(probability: number, roundNum: number, probabilityProp: number = 0) {
        [this.probability, this.roundNum, this.probabilityProp] = [probability, roundNum + 1, probabilityProp];
    }
}

/**
 * 使敌人石化僵硬
 */
export class Stiff_Stone {
    name: string = 'Stiff_Stone';
    probability: number; // 石化几率
    roundNum: number; // 僵硬回合数
    probabilityProp: number; // 每级提升触发几率
    triggerRound: Target = Target.self; // 触发回合
    skillType: SkillType = SkillType.DEBUFF;

    constructor(probability: number, roundNum: number, probabilityProp: number = 0) {
        [this.probability, this.roundNum, this.probabilityProp] = [probability, roundNum + 1, probabilityProp];
    }
}
/**
 * 使敌人冰冻僵硬
 */
export class Stiff_Frozen {
    name: string = 'Stiff_Frozen';
    probability: number; // 冰冻几率
    roundNum: number; // 僵硬回合数
    probabilityProp: number; // 每级提升触发几率
    triggerRound: Target = Target.self; // 触发回合
    skillType: SkillType = SkillType.DEBUFF;

    constructor(probability: number, roundNum: number, probabilityProp: number = 0) {
        [this.probability, this.roundNum, this.probabilityProp] = [probability, roundNum + 1, probabilityProp];
    }
}

/**
 * 使敌人减少力量
 */
export class ReducePower {
    name: string = 'ReducePower';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    roundNum: number; // 持续时间
    triggerRound: Target = Target.self; // 触发回合
    skillType: SkillType = SkillType.DEBUFF;

    constructor(probability: number, efficiency: number, roundNum: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.roundNum, this.probabilityProp, this.efficiencyProp] = [probability, efficiency, roundNum, probabilityProp, efficiencyProp];
    }
}

/**
 * 闪避伤害
 */
export class Dodge {
    name: string = 'Dodge';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%
    removeDeBuff: boolean; // 是否移除debuff
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    triggerRound: Target = Target.enemy; // 触发回合
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, removeDeBuff: boolean = false, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.removeDeBuff, this.probabilityProp, this.efficiencyProp] = [probability, efficiency, removeDeBuff, probabilityProp, efficiencyProp];
    }
}

/**
 * 增加攻击力
 */
export class IncreasePower {
    name: string = 'IncreasePower';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%
    roundNum: number; // 持续回合数
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    triggerRound: Target = Target.self; // 触发回合
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, roundNum: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.roundNum, this.probabilityProp, this.efficiencyProp] = [probability, efficiency, roundNum, probabilityProp, efficiencyProp];
    }
}

// 回复已损失生命值
export class IncreaseBlood {
    name: string = 'IncreaseBlood';
    probability: number; // 触发几率 0.5表示50%的
    bloodCondition: number; // 0.3表示生命值低于30%
    efficiency: number; // 效率 0.5表示50%
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    triggerRound: Target = Target.enemy; // 触发回合
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, bloodCondition: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.bloodCondition, this.probabilityProp, efficiencyProp] = [probability, efficiency, bloodCondition, probabilityProp, efficiencyProp];
    }
}

// 攻击异常状态,增加伤害
export class AttackAbnormal {
    name: string = 'AttackAbnormal';
    probability: number; // 触发几率 0.5表示50%的
    efficiency: number; // 效率 0.5表示50%
    probabilityProp: number; // 每级提升触发几率
    efficiencyProp: number; // 每级提升效率
    abnormal: string;
    roundNum: number;
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, efficiency: number, abnormal: string, roundNum: number, probabilityProp: number = 0, efficiencyProp: number = 0) {
        [this.probability, this.efficiency, this.abnormal, this.roundNum, this.probabilityProp, this.efficiencyProp] = [probability, efficiency, abnormal, roundNum, probabilityProp, efficiencyProp];
    }
}

// 使敌人沉默，无法发动任何技能
export class Silent {
    name: string = 'Silent';
    probability: number; // 触发几率 0.5表示50%的
    roundNum: number; // 持续回合数
    probabilityProp: number; // 每级提升触发几率
    skillType: SkillType = SkillType.DEBUFF;

    constructor(probability: number, roundNum: number, probabilityProp: number = 0) {
        [this.probability, this.roundNum, this.probabilityProp] = [probability, roundNum, probabilityProp];
    }
}

// 免疫状态
export class ImmuneSkill {
    name: string = 'ImmuneSkill';
    probability: number; // 触发几率 0.5表示50%的
    probabilityProp: number; // 每级提升触发几率
    immuneSkill: string[];
    roundNum: number;
    skillType: SkillType = SkillType.BUFF;

    constructor(probability: number, immuneSkill: string[], roundNum: number, probabilityProp: number = 0) {
        [this.probability, this.roundNum, this.immuneSkill, this.probabilityProp] = [probability, roundNum, immuneSkill, probabilityProp];
    }
}