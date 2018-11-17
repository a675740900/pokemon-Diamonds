import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { boxAnimateHover } from '../../component/animations/base-click';
import { slideToRight } from '../../component/animations/router.animate';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  animations: [
    boxAnimateHover,
    slideToRight,
]
})
export class Page1Component implements OnInit {
    // 定义路由动画
    @HostBinding('@routerAnimate') state;
    private boxHoverState: String = 'out';
    // 绑定一个鼠标移入改变状态
    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event) {
        console.log(event);
        this.boxHoverState = 'in';
    }
    // 绑定一个鼠标移出改变状态
    @HostListener('mouseleave')
    onmouseleave() {
        this.boxHoverState = 'out';
    }
    constructor() { }

    ngOnInit() {
    }
}
