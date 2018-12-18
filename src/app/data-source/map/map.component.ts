import { Component, OnInit } from '@angular/core';
import { Map, getMaps } from './map-common';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    maps: Map[]; // 地图数组

    constructor() {

    }

    ngOnInit() {
        this.maps = getMaps();
    }

}
