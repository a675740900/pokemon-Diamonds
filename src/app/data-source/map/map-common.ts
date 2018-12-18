export class Map {
    name: string; // 地图名称
    isUnLock: boolean; // 地图是否解锁
    petGrade: number; // 怪物等级
    petLevel: number; // 怪物阶级
    
    constructor(name: string, petGrade: number, petLevel: number) {
        [this.name, this.isUnLock, this.petGrade, this.petLevel] = [name, false, petGrade, petLevel];
    }
}

const maps: Map[] = [
    new Map('草原', 1, 1),
    new Map('竹林', 3, 1),
    new Map('树林', 5, 1),
    new Map('森林', 7, 1),
    new Map('密林', 9, 1),
    new Map('暗黑森林', 12, 1),
]

// 获取全部地图
export const getMaps = (): Map[] => {
    return maps;
}