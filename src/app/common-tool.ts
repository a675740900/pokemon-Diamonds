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