
import { Pet } from "src/app/data-source/pet/pet.component";
import { rmFloatPoint } from "../../home/common-tool";

// 经验系统公共区

// 一级宠物升级所需经验
const initEXPToUp: number = 50;

// 每级提升升级所需经验
const EXPPerGradeToUp: number = 0.25;

// 击杀一级宠物获得经验
const initExpFromKill: number = rmFloatPoint(initEXPToUp / 2);

// 每级击杀经验
const EXPPerGradeFromKill: number = rmFloatPoint(EXPPerGradeToUp / 5, 4);

// 击杀比自己等级高的宠物，获得经验根据每级百分比增加
const EXPFromHigherGrade: number = 0.2;

// 击杀比自己等级低的宠物，获得经验根据每级百分比减少
const EXPFromLowerGrade: number = 0.05;

const getEXP = (pet: Pet): number => {
    return initEXPToUp + pet.grade * (initEXPToUp * EXPPerGradeToUp);
}

// 击杀宠物获得的经验
export const getEXPFromKill = (pet_atta: Pet, pet_beAtta: Pet): number => {
    let Exp: number = getEXP(pet_beAtta);

    if (pet_atta.grade > pet_beAtta.grade) {
        Exp = Exp * (1 - (EXPFromLowerGrade * (pet_atta.grade - pet_beAtta.grade)));
    } else {
        Exp = Exp * (1 + (EXPFromHigherGrade * (pet_beAtta.grade - pet_atta.grade)));
    }
    return Exp;
}