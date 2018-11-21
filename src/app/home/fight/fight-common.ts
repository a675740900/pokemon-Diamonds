import { pet, Buff } from "../../data-source/pet/pet.component";
import { isEmpty, isHappen, rmFloatPoint } from "../common-tool";
import { SkillAttr } from "../../data-source/skill/skill.component";

export interface petsITFS {
    petInfo_my: petInfo;
    petInfo_Enemy: petInfo;
}

export interface petInfo {
    petguid: number;
    level: number;
    grade: number;
}

export interface PetDatasITFS {
    my: PetDataITFS;
    enemy: PetDataITFS;
}

export interface PetDataITFS {
    isAttack?: boolean; // 是否攻击过了
    isRound?: boolean; // 当前是否为自己回合
}

// 宠物buff图标
export class petBuffIcon {
    url: string;
    name: string;
    num: number = 1;

    constructor(url: string, name: string) {
        [this.url, this.name] = [url, name];
    }
}

export const getLifeStr = (pet: pet): string => {
    return `${pet.name} 当前生命值 ${pet.current_HP}/${pet.HP}`;
}

export const getStiffIndex = (pet: pet): number => {
    return pet.debuff.findIndex((debuff: Buff) =>
        debuff.Stiff_Stone || debuff.Stiff_Twining
    );
}

// 判断是否处于僵硬状态
export const isStiff = (pet: pet): boolean => {
    return getStiffIndex(pet) > -1;
}

// 是否沉默
export const isAilent = (pet: pet): boolean => {
    return pet.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.Ailent) || debuff.Ailent) > -1;
}

// 是否重伤
export const isSeriousInjury = (pet: pet): boolean => {
    return pet.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.SeriousInjury) && debuff.SeriousInjury > 0) > -1
}

// 判断是否死亡
export const isDead = (pet: pet): boolean => {
    if (pet.current_HP === 0) {
        console.log(getLifeStr(pet));
        console.log(`${pet.name} 已死亡`);
        return true;
    }
    return false;
}

/**
 * 使用概率性技能
 * @param pet 
 * @param skillName 技能名称
 * @param func 技能出发后要执行的方法
 */
export const doSkill = (pet: pet, skillName: string, func: Function) => {
    if (isAilent(pet)) return;
    const skill: SkillAttr = pet.passiveSkills.find((skill: SkillAttr) => !isEmpty(skill[skillName]));
    if (!isEmpty(skill) && pet.level >= skill.level) {
        const isHap: boolean = isHappen(skill[skillName].probability);
        if (isHap) func(skill);
    }
}

/**
 * 获取buff在buff数组中的下标
 * @param buffs 
 * @param buffName 
 */
export const getBuffIndex = (buffs: Buff[], buffName: string): number => {
    return buffs.findIndex((buff: Buff) => !isEmpty(buff[buffName]));
}

/**
 * 增加buff回合数
 * @param pet 
 * @param buffType buff类型 --> buff 或 debuff
 * @param buffName 
 */
export const addCurrentRound = (pet: pet, buffType: string, buffName: string) => {
    for (const buff of pet[buffType]) {
        if (!isEmpty(buff[buffName])) {
            buff.currentRound++;
        }
    }
}

/**
 * 计算护甲后的伤害
 * @param defenses 护甲值
 * @param hurt 受到的伤害
 */
export const DefensesOperation = (defenses: number, hurt: number): number => {
    const defenseProportion: number = 100; // 100表示每一点护甲能，就需要受到200%最大生命值的伤害才能死亡
    return rmFloatPoint((defenseProportion * hurt) / (defenseProportion + defenses));
}

// buff图标是否已存在
export const getIconIndex = (buffName: string, icons: petBuffIcon[]): number => {
    return icons.findIndex((icon: petBuffIcon) => icon.name === buffName);
}

// 是否免疫
export const isImmune = (pet: pet, skill: SkillAttr): boolean => {
    let isImmune: boolean = false;
    // 免疫
    doSkill(pet, 'ImmuneSkill', (skill2: SkillAttr) => {
        if (skill2.ImmuneSkill.immuneSkill.includes(skill.Bleeding.name)) {
            isImmune = true;
            console.log(`${pet.name} 免疫 ${skill.skillTip}`);
        }
    })
    return isImmune;
}
