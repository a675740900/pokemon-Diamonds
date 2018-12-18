import { JSONStringify, JSONParse } from "../home/common-tool";

// 本地缓存名称
const localStorageKey: string = 'pokemonData';

export interface LocalStorageITFS {
    petTrainerName: string;
    pets: any[],
    age: number,
}

/**
 * 生成本地存储
 * @param data 存储数据
 */
export const setLocalStorage = (data: LocalStorageITFS[]) => {
    localStorage[localStorageKey] = JSONStringify(data);
}

/**
 * 获取缓存数据
 */
export const getLocalStorage = (): LocalStorageITFS[] => {
    return JSONParse(localStorage[localStorageKey]);
}