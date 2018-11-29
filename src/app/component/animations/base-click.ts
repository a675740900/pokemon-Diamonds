/*
 * @Author: 水痕
 * @Date: 2017-10-20 21:23:42
 * @Last Modified by: 水痕
 * @Last Modified time: 2017-10-20 21:59:29
 * @email:332904234@qq.com
 * @version:1.0
 * @describe:创建一个基础的动画
 */
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

// 定义一个鼠标点击运动的动画

export const boxAnimate = trigger('box', [
    // 定义一个状态left
    state('hidden', style({ transform: 'translate3d(200%,0,0)' })),
    // 定义另外一个状态right
    state('show', style({ transform: 'translate3d(0,0,0)' })),
    // 定义运动过程(从left到right状态)
    transition('show=>hidden', animate(150, keyframes([
        style({ transform: 'translate3d(0%,0,0)' }),
        style({ transform: 'translate3d(200%,0,0)' }),
    ]))),
    // 定义运动过程(从right到left)
    transition('hidden=>show', animate(150, keyframes([
        style({ transform: 'translate3d(200%,0,0)' }),
        style({ transform: 'translate3d(0%,0,0)' })
    ]))),
]);

// 定义一个鼠标移上去的动画
export const boxAnimateHover = trigger('boxHover', [
    // 定义一个状态,正常状态
    state('out', style({ transform: 'scale(1)', 'box-shadow': 'none' })),
    // 定义一个状态,鼠标移上去
    state('in', style({ transform: 'scale(1.1)', 'box-shadow': '3px 3px 5px 6px #ccc' })),
    // 定义运动过程
    transition('out=>in', animate('200ms ease-in')),
    transition('in=>out', animate('200ms ease-out'))
]);
