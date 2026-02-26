export function addElementClass(el: HTMLElement, className: string) {
    if (!el) return;
    el.classList.add(className);
}
export function removeElementClass(el: HTMLElement, className: string) {
    if (!el) return;
    el.classList.remove(className);
}
