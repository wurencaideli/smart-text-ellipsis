## Introduction

Hide and display long text.

When you have a long text, displaying it directly may not be a good idea. You need an expand and collapse function.

[DEMO](https://wurencaideli.github.io/smart-text-ellipsis/demo.html)

#### install

```javascript
npm install smart-text-ellipsis
```

#### How to use

```javascript
import { SmartTextEllipsis } from 'smart-text-ellipsis';
/** import css */
import 'smart-text-ellipsis/dist/smart-text-ellipsis.css';
const ddInstanceList = [];
const el = document.getElementById('demo-1');
const ddInstance = new SmartTextEllipsis({
    targetEl: el,
    isOpen: false,
    maxLines: 2,
});
ddInstanceList.push(ddInstance);
window.ddInstance = ddInstance;
/**
 * update style
 */
function updateDdInstance() {
    setTimeout(() => {
        ddInstanceList.forEach((item) => {
            item.update();
        });
        updateDdInstance();
    }, 700);
}
updateDdInstance();
```

#### Example

```html
<style>
    .smart-text-ellipsis {
        font-size: 12px;
        line-height: 22px;
        word-break: break-all;
    }
    .smart-text-ellipsis-expand {
        background: linear-gradient(to left, #ffffff 50%, #ffffff7a 77%, #ffffff00);
        padding: 0 5px 0 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        border: none;
        line-height: 22px;
        font-size: 12px;
        color: rgb(0 119 255);
        font-weight: bold;
        cursor: pointer;
    }
    .smart-text-ellipsis-collapse {
        background-color: transparent;
        padding: 0;
        border: none;
        line-height: 22px;
        font-size: 12px;
        color: rgb(0 119 255);
        font-weight: bold;
        cursor: pointer;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
</style>
<div class="smart-text-ellipsis" id="demo-1">
    <div class="smart-text-ellipsis-text">
        正常文本
    </div>
    <button class="smart-text-ellipsis-expand">... 展开</button>
    <button class="smart-text-ellipsis-collapse">收起</button>
</div>
```

```js
const el_1 = document.getElementById('demo-1');
const expandBt = el_1.querySelector('.smart-text-ellipsis-expand');
const collapseBt = el_1.querySelector('.smart-text-ellipsis-collapse');
const ddInstance = new SmartTextEllipsis({
    targetEl: el_1,
    isOpen: true,
    maxLines: 1,
});
expandBt.onclick = () => {
    ddInstance.expand();
};
collapseBt.onclick = () => {
    ddInstance.collapse();
};
```