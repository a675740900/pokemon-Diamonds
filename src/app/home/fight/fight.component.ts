import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { getPet, pet } from '../../data-source/pet/pet.component';
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
    current_petRound: string;

    constructor(
        public dialogRef: MatDialogRef<SettingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: petsITFS) {
        this.pet_my = getPet(data.petInfo_my.petguid);
        this.pet_Enemy = getPet(data.petInfo_Enemy.petguid);
        this.pet_my.isRound = true;
        this.pet_Enemy.isRound = false;
    }

    ngOnInit() {
        console.log('开始打架');
        console.log(this.pet_my);
        console.log(this.pet_Enemy);
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
        console.log(`${pet_atta.name} 发动攻击`);
        let hurt: number = 0; // 此次攻击造成的伤害
        let cure: number = 0; // 造成的治疗量
        let power: number = this.getPower(pet_atta); // 攻击力
        hurt = parseInt(copy(power));

        this.doSkill(pet_beAtta.passiveSkills, 'Dodge', (skill: SkillAttr) => { // 闪避计算
            const oldHurt: number = copy(hurt);
            hurt = rmFloatPoint(hurt * (1 - skill.Dodge.efficiency));
            console.log(`${pet_beAtta.name} 闪避伤害 ${oldHurt - hurt}`)
        })

        if (hurt > 0) {
            this.toAttack(pet_beAtta, hurt);

            if (this.isDead(pet_beAtta)) {
                return;
            }

            this.doSkill(pet_atta.passiveSkills, 'Bleeding', (skill: SkillAttr) => { // 流血计算
                console.log(`${pet_beAtta.name} 进入流血状态`)
                const target: string = this.getTarget(skill.Bleeding.target);
                const bleedingNum = rmFloatPoint(this[target].HP * skill.Bleeding.efficiency)
                this[target].debuff.push({
                    bleeding: bleedingNum,
                    roundNum: skill.Bleeding.roundNum,
                    currentRound: 0,
                }, {
                        seriousInjury: true,
                        roundNum: skill.Bleeding.roundNum,
                        currentRound: 0,
                    }
                )
            })
        }

        this.afterAttack(pet_beAtta);
        if (this.isDead(pet_beAtta)) {
            return;
        }
        console.log(getLifeStr(pet_beAtta));
        // this.setRound();
    }

    // 宠物受到攻击
    toAttack(pet: pet, hurtNum: number) {
        let hurt: number = copy(hurtNum);
        for (const buff of pet.buff) {
            if (!isEmpty(buff.shield) && buff.shield > 0) {
                const oldShield: number = copy(buff.shield);
                buff.shield = rmFloatPoint(buff.shield - hurtNum);
                if (buff.shield < 0) {
                    console.log(`${pet.name} 护盾抵挡 ${oldShield}`);
                    hurt = rmFloatPoint(0 - buff.shield);
                    buff.shield = 0;
                } else {
                    console.log(`${pet.name} 护盾抵挡 ${oldShield - buff.shield}`)
                    hurt = 0;
                }
            }
        }
        pet.current_HP = pet.current_HP - hurt;
        console.log(`${pet.name} 受到 ${hurt} 点生命值伤害`);
    }

    setRound() {
        this.pet_my.isRound = !this.pet_my.isRound;
        this.pet_Enemy.isRound = !this.pet_Enemy.isRound;
    }

    isDead(pet: pet): boolean {
        if (pet.current_HP <= 0) {
            pet.current_HP = 0;
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
                if (!isEmpty(debuff.seriousInjury)) { // 重伤效果要自己回合过后才能算一回合
                    debuff.currentRound++;
                }
            } else {
                if (!isEmpty(debuff.bleeding)) {
                    pet.current_HP -= debuff.bleeding;
                    console.log(`流血效果，失去 ${debuff.bleeding} 点生命值`);
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
        let power: number = pet.power;
        for (const buff of pet.buff) {
            if (!isEmpty(buff.increasePower)) { // 是否存在增加攻击力的buff
                power = rmFloatPoint(power * (1 + buff.increasePower));
            }
        }
        for (const debuff of pet.debuff) {
            if (!isEmpty(debuff.reducePower)) { // 是否存在减少攻击力的debuff
                power = rmFloatPoint(power * (1 - debuff.reducePower));
            }
        }
        this.doSkill(pet.passiveSkills, 'ViolentAttack', skill => { // 暴击
            power = rmFloatPoint(power * skill.ViolentAttack.hurtNum); // 攻击力✖️暴击伤害
        });
        return power;
    }

    doSkill(skills: SkillAttr[], skillName: string, func: Function) {
        const skillIndex: number = skills.findIndex(skill => !isEmpty(skill[skillName]));
        if (skillIndex > -1) {
            const isHap: boolean = isHappen(skills[skillIndex][skillName].probability);
            if (isHap) func(skills[skillIndex]);
        }
    }
}