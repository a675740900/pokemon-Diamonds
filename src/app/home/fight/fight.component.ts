import { Component, OnInit, Inject, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { getPet, pet, Buff, getLevelProp, LevelPropITFS } from '../../data-source/pet/pet.component';
import { isEmpty, rmFloatPoint, copy, toPercentage } from '../common-tool';
import { SkillAttr, SkillTip } from 'src/app/data-source/skill/skill.component';
import { getLifeStr, isStiff, getStiffIndex, doSkill, isDead, addCurrentRound, DefensesOperation } from './fight-common';

export interface petsITFS {
    petInfo_my: petInfo;
    petInfo_Enemy: petInfo;
}

export interface petInfo {
    petguid: number;
    level: number;
    grade: number;
}

@Component({
    selector: 'app-fight',
    templateUrl: './fight.component.html',
    styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
    pet_my: pet;
    pet_Enemy: pet;
    current_roundNum: number = 1;
    @ViewChild('pet_my_span') pet_my_span: ElementRef;

    constructor(
        public dialogRef: MatDialogRef<SettingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: petsITFS, private renderer: Renderer2) {
        this.pet_my = getPet(data.petInfo_my.petguid);
        this.pet_Enemy = getPet(data.petInfo_Enemy.petguid);

        this.reSetPet(this.pet_my, data.petInfo_my);
        this.reSetPet(this.pet_Enemy, data.petInfo_Enemy);

        this.setGrade(this.pet_my);
        this.setGrade(this.pet_Enemy);

        this.checkRestraint(this.pet_my, this.pet_Enemy);
        this.pet_my.isRound = true;
        this.pet_Enemy.isRound = false;
    }

    ngOnInit() {
        console.log('开始打架');
        console.log(this.pet_my);
        console.log(this.pet_Enemy);
    }

    reSetPet(pet: pet, petInfo: petInfo) {
        pet.grade = petInfo.grade;
        pet.level = petInfo.level;
    }

    setGrade(pet: pet) {
        const levelProp: LevelPropITFS[] = getLevelProp();
        pet.current_HP = pet.HP = this.getAttrNum(pet, 'HP', levelProp);
        pet.MP = this.getAttrNum(pet, 'MP', levelProp);
        pet.power = this.getAttrNum(pet, 'power', levelProp);
        pet.defenses = this.getAttrNum(pet, 'defenses', levelProp);

        for (const skill of pet.passiveSkills) {
            for (const skillName in skill) {
                if (!isEmpty(skill[skillName].efficiencyProp)) {
                    skill[skillName].efficiency = rmFloatPoint(skill[skillName].efficiency + skill[skillName].efficiencyProp * pet.grade, 2);
                }
                if (!isEmpty(skill[skillName].probabilityProp)) {
                    skill[skillName].probability = rmFloatPoint(skill[skillName].probability + skill[skillName].probabilityProp * pet.grade, 2);
                }
            }
        }
    }

    getAttrNum(pet: pet, lowerStr: string, levelProp: LevelPropITFS[]): number {
        return rmFloatPoint((pet[lowerStr] + pet[`${lowerStr}Prop`] * (pet.grade - 1)) * (1 + levelProp[pet.level][`${lowerStr}Prop`]));
    }

    checkRestraint(pet1: pet, pet2: pet) {
        const restraintNum: number = Math.abs(pet1.pettype - pet2.pettype);
        if (restraintNum == 1 || restraintNum == 4) {
            if ((pet1.pettype > pet2.pettype && pet2.pettype != 0) || (restraintNum == 4 && pet1.pettype == 0)) {
                pet1.buff.push({
                    IncreasePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
                pet2.debuff.push({
                    ReducePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
            } else {
                pet2.buff.push({
                    IncreasePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
                pet1.debuff.push({
                    ReducePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
            }
        }
    }

    attack_click() {
        this.attack(this.pet_my, this.pet_Enemy);
    }

    /**
     * 攻击
     * @param pet_atta 发动攻击的宠物
     * @param pet_beAtta 被攻击的宠物
     */
    attack(pet_atta: pet, pet_beAtta: pet) {
        console.log(`------------第 ${this.current_roundNum} 回合------------`);
        let hurt: number = 0; // 此次攻击造成的伤害
        let power: number = this.getPower(pet_atta); // 攻击力

        hurt = parseInt(copy(power));
        let violentAttackStr: string = '';
        doSkill(pet_atta, 'ViolentAttack', (skill: SkillAttr) => { // 暴击
            hurt = rmFloatPoint(power * (1 + skill.ViolentAttack.efficiency)); // 攻击力✖️暴击伤害
            violentAttackStr = `暴击！ `;
            pet_atta.buff.push({
                IncreaseBleedingProbability: skill.ViolentAttack.IncreaseBleedingProbability,
                roundNum: 1,
                currentRound: 1
            })
        });

        console.log(`${pet_atta.name} 发动攻击 ${violentAttackStr}${hurt}`);

        doSkill(pet_atta, 'Ailent', (skill: SkillAttr) => {
            pet_beAtta.debuff.push({
                Ailent: true,
                roundNum: skill.Ailent.roundNum,
                currentRound: 0
            })
            console.log(`${pet_beAtta.name} ${skill.skillTip}`);
        })

        // 僵硬的敌人无法闪避
        if (!isStiff(pet_beAtta)) {
            doSkill(pet_beAtta, 'Dodge', (skill: SkillAttr) => { // 闪避计算
                const oldHurt: number = copy(hurt);
                hurt = rmFloatPoint(hurt * (1 - skill.Dodge.efficiency));
                if (skill.Dodge.removeDeBuff) pet_beAtta.debuff = [];
                console.log(`${pet_beAtta.name} ${skill.skillTip} 闪避伤害 ${oldHurt - hurt}`);
            })
        }


        if (hurt > 0) {
            const causeHurt = this.toAttack(pet_atta, pet_beAtta, hurt);

            // 吸血
            doSkill(pet_atta, 'BloodSucking', (skill: SkillAttr) => {
                let bloodSuckingNum: number = rmFloatPoint(causeHurt * skill.BloodSucking.efficiency);
                const seriousInjuryBuffIndex: number = pet_atta.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.SeriousInjury));
                let str: string = '';
                if (seriousInjuryBuffIndex > -1) {
                    str = `重伤效果，治疗效率降低 ${toPercentage(pet_atta.debuff[seriousInjuryBuffIndex].SeriousInjury)} `;
                    bloodSuckingNum = rmFloatPoint(bloodSuckingNum * pet_atta.debuff[seriousInjuryBuffIndex].SeriousInjury);
                }
                this.bloodRecovery(pet_atta, bloodSuckingNum);
                console.log(`${pet_atta.name} ${str}治疗 ${bloodSuckingNum}`);
            });

            if (isDead(pet_beAtta)) {
                return;
            }

            // 石化僵硬
            doSkill(pet_atta, 'Stiff_Stone', (skill: SkillAttr) => {
                console.log(`${pet_beAtta.name} ${skill.skillTip}，无法动弹`);
                pet_beAtta.debuff.push({
                    Stiff_Stone: true,
                    roundNum: skill.Stiff_Stone.roundNum,
                    currentRound: 0
                })
            })

            // 僵硬
            doSkill(pet_atta, 'Stiff_Tiwing', (skill: SkillAttr) => {
                console.log(`${pet_beAtta.name} ${skill.skillTip}，无法动弹`);
                pet_beAtta.debuff.push({
                    Stiff_Tiwing: true,
                    roundNum: skill.Stiff_Stone.roundNum,
                    currentRound: 0
                })
            })

            // 流血
            doSkill(pet_atta, 'Bleeding', (skill: SkillAttr) => { // 流血计算
                console.log(`${pet_beAtta.name} 进入${skill.skillTip}状态`);
                let isImmune: boolean = false; // 是否被免疫
                // 免疫
                doSkill(pet_beAtta, 'ImmuneSkill', (skill2: SkillAttr) => {
                    if (skill2.ImmuneSkill.immuneSkill.includes(skill.Bleeding.name)) {
                        isImmune = true;
                        console.log(`${pet_beAtta.name} 免疫 ${skill.skillTip}`);
                    }
                })
                if (isImmune) return;
                const bleedingNum = rmFloatPoint(pet_beAtta.HP * skill.Bleeding.efficiency);
                if (skill.skillTip == SkillTip.BLEEDING) {
                    pet_beAtta.debuff.push({
                        Bleeding: bleedingNum,
                        roundNum: skill.Bleeding.roundNum,
                        currentRound: 0,
                    }, {
                            SeriousInjury: skill.Bleeding.SeriousInjury,
                            roundNum: skill.Bleeding.roundNum,
                            currentRound: 0,
                        })
                } else if (skill.skillTip === SkillTip.POISONING) {
                    pet_beAtta.debuff.push({
                        Poisoning: bleedingNum,
                        roundNum: skill.Bleeding.roundNum,
                        currentRound: 0,
                    })
                }
            })

            // 减少攻击力
            doSkill(pet_atta, 'ReducePower', (skill: SkillAttr) => {
                console.log(`${pet_beAtta.name} ${SkillTip.EDEMA} 减少 ${toPercentage(skill.ReducePower.efficiency)} 攻击力`);
                pet_beAtta.debuff.push({
                    ReducePower: skill.ReducePower.efficiency,
                    roundNum: skill.ReducePower.roundNum,
                    currentRound: 0
                })
            })

            // 生成护盾
            doSkill(pet_atta, 'ShieldFromAttack', (skill: SkillAttr) => {
                const shield: number = rmFloatPoint(causeHurt * skill.ShieldFromAttack.efficiency);
                pet_atta.shield = rmFloatPoint(pet_atta.shield + shield);
            })

            // 回复已损失生命值百分比血量
            doSkill(pet_beAtta, 'IncreaseBlood', (skill: SkillAttr) => {
                const bloodPercentage: number = rmFloatPoint(pet_beAtta.current_HP / pet_beAtta.HP, 4);
                if (bloodPercentage <= skill.IncreaseBlood.bloodCondition) {
                    const lostBlood: number = rmFloatPoint(pet_beAtta.HP - pet_beAtta.current_HP);
                    let cure: number = rmFloatPoint(lostBlood * skill.IncreaseBlood.efficiency);
                    let obj: any = this.getBloodFromSeriousInjury(pet_beAtta, cure);
                    let seriousInjuryStr: string = '';
                    if (obj.isSeriousInjury) {
                        seriousInjuryStr = `（重伤效果）`;
                        cure = obj.cure;
                    }
                    this.bloodRecovery(pet_beAtta, cure);
                    console.log(`${pet_beAtta.name} ${skill.skillTip} 回复 ${cure} 点HP ${seriousInjuryStr}`);
                }
            })
        }

        this.afterAttack(pet_beAtta);
        this.afterAttack(pet_atta);
        if (isDead(pet_beAtta)) {
            return;
        }
        console.log(getLifeStr(pet_atta));
        console.log(getLifeStr(pet_beAtta));

        this.setRound(pet_atta, pet_beAtta);
    }

    getBloodFromSeriousInjury(pet: pet, cure: number): any {
        let obj: any = {};
        const debuff: Buff = pet.debuff.find((debuff: Buff) => !isEmpty(debuff.SeriousInjury) && debuff.SeriousInjury > 0);
        if (!isEmpty(debuff)) {
            cure = rmFloatPoint(cure * (1 - debuff.SeriousInjury));
            obj.isSeriousInjury = true;
        }
        obj.cure = cure;
        return obj;
    }

    bloodRecovery(pet: pet, blood: number) {
        const HP: number = rmFloatPoint(pet.current_HP + blood);
        if (HP <= pet.HP) {
            pet.current_HP = HP;
        }
    }

    bloodLose(pet: pet, blood: number) {
        const HP: number = rmFloatPoint(pet.current_HP - blood);
        if (HP < 0) {
            pet.current_HP = 0;
        } else {
            pet.current_HP = HP;
        }
    }

    // 宠物受到攻击
    toAttack(pet_atta: pet, pet_beAtta: pet, hurtNum: number): number {
        let hurt: number = copy(hurtNum);

        let attackAbnormalStr: string = '';
        if (isStiff(pet_beAtta)) {
            doSkill(pet_atta, 'AttackAbnormal', (skill: SkillAttr) => { // 攻击者都否有对僵住敌人造成高伤害的技能
                const oldHurt: number = copy(hurt);
                hurt = rmFloatPoint(hurt * (1 + skill.AttackAbnormal.efficiency));
                attackAbnormalStr = `${SkillTip.PETRIFACTION} 增加 ${toPercentage(skill.AttackAbnormal.efficiency)} 伤害 ${rmFloatPoint(hurt - oldHurt)} `;
            })
        }

        let reduceInjuryStr: string = '';
        let shieldStr: string = '';
        doSkill(pet_beAtta, 'ReduceInjury', (skill: SkillAttr) => {
            const oldHurt: number = copy(hurt);
            hurt = rmFloatPoint(hurt * (1 - skill.ReduceInjury.efficiency));
            reduceInjuryStr = `${skill.skillTip} 减少 ${toPercentage(skill.ReduceInjury.efficiency)} 的伤害 ${oldHurt - hurt} `;
        })
        let defensesStr: string = '';
        const oldHurt: number = copy(hurt);
        hurt = DefensesOperation(pet_beAtta.defenses, hurt);
        defensesStr = `护甲抵挡 ${rmFloatPoint(oldHurt - hurt)} `;

        if (!isEmpty(pet_beAtta.shield) && pet_beAtta.shield > 0) {
            const oldShield: number = copy(pet_beAtta.shield);
            const nowShield = rmFloatPoint(pet_beAtta.shield - hurt);
            if (nowShield < 0) {
                shieldStr = `护盾抵挡 ${oldShield} `;
                hurt = rmFloatPoint(0 - nowShield);
                pet_beAtta.shield = 0;
            } else {
                pet_beAtta.shield = nowShield;
                shieldStr = `护盾抵挡 ${oldShield - pet_beAtta.shield} `;
                hurt = 0;
            }
        }

        this.bloodLose(pet_beAtta, hurt);
        // this.createBloodTxt();
        // this.pet_my_span.nativeElement.append(-hurt);
        console.log(`${pet_beAtta.name} ${attackAbnormalStr}${defensesStr}${reduceInjuryStr}${shieldStr}受到 ${hurt} 点HP伤害`);
        return hurt;
    }

    /**
     * 交换回合
     * @param pet_atta 当前回合的pet（交换前）
     * @param pet_beAtta 
     */
    setRound(pet_atta: pet, pet_beAtta: pet) {
        this.changeRound(pet_atta, pet_beAtta);

        const stiffIndex_atta = getStiffIndex(pet_atta);
        const stiffIndex_beAtta = getStiffIndex(pet_beAtta);

        if (stiffIndex_beAtta > -1) { // 僵硬状态
            console.log(`------------第 ${this.current_roundNum} 回合------------`);
            console.log(`${pet_beAtta.name} 僵住，跳过本回合`);
            this.afterAttack(pet_atta);
            this.afterAttack(pet_beAtta);
            if (isDead(pet_atta)) {
                return;
            }
            this.changeRound(pet_atta, pet_beAtta);
        }

        // 若跳过的是自己的回合，则敌人自动攻击（因为敌人没有按钮）
        if (this.pet_Enemy.isRound) {
            setTimeout(() => {
                this.attack(this.pet_Enemy, this.pet_my);
            }, 0);
        }
        this.current_roundNum++;
    }

    changeRound(pet_atta: pet, pet_beAtta: pet) {
        pet_atta.isRound = !pet_atta.isRound;
        pet_beAtta.isRound = !pet_beAtta.isRound;
    }

    // 检查buff效果
    afterAttack(pet: pet) {
        if (pet.isRound) { // 在自己回合添加回合数
            addCurrentRound(pet, 'buff', 'IncreasePower');
            addCurrentRound(pet, 'debuff', 'Ailent');
            addCurrentRound(pet, 'debuff', 'ReducePower');
            addCurrentRound(pet, 'debuff', 'SeriousInjury');
        } else {
            addCurrentRound(pet, 'debuff', 'Stiff_Stone');
            addCurrentRound(pet, 'debuff', 'Stiff_Tiwing');
        }
        for (const debuff of pet.debuff) {
            if (pet.isRound) {

            } else {
                if (!isEmpty(debuff.Bleeding)) {
                    this.bloodLose(pet, debuff.Bleeding);
                    console.log(`流血效果，失去 ${debuff.Bleeding} 点HP`);
                    debuff.currentRound++;
                }
                if (!isEmpty(debuff.Poisoning)) {
                    this.bloodLose(pet, debuff.Poisoning);
                    console.log(`中毒，失去 ${debuff.Poisoning} 点HP`);
                    debuff.currentRound++;
                }
            }
        }
        this.checkBuff(pet);
    }

    // 检查buff效果是否结束，结束的移除
    checkBuff(pet: pet) {
        for (let i = 0; i < pet.buff.length; i++) {
            if (pet.buff[i].currentRound >= pet.buff[i].roundNum) {
                pet.buff.splice(i--, 1);
            }
        }
        for (let i = 0; i < pet.debuff.length; i++) {
            if (pet.debuff[i].currentRound >= pet.debuff[i].roundNum) {
                pet.debuff.splice(i--, 1);
            }
        }
    }

    // 获取当前攻击的攻击力
    getPower(pet: pet): number {
        let power: number = copy(pet.power);
        doSkill(pet, 'IncreasePower', (skill: SkillAttr) => {
            pet.buff.push({
                IncreasePower: skill.IncreasePower.efficiency,
                roundNum: skill.IncreasePower.roundNum,
                currentRound: 0
            })
        });

        for (const buff of pet.buff) {
            if (!isEmpty(buff.IncreasePower)) { // 是否存在增加攻击力的buff
                power = rmFloatPoint(power + (pet.power * buff.IncreasePower));
            }
        }
        for (const debuff of pet.debuff) {
            if (!isEmpty(debuff.ReducePower)) { // 是否存在减少攻击力的debuff
                power = rmFloatPoint(power - (pet.power * debuff.ReducePower));
            }
        }
        return power;
    }

    createBloodTxt() {
        let span: any = this.renderer.createElement('div');
        const text = this.renderer.createText('-9');
        this.renderer.appendChild(span, text);
        this.renderer.addClass(span, "loseBlood");
        this.renderer.selectRootElement(this.pet_my_span);
        this.renderer.appendChild(this.pet_my_span.nativeElement, span);
    }
}