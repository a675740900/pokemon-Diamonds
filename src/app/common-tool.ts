import { Router } from "@angular/router";

export const goNewPage = (url: string, router: Router) => {
    router.navigateByUrl(url);
}