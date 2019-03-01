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

// json转字符串
export const JSONStringify = (data: any): string => {
    return isEmpty(data) ? '' : JSON.stringify(data);
}

// 字符串转json
export const JSONParse = (data: string): any => {
    return isEmpty(data) ? null : JSON.parse(data);
}

class NameToIconUrl {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        [this.name, this.url] = [name, url];
    }
}
class NameToNameZh {
    name: string;
    namezh: string;

    constructor(name: string, namezh: string) {
        [this.name, this.namezh] = [name, namezh];
    }
}

// 英文名对应中文名
const NameToNameZhs: NameToNameZh[] = [
    new NameToNameZh('Silent', '沉默'),
    new NameToNameZh('Bleeding', '流血'),
    new NameToNameZh('BloodSucking', '吸血'),
    new NameToNameZh('ReduceInjury', '伤害减免'),
    new NameToNameZh('IncreaseInjury', '抗性下降'),
    new NameToNameZh('IncreaseArmor', '增加护甲'),
    new NameToNameZh('ReduceArmor', '破甲'),
    new NameToNameZh('Stiff_Frozen', '冰冻'),
    new NameToNameZh('Stiff_Stone', '石化'),
    new NameToNameZh('Stiff_Sleep', '睡眠'),
    new NameToNameZh('Stiff_Twining', '缠绕'),
    new NameToNameZh('IncreasePower', '增加攻击力'),
    new NameToNameZh('Dodge', '闪避'),
    new NameToNameZh('ReducePower', '减少攻击力'),
    new NameToNameZh('SeriousInjury', '重伤'),
    new NameToNameZh('Shield', '护盾'),
    new NameToNameZh('ImmuneSkill', '免疫'),
    new NameToNameZh('AttackAbnormal', '攻击异常状态'),
]

// 英文名对应图标
const NameToIconUrls: NameToIconUrl[] = [
    new NameToIconUrl('Silent', 'assets/image/pet-buff/silent.png'),
    new NameToIconUrl('Bleeding', 'assets/image/pet-buff/bleeding.png'),
    new NameToIconUrl('IncreaseInjury', 'assets/image/pet-buff/defenses_low.png'),
    new NameToIconUrl('IncreaseArmor', 'assets/image/pet-buff/resistance_up.png'),
    new NameToIconUrl('IncreasePower', 'assets/image/pet-buff/power_up.png'),
    new NameToIconUrl('IncreaseBlood', 'assets/image/pet-buff/increaseblood.png'),
    new NameToIconUrl('ReduceInjury', 'assets/image/pet-buff/defenses_up.png'),
    new NameToIconUrl('ReduceArmor', 'assets/image/pet-buff/resistance_low.png'),
    new NameToIconUrl('ReducePower', 'assets/image/pet-buff/power_low.png'),
    new NameToIconUrl('Stiff_Frozen', 'assets/image/pet-buff/frozen.png'),
    new NameToIconUrl('Stiff_Stone', 'assets/image/pet-buff/stone.png'),
    new NameToIconUrl('Stiff_Sleep', 'assets/image/pet-buff/sleep.png'),
    new NameToIconUrl('Stiff_Twining', 'assets/image/pet-buff/twining.png'),
    new NameToIconUrl('SeriousInjury', 'assets/image/pet-buff/seriousinjury.png'),
    new NameToIconUrl('Shield', 'assets/image/pet-buff/shield.png'),
    new NameToIconUrl('Sleep', 'assets/image/pet-buff/sleep.png'),
]

// 宠物类型图标队形
const petTypeIconUrls: NameToIconUrl[] = [
    new NameToIconUrl('PLANT', 'assets/image/pet-type/PLANT.png'),
    new NameToIconUrl('BEAST', 'assets/image/pet-type/BEAST.png'),
    new NameToIconUrl('METAL', 'assets/image/pet-type/METAL.png'),
    new NameToIconUrl('OCEAN', 'assets/image/pet-type/OCEAN.png'),
    new NameToIconUrl('FLIGHT', 'assets/image/pet-type/FLIGHT.png')
]

// 获取图标地址
export const getIcon = (buffName: string): string => {
    const icon: NameToIconUrl = NameToIconUrls.find((iconToUrl: NameToIconUrl) => iconToUrl.name === buffName);
    if (!isEmpty(icon)) {
        return icon.url;
    } else {
        return '';
    }
}

// 获取状态中文名
export const getNameZh = (buffName: string): string => {
    const namezh: NameToNameZh = NameToNameZhs.find((nameZh: NameToNameZh) => nameZh.name === buffName);
    if (!isEmpty(namezh)) {
        return namezh.namezh;
    } else {
        return '';
    }
}

// 获取宠物类型图标地址
export const getPetTypeIcon = (petType: string): string => {
    const icon: NameToIconUrl = petTypeIconUrls.find((petTypeIconUrl: NameToIconUrl) => petTypeIconUrl.name == petType);
    if (!isEmpty(icon)) {
        return icon.url;
    } else {
        return '';
    }
}