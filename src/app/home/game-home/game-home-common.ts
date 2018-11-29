import { Pet } from "../../data-source/pet/pet.component";

export interface MenuInfo {
    show: boolean;
}

export interface PlayerInfoITFS {
    bags: BagITFS[]; // 背包
    pets: Pet[];
}

// 背包
export interface BagITFS {

}