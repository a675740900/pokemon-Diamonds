import { Router } from "@angular/router";
import { petMatchList, getPetMatchList, matchITFS } from "./data-source/pet/pet-info";

export const goNewPage = (url: string, router: Router) => {
    router.navigateByUrl(url);
}