import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingComponent } from '../setting/setting.component';
import { getPet, pet } from '../../data-source/pet/pet.component';
import { isEmpty, rmFloatPoint, isHappen, copy } from 'src/app/common-tool';
import { SkillAttr } from 'src/app/data-source/skill/skill.component';


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


    constructor(
        public dialogRef: MatDialogRef<SettingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: petsITFS) {
        this.pet_my = getPet(data.petInfo_my.petguid);
        this.pet_Enemy = getPet(data.petInfo_Enemy.petguid);
    }

    ngOnInit() {
        console.log('开始打架');
        console.log(this.pet_my);
        console.log(this.pet_Enemy);
    }

    getTarget(target: number) {
        return target === 1 ? 'pet_my' : 'pet_Enemy';
    }

    attackt() {
        console.log(`发动攻击`);
        let hurt: number = 0; // 此次攻击造成的伤害
        let cure: number = 0; // 造成的治疗量
        let power: number = this.getPower(this.pet_my); // 攻击力
        hurt = parseInt(copy(power));

        this.doSkill(this.pet_Enemy.passiveSkills, 'Dodge', (skill: SkillAttr) => { // 闪避计算
            hurt = rmFloatPoint(hurt * (1 - skill.Dodge.efficiency));
        })
        
        if (hurt > 0) {
            this.pet_Enemy.current_HP -= hurt;
            console.log(`${this.pet_Enemy.name} 受到 ${hurt} 点伤害`);

            this.doSkill(this.pet_my.passiveSkills, 'Bleeding', (skill: SkillAttr) => { // 流血计算
                console.log(`${this.pet_Enemy.name} 进入流血状态`)
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
                })
            })

            if (this.isDead(this.pet_Enemy)) {
                console.log(`${this.pet_Enemy.name} 已死亡`);
                return;
            }
        }

        this.afterAttackt();
        console.log(`${this.pet_Enemy.name} 生命值 ${this.pet_Enemy.current_HP}/${this.pet_Enemy.HP}`)
    }

    isDead(pet: pet): boolean {
        if (pet.current_HP <= 0) {
            pet.current_HP = 0;
            return true;
        }
        return false;
    }

    afterAttackt() {
        for (const debuff of this.pet_Enemy.debuff) {
            if (!isEmpty(debuff.bleeding)) {
                this.pet_Enemy.current_HP -= debuff.bleeding;
                debuff.currentRound++;
                console.log(`流血效果，失去 ${debuff.bleeding} 点生命值`);
            }
            if (!isEmpty(debuff.seriousInjury)) {
                debuff.currentRound++;
            }
        }
        this.checkBuff(this.pet_Enemy);
        this.checkBuff(this.pet_my);
    }

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
            power = rmFloatPoint(power * skill.ViolentAttack.hurtNum) 
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

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}