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

export const rmFloatPoint = (val: number, len: number = 0): number => {
    return parseFloat((val).toFixed(len));
}

// export const add = (num1: number, num2: number, len: number): number => {
//     return rmFloatPoint(num1 + num2, len);
// }

// export const reduce = (num1: number, num2: number, len: number): number => {
//     return rmFloatPoint(num1 - num2, len);
// }

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