type Option = {
    targetEl: HTMLElement;
    isOpen: boolean;
    maxLines: number;
};
export declare class SmartTextEllipsis {
    #private;
    isDestroyed: boolean;
    maxLines: number;
    targetEl: HTMLElement | undefined | null;
    textEl: HTMLElement | undefined | null;
    textVEl: HTMLElement | undefined | null;
    isOpen: boolean;
    constructor(options: Option);
    /** 销毁实例 */
    destroy(): void;
    /** 更新样式 */
    update(): void;
    expand(): void;
    collapse(): void;
}
export {};
