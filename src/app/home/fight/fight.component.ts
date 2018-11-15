import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { getPet, pet, Buff } from '../../data-source/pet/pet.component';
import { isEmpty, rmFloatPoint, isHappen, copy } from 'src/app/common-tool';
import { SkillAttr } from 'src/app/data-source/skill/skill.component';
import { getLifeStr } from './fight-common';

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

    constructor(
        public dialogRef: MatDialogRef<SettingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: petsITFS) {
        this.pet_my = getPet(data.petInfo_my.petguid);
        this.pet_Enemy = getPet(data.petInfo_Enemy.petguid);
        this.checkRestraint(this.pet_my, this.pet_Enemy);
        this.pet_my.isRound = true;
        this.pet_Enemy.isRound = false;
    }

    ngOnInit() {
        console.log('开始打架');
        console.log(this.pet_my);
        console.log(this.pet_Enemy);
    }

    checkRestraint(pet1: pet, pet2: pet) {
        const restraintNum: number = Math.abs(pet1.pettype - pet2.pettype);
        if (restraintNum == 1 || restraintNum == 4) {
            if ((pet1.pettype > pet2.pettype && pet2.pettype != 0) || (restraintNum == 4 && pet1.pettype == 0)) {
                pet1.buff.push({
                    increasePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
                pet2.debuff.push({
                    reducePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
            } else {
                pet2.buff.push({
                    increasePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
                pet1.debuff.push({
                    reducePower: 0.2,
                    roundNum: 99,
                    currentRound: 0
                })
            }
        }
    }

    getTarget(target: number) {
        return target === 1 ? 'pet_my' : 'pet_Enemy';
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
        console.log(`------------第 ${this.current_roundNum} 回合------------`)
        console.log(`${pet_atta.name} 发动攻击`);
        let hurt: number = 0; // 此次攻击造成的伤害
        let cure: number = 0; // 造成的治疗量
        let power: number = this.getPower(pet_atta); // 攻击力
        hurt = parseInt(copy(power));

        this.doSkill(pet_beAtta, 'Dodge', (skill: SkillAttr) => { // 闪避计算
            const oldHurt: number = copy(hurt);
            hurt = rmFloatPoint(hurt * (1 - skill.Dodge.efficiency));
            console.log(`${pet_beAtta.name} 闪避伤害 ${oldHurt - hurt}`)
        })

        if (hurt > 0) {
            const causeHurt = this.toAttack(pet_beAtta, hurt);

            if (this.isDead(pet_beAtta)) {
                return;
            }

            // 吸血
            this.doSkill(pet_atta, 'BloodSucking', (skill: SkillAttr) => {
                let bloodSuckingNum: number = rmFloatPoint(causeHurt * skill.BloodSucking.efficiency);
                const seriousInjuryBuffIndex: number = pet_atta.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.seriousInjury));
                let str: string = '';
                if (seriousInjuryBuffIndex > -1) {
                    str = `重伤效果，治疗效率降低 ${rmFloatPoint(pet_atta.debuff[seriousInjuryBuffIndex].seriousInjury * 100)}%`;
                    bloodSuckingNum = rmFloatPoint(bloodSuckingNum * pet_atta.debuff[seriousInjuryBuffIndex].seriousInjury)
                    pet_atta.debuff[seriousInjuryBuffIndex].currentRound++;
                }
                this.bloodRecovery(pet_atta, bloodSuckingNum);
                console.log(`${pet_atta.name} ${str }治疗 ${bloodSuckingNum}`);
            });

            // 僵硬
            this.doSkill(pet_atta, 'Stiff', (skill: SkillAttr) => {
                console.log(`${pet_beAtta.name} 进入僵硬状态`);
                pet_beAtta.debuff.push({
                    stiff: true,
                    roundNum: skill.Stiff.roundNum,
                    currentRound: 0
                })
            })

            // 流血
            this.doSkill(pet_atta, 'Bleeding', (skill: SkillAttr) => { // 流血计算
                console.log(`${pet_beAtta.name} 进入流血状态`)
                const bleedingNum = rmFloatPoint(pet_beAtta.HP * skill.Bleeding.efficiency)
                pet_beAtta.debuff.push({
                    bleeding: bleedingNum,
                    roundNum: skill.Bleeding.roundNum,
                    currentRound: 0,
                }, {
                    seriousInjury: skill.Bleeding.seriousInjury,
                    roundNum: skill.Bleeding.roundNum,
                    currentRound: 0,
                }
                )
            })

            // 减少攻击力
            this.doSkill(pet_atta, 'ReducePower', (skill: SkillAttr) => {
                console.log(`${pet_beAtta.name} 减少攻击力`);
                pet_beAtta.debuff.push({
                    reducePower: skill.ReducePower.efficiency,
                    roundNum: skill.ReducePower.roundNum,
                    currentRound: 0
                })
            })

            // 生成护盾
            this.doSkill(pet_atta, 'ShieldFromAttack', (skill: SkillAttr) => {
                const shield: number = rmFloatPoint(causeHurt * skill.ShieldFromAttack.efficiency);
                pet_atta.shield = rmFloatPoint(pet_atta.shield + shield);
            })

            // 回复已损失生命值百分比血量
            this.doSkill(pet_atta, 'IncreaseBlood', (skill: SkillAttr) => {
                const bloodPercentage: number = rmFloatPoint(pet_atta.current_HP / pet_atta.HP);
                if (bloodPercentage <= skill.IncreaseBlood.bloodCondition) {
                    const lostBlood: number = rmFloatPoint(pet_atta.HP - pet_atta.current_HP);
                    let cure: number = rmFloatPoint(lostBlood * skill.IncreaseBlood.efficiency);
                    let obj: any = this.getBloodFromSeriousInjury(pet_atta, cure);
                    let seriousInjuryStr: string = '';
                    if (obj.isSeriousInjury) {
                        seriousInjuryStr = `（重伤效果）`;
                    }
                    this.bloodRecovery(pet_atta, cure);
                    console.log(`艾草发动终极奥义！回复 ${cure} 点HP ${seriousInjuryStr}`)
                }
            })
        }

        this.afterAttack(pet_beAtta);
        this.afterAttack(pet_atta);
        if (this.isDead(pet_beAtta)) {
            return;
        }
        console.log(getLifeStr(pet_atta));
        console.log(getLifeStr(pet_beAtta));
        console.log('------------回合结束------------')
        
        this.setRound();
    }

    getBloodFromSeriousInjury(pet: pet, cure: number): any {
        let obj: any = {};
        const debuff: Buff = pet.debuff.find((debuff: Buff) => !isEmpty(debuff.seriousInjury) && debuff.seriousInjury > 0);
        if (!isEmpty(debuff)) {
            cure = cure * (1 - debuff.seriousInjury);
            obj.isSeriousInjury = true;
            console.log(`重伤效果，回复 ${cure} 点HP`);
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
    toAttack(pet: pet, hurtNum: number): number {
        let hurt: number = copy(hurtNum);

        this.doSkill(pet, 'ReduceInjury', (skill: SkillAttr) => {
            hurt = rmFloatPoint(hurt * (1 - skill.ReduceInjury.efficiency));
        })

        if (!isEmpty(pet.shield) && pet.shield > 0) {
            const oldShield: number = copy(pet.shield);
            const nowShield = rmFloatPoint(pet.shield - hurtNum);
            if (nowShield < 0) {
                console.log(`${pet.name} 护盾抵挡 ${oldShield}`);
                hurt = rmFloatPoint(0 - nowShield);
                pet.shield = 0;
            } else {
                pet.shield = nowShield;
                console.log(`${pet.name} 护盾抵挡 ${oldShield - pet.shield}`)
                hurt = 0;
            }
        }

        this.bloodLose(pet, hurt);
        console.log(`${pet.name} 受到 ${hurt} 点HP伤害`);
        return hurt;
    }

    setRound() {
        const stiffIndex_my = this.pet_my.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.stiff));
        const stiffIndex_Enemy = this.pet_Enemy.debuff.findIndex((debuff: Buff) => !isEmpty(debuff.stiff));
        if (!this.pet_my.isRound && stiffIndex_my > -1) {
            this.pet_my.debuff[stiffIndex_my].currentRound++;
            console.log(`${this.pet_my.name} 僵住，跳过一回合`);
            console.log('------------回合结束-----------')
        } else if (!this.pet_Enemy.isRound && stiffIndex_Enemy > -1) {
            this.pet_Enemy.debuff[stiffIndex_Enemy].currentRound++;
            console.log(`${this.pet_Enemy.name} 僵住，跳过一回合`);
            console.log('------------回合结束-----------')
        } else {
            this.pet_my.isRound = !this.pet_my.isRound;
            this.pet_Enemy.isRound = !this.pet_Enemy.isRound;
        }

        if (this.pet_Enemy.isRound) {
            setTimeout(() => {
                this.attack(this.pet_Enemy, this.pet_my);
            }, 1000);
        }
        this.current_roundNum++;
    }

    isDead(pet: pet): boolean {
        if (pet.current_HP === 0) {
            console.log(getLifeStr(pet));
            console.log(`${pet.name} 已死亡`);
            return true;
        }
        return false;
    }

    // 检查buff效果
    afterAttack(pet: pet) {
        for (const debuff of pet.debuff) {
            if (pet.isRound) {

            } else {
                if (!isEmpty(debuff.bleeding)) {
                    this.bloodLose(pet, debuff.bleeding);
                    console.log(`流血效果，失去 ${debuff.bleeding} 点HP`);
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
                pet.buff.splice(i);
            }
        }
        for (let i = 0; i < pet.debuff.length; i++) {
            if (pet.debuff[i].currentRound >= pet.debuff[i].roundNum) {
                pet.debuff.splice(i);
            }
        }
    }

    // 获取当前攻击的攻击力
    getPower(pet: pet): number {
        let power: number = copy(pet.power);
        this.doSkill(pet, 'IncreasePower', (skill: SkillAttr) => {
            pet.buff.push({
                increasePower: skill.IncreasePower.efficiency,
                roundNum: skill.IncreasePower.roundNum,
                currentRound: 0
            })
        });

        for (const buff of pet.buff) {
            if (!isEmpty(buff.increasePower)) { // 是否存在增加攻击力的buff
                power = rmFloatPoint(power + (pet.power * buff.increasePower));
                buff.currentRound++;
            }
        }
        for (const debuff of pet.debuff) {
            if (!isEmpty(debuff.reducePower)) { // 是否存在减少攻击力的debuff
                power = rmFloatPoint(power - (pet.power * debuff.reducePower));
                debuff.currentRound++;
            }
        }
        this.doSkill(pet, 'ViolentAttack', (skill: SkillAttr) => { // 暴击
            power = rmFloatPoint(power * skill.ViolentAttack.hurtNum); // 攻击力✖️暴击伤害
        });
        return power;
    }

    doSkill(pet: pet, skillName: string, func: Function) {
        const skill: SkillAttr = pet.passiveSkills.find((skill: SkillAttr) => !isEmpty(skill[skillName]));
        if (!isEmpty(skill) && pet.level >= skill.level) {
            const isHap: boolean = isHappen(skill[skillName].probability);
            if (isHap) func(skill);
        }
    }
}