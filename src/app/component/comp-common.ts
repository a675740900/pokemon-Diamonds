import { getIcon, getNameZh } from "../home/common-tool";

// 介绍数组类型
export class IntroduceList_buff {
    title: string;
    description: string;
    detailed: string;
    url?: string;

    constructor(name: string, description: string, detailed: string, url: string = '') {
        [this.title, this.description, this.detailed, this.url] = [getNameZh(name), description, detailed, getIcon(name)];
    }
}

// 介绍数组类型
export class IntroduceList {
    title: string;
    description: string;
    detailed: string;
    url?: string;

    constructor(title: string, description: string, detailed: string) {
        [this.title, this.description, this.detailed] = [title, description, detailed];
    }
}

// 宠物介绍卡片类
export class PetIntroduce {
    title: string; // 表体
    subtitle: string; // 字幕
    url: string; // 宠物图片路径

    constructor(title: string, subtitle: string, url: string) {
        [this.title, this.subtitle, this.url] = [title, subtitle, url];
    }
}