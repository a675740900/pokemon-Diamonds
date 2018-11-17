/*
 * @Author: 水痕
 * @Date: 2017-10-20 22:16:06
 * @Last Modified by: 水痕
 * @Last Modified time: 2017-10-20 22:37:30
 * @email:332904234@qq.com
 * @version:1.0
 * @describe:定义路由动画
 */
import { trigger, state, style, transition, animate } from '@angular/animations';


export const slideToRight = trigger('routerAnimate', [
    // 定义void表示空状态下
    state('void', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
    // * 表示任何状态
    state('*', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
    // 进场动画
    transition(':enter', [
        style({ transform: 'translate3d(-100%,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
    ]),
    // 出场动画
    transition(':leave', [
        style({ transform: 'translate3d(0,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(100%,0,0)' }))
    ])
]);

export const slideToLeft = trigger('routerAnimateLeft', [
    // 定义void表示空状态下
    state('void', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
    // * 表示任何状态
    state('*', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
    // 进场动画
    transition(':enter', [
        style({ transform: 'translate3d(100%,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
    ]),
    // 出场动画
    transition(':leave', [
        style({ transform: 'translate3d(0,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(-100%,0,0)' }))
    ])
]);

export const homeRouterAnimate = trigger('routerAnimate', [
    transition('* => fromBack', [
        style({ transform: 'translate3d(0,-100%,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
    ]),
    transition('* => goNext', [
        style({ transform: 'translate3d(0,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(0,-100%,0)' }))
    ])
])

export const pageRouterAnimate = trigger('routerAnimate', [
    // 定义void表示空状态下
    state('void', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
    // * 表示任何状态
    state('*', style({ position: 'fixed', 'width': '100%', 'height': '100%' })),
    // 定义一个状态left
    state('left', style({ transform: 'translate3d(0,0,0)' })),
    // 定义另外一个状态right
    state('right', style({ transform: 'translate3d(0,0,0)' })),
    transition('* => goNext', [
        style({ transform: 'translate3d(0,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(-100%,0,0)' }))
    ]),
    transition('* => goBack', [
        style({ transform: 'translate3d(0,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(100%,0,0)' }))
    ]),
    transition('* => fromBack', [
        style({ transform: 'translate3d(-100%,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
    ]),
    transition('* => fromNext', [
        style({ transform: 'translate3d(100%,0,0)' }),
        animate('.5s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
    ]),
]);