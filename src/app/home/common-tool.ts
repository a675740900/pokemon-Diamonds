import { Router } from "@angular/router";

export const isEmpty = (val: any): boolean => {
    return val === null || val === undefined || val === '';
}

export const copy = (str: any): any => {
    return JSON.parse(JSON.stringify(str));
}

export const goNewPage = (url: string, router: Router) => {
    router.navigateByUrl(url);
}

/**
 * 去除浮点误差
 * @param val 
 * @param len 小数点位数
 */
export const rmFloatPoint = (val: number, len: number = 0): number => {
    return parseFloat((val).toFixed(len));
}

/**
 * 取随机数
 * @param low 最低值 
 * @param top 最高值
 */
export const random = (low: number, top: number): number => {
    return Math.floor(Math.random() * (top - low) + low);
}

/**
 * 计算概率是否出发
 * @param prob 概率 如0.5表示50%
 */
export const isHappen = (prob: number): boolean => {
    const probNum = random(0, 100);
    return prob * 100 >= probNum;
}

// 转换过成百分比 0.5 => 50%
export const toPercentage = (num: number): string => {
    return `${rmFloatPoint(num * 100)}%`
}

export class nameToIconUrl {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        [this.name, this.url] = [name, url];
    }
}

export class nameToNameZh {
    name: string;
    namezh: string;

    constructor(name: string, namezh: string) {
        [this.name, this.namezh] = [name, namezh];
    }
}

// 英文名对应中文名
export const nameToNameZhs: nameToNameZh[] = [
    new nameToNameZh('Alient', '沉默'),
    new nameToNameZh('Bleeding', '流血'),
    new nameToNameZh('BloodSucking', '吸血'),
    new nameToNameZh('ReduceInjury', '伤害减免'),
    new nameToNameZh('IncreaseInjury', '抗性下降'),
    new nameToNameZh('IncreaseArmor', '增加护甲'),
    new nameToNameZh('ReduceArmor', '破甲'),
    new nameToNameZh('Stiff_Frozen', '冰冻'),
    new nameToNameZh('Stiff_Stone', '石化'),
    new nameToNameZh('Stiff_Sleep', '睡眠'),
    new nameToNameZh('Stiff_Twining', '缠绕'),
    new nameToNameZh('IncreasePower', '增加攻击力'),
    new nameToNameZh('Dodge', '闪避'),
    new nameToNameZh('ReducePower', '减少攻击力'),
    new nameToNameZh('SeriousInjury', '重伤'),
    new nameToNameZh('Shield', '护盾'),
    new nameToNameZh('Immune', '免疫'),
]

// 英文名对应图标
export const nameToIconUrls: nameToIconUrl[] = [
    new nameToIconUrl('Alient', 'assets/image/petBuff/alient.png'),
    new nameToIconUrl('Bleeding', 'assets/image/petBuff/bleeding.png'),
    new nameToIconUrl('ReduceInjury', 'assets/image/petBuff/defenses_up.png'),
    new nameToIconUrl('IncreaseInjury', 'assets/image/petBuff/defenses_low.png'),
    new nameToIconUrl('IncreaseArmor', 'assets/image/petBuff/resistance_up.png'),
    new nameToIconUrl('ReduceArmor', 'assets/image/petBuff/resistance_low.png'),
    new nameToIconUrl('Stiff_Frozen', 'assets/image/petBuff/frozen.png'),
    new nameToIconUrl('Stiff_Stone', 'assets/image/petBuff/stone.png'),
    new nameToIconUrl('Stiff_Sleep', 'assets/image/petBuff/sleep.png'),
    new nameToIconUrl('Stiff_Twining', 'assets/image/petBuff/twining.png'),
    new nameToIconUrl('IncreasePower', 'assets/image/petBuff/power_up.png'),
    new nameToIconUrl('ReducePower', 'assets/image/petBuff/power_low.png'),
    new nameToIconUrl('SeriousInjury', 'assets/image/petBuff/seriousinjury.png'),
    new nameToIconUrl('Shield', 'assets/image/petBuff/shield.png'),
    new nameToIconUrl('Sleep', 'assets/image/petBuff/sleep.png'),
]

// 获取图标地址
export const getIcon = (buffName: string): string => {
    const icon: nameToIconUrl = nameToIconUrls.find((iconToUrl: nameToIconUrl) => iconToUrl.name === buffName);
    if (!isEmpty(icon)) {
        return icon.url;
    } else {
        return '';
    }
}

// 获取状态中文名
export const getNameZh = (buffName: string): string => {
    const namezh: nameToNameZh = nameToNameZhs.find((nameZh: nameToNameZh) => nameZh.name === buffName);
    if (!isEmpty(namezh)) {
        return namezh.namezh;
    } else {
        return '';
    }
}