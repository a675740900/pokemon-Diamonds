import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorageITFS, getLocalStorage } from './local-storage';

@Component({
    selector: 'app-local-archiving',
    templateUrl: './local-archiving.component.html',
    styles: ['./local-archiving.component.css']
})

/**
 * 经验系统
 */
export class LocalArchivingComponent implements OnInit {
    localArchivings: LocalStorageITFS[];
    showContainers: any[] = [{ bind: 'petTrainerName', name: '驯兽师' }, { bind: 'age', name: '年龄' }];
    showCols: string[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        for (const item of this.showContainers) {
            this.showCols.push(item.bind);
        }
    }

    ngOnInit() {
        this.localArchivings = getLocalStorage();
    }

}
