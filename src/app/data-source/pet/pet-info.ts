export class matchITFS {
    petguid: number;
    className: string;

    constructor(petguid: number, className: string) {
        [this.petguid, this.className] = [petguid, className];
    }
}

export const getPetMatchList = (): matchITFS[] => {
    return petMatchList;
}

/**
 * 所有宠物匹配信息
 */
export const petMatchList: matchITFS[] = [
    new matchITFS(1, 'Argy'),
    new matchITFS(2, 'Mantis'),
    new matchITFS(3, 'CupricSnake'),
    new matchITFS(4, 'Penguin'),
    new matchITFS(5, 'Sparrow'),
];