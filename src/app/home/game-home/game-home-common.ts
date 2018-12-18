import { Pet } from "../../data-source/pet/pet.component";
import { Map } from "../../data-source/map/map-common"

export interface MenuInfo {
    show: boolean;
}

export interface PlayerInfoITFS {
    bags: Bag[]; // 背包
    pets: Pet[];
    maps: Map[];
}

// 背包
export interface Bag {

}