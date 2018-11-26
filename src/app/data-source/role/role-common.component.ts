/**
 * 角色生成类
 */
export class Role {
    roleguid: string; // 角色编号
    name: string; // 名称
    HP: number; // 血量
    power: number; // 力量
    magic: number; // 魔法
    defenses: number; // 防御力
    skill: any[]; // 技能组

    constructor(roleguid: string) {
        [this.roleguid] = [roleguid];
    }
}

