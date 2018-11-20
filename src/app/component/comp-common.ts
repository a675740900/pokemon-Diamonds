export class IntroduceList {
    title: string;
    description: string;
    detailed: string;
    url?: string;

    constructor(title: string, description: string, detailed: string, url: string = '') {
        [this.title, this.description, this.detailed, this.url] = [title, description, detailed, url];
    }
}