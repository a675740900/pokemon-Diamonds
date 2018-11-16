import { pet, Buff } from "../../data-source/pet/pet.component";
import { isEmpty, isHappen } from "../../common-tool";
import { SkillAttr } from "../../data-source/skill/skill.component";

export const getLifeStr = (pet: pet): string => {
    return `${pet.name} 当前生命值 ${pet.current_HP}/${pet.HP}`;
}

export const getStiffIndex = (pet: pet): number => {
    return pet.debuff.findIndex((debuff: Buff) =>
        !isEmpty(debuff.stiff) || debuff.stiff
    );
}

// 判断是否处于僵硬状态
export const isStiff = (pet: pet): boolean => {
    return getStiffIndex(pet) > -1;
}

// 是否沉默
export const isAilent = (pet: pet): boolean => {
    return pet.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.ailent) || debuff.ailent) > -1;
}

// 是否重伤
export const isSeriousInjury = (pet: pet): boolean => {
    return pet.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.seriousInjury) && debuff.seriousInjury > 0) > -1
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
    const buffIndex: number = getBuffIndex(pet[buffType], buffName);
    if (buffIndex > -1) pet[buffType][buffIndex].currentRound++;
}