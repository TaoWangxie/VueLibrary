import { numAdd, numSub } from '@/utils/index'
import _ from 'lodash'
const wrapperMoveStateInit: any = {
    isDrag: false,
    startX: 0,
    startY: 0,
    needX: 0,
    needY: 0,
}
const scale = {
    value: 1,
    maxValue: 10,
    minValue: 0.5
}
export class dragResize {
    wrapperPannel: any;
    wrapper: any;
    wrapperMoveState: any;
    isSelf: any;
    scale: any;
    constructor(params: { wrapperPannel: any, wrapper: any, moveState?: any, isSelf?: any }) {
        let { wrapperPannel, wrapper, moveState, isSelf } = params
        //样式集合
        this.wrapper = wrapper
        this.wrapperPannel = wrapperPannel
        this.wrapperMoveState = moveState ? moveState : _.cloneDeep(wrapperMoveStateInit)
        this.isSelf = isSelf
        this.scale = _.cloneDeep(scale)
        this.wrapperPannel.addEventListener("mousedown", (e) => {
            this.onMouseDown(e)
        })
        this.wrapperPannel.addEventListener("mousewheel", (e) => {
            this.mousewheel(e)
        })
    }

    initMoveState() {
        this.wrapperMoveState = _.cloneDeep(wrapperMoveStateInit)
        this.scale.value = 1
        this.changeStyle()
    }
    //鼠标点击
    onMouseDown(e: any) {
        if (e.target == this.wrapperPannel || this.isSelf) {
            this.wrapperMoveState.isDrag = true;
            this.wrapperMoveState.startX = e.clientX;
            this.wrapperMoveState.startY = e.clientY;
            if (this.wrapperPannel) {
                this.wrapperPannel.style.cursor = 'grab';
            }
            const move = (e: any) => {
                e.preventDefault()
                if (this.wrapperMoveState.isDrag) {
                    const diffX = e.clientX - this.wrapperMoveState.startX;
                    const diffY = e.clientY - this.wrapperMoveState.startY;
                    this.wrapperMoveState.needX = this.wrapperMoveState.needX + diffX / this.scale.value;
                    this.wrapperMoveState.needY = this.wrapperMoveState.needY + diffY / this.scale.value;
                    this.wrapperMoveState.startX = e.clientX;
                    this.wrapperMoveState.startY = e.clientY;
                    this.changeStyle()
                }
            }
            const up = (e: any) => {
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
                this.wrapperPannel.style.cursor = 'default';
                this.wrapperMoveState.isDrag = false;
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        } else {

        }
    }
    //鼠标滑轮缩放
    mousewheel(e: any) {
        e.preventDefault()
        if (e.deltaY > 0) {
            //往下滚缩小
            this.Sub()
        } else {
            //往上滚放大
            this.Add()
        }
    }
    Sub() {
        if (this.scale.value > this.scale.minValue) {
            this.scale.value = numSub(this.scale.value, 0.4);
        }
        this.changeStyle()
    }
    Add() {
        if (this.scale.value < this.scale.maxValue) {
            this.scale.value = numAdd(this.scale.value, 0.4);
        }
        this.changeStyle()
    }
    changeStyle() {
        this.wrapper.style.transform =
            `scale(${this.scale.value}) translate(${this.wrapperMoveState.needX}px,${this.wrapperMoveState.needY}px)`;
    }
}