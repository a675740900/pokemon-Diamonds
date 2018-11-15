import { pet } from "../../data-source/pet/pet.component";

export const getLifeStr = (pet: pet): string => {
    return `${pet.name} 当前生命值 ${pet.current_HP}/${pet.HP}`;
}