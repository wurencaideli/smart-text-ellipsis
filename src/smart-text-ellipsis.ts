import { addElementClass, removeElementClass } from './common.js';

type Option = {
    targetEl: HTMLElement;
    isOpen: boolean;
    maxLines: number;
};
export class SmartTextEllipsis {
    isDestroyed: boolean = false;
    maxLines: number = 0;
    targetEl: HTMLElement | undefined | null;
    textEl: HTMLElement | undefined | null;
    textVEl: HTMLElement | undefined | null;
    isOpen: boolean = false;
    constructor(options: Option) {
        const targetEl = options.targetEl;
        const isOpen = options.isOpen;
        const maxLines = options.maxLines;
        const textEl = targetEl.querySelector('.smart-text-ellipsis-text') as HTMLElement;
        let textVEl = targetEl.querySelector('.smart-text-ellipsis-text-v') as HTMLElement;
        if (!textVEl) {
            textVEl = document.createElement('div');
            addElementClass(textVEl, 'smart-text-ellipsis-text');
            addElementClass(textVEl, 'smart-text-ellipsis-text-v');
            textVEl.innerHTML = textEl.innerHTML;
            targetEl.prepend(textVEl);
        }
        this.targetEl = targetEl;
        this.isOpen = isOpen;
        this.maxLines = maxLines;
        this.textEl = textEl;
        this.textVEl = textVEl;
        this.update();
    }
    /** 销毁实例 */
    destroy() {
        this.isOpen = true;
        this.targetEl = undefined;
        this.textEl = undefined;
        this.textVEl = undefined;
        this.isDestroyed = true;
    }
    /** 更新样式 */
    update() {
        if (this.isDestroyed) return;
        this.#setupClass();
    }
    expand() {
        this.#handleExpand();
    }
    collapse() {
        this.#handleCollapse();
    }
    #handleExpand() {
        if (this.isDestroyed) return;
        this.isOpen = true;
        this.update();
    }
    #handleCollapse() {
        if (this.isDestroyed) return;
        this.isOpen = false;
        this.update();
    }
    /** 设置容器的类名 */
    #setupClass() {
        if (this.isDestroyed) return;
        const targetEl = this.targetEl;
        const textEl = this.textEl;
        const textVEl = this.textVEl;
        if (!targetEl || !textEl || !textVEl) return;
        textVEl.innerHTML = textEl.innerHTML;
        targetEl.style.setProperty('--max-lines', `${this.maxLines}`);
        if (this.maxLines == 1) {
            addElementClass(textEl, 'smart-text-ellipsis-one');
            removeElementClass(textEl, 'smart-text-ellipsis-more');
            addElementClass(textVEl, 'smart-text-ellipsis-one');
            removeElementClass(textVEl, 'smart-text-ellipsis-more');
        } else {
            addElementClass(textEl, 'smart-text-ellipsis-more');
            removeElementClass(textEl, 'smart-text-ellipsis-one');
            addElementClass(textVEl, 'smart-text-ellipsis-more');
            removeElementClass(textVEl, 'smart-text-ellipsis-one');
        }
        if (this.isOpen) {
            removeElementClass(textEl, 'smart-text-ellipsis-more');
            removeElementClass(textEl, 'smart-text-ellipsis-one');
            // 如果行数超过了，显示收缩按钮
            if (this.#isEllipsisActive()) {
                removeElementClass(targetEl, 'is-ellipsis');
                addElementClass(targetEl, 'is-exceeded-max-line');
            }
        } else {
            // 如果字体省略了，显示展开按钮
            if (this.#isEllipsisActive()) {
                removeElementClass(targetEl, 'is-exceeded-max-line');
                addElementClass(targetEl, 'is-ellipsis');
            }
        }
    }
    /** 判断是否省略了 */
    #isEllipsisActive(): boolean {
        const maxLines = this.maxLines;
        const el = this.textVEl as HTMLElement;
        if (maxLines === 1) {
            return el.scrollWidth > el.clientWidth;
        }
        return el.scrollHeight > el.clientHeight;
    }
}
