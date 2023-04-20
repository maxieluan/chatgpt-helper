## Start
```sh
npm create chrome-ext chatgpt-helper
cd chatgpt-helper
npm install
npm run build
```
在浏览器里：
- 打开 `chrome://extensions/`
- 打开 `开发者模式`
- 点击 `加载已解压的扩展程序`
- 选择 `chatgpt-helper/build` 目录

回到命令行
```
npm run dev
```
修改文件，hot reload

建议使用crxjs支持的前端框架，因为其他框架似乎还没有对content script hmr做很好的支持。

## 限定网站
content script的`matches`字段可以限定网站

## detect error message
初使用`MutationObserver`, 但由于任何渲染都会触发mutation，导致需要判断的东西比较多，有时候一不小心就会触发一大堆按钮，有时候又会一个都没有。
后使用sentineljs

## copy paste
做两部分：
- 从网页复制到剪贴板
- 存储到localstorage

其中，localstorage显然应该是一个比较elegant的方法
但是仍然是，使用sentinel判断textarea是否渲染完成
但是textarea不是chatgpt里最后渲染的，如果提前paste，会被overwrite，所以设置了一个timeout，这个时间后续可以在设置里调整。

## todo
- [ ] 设置页面
- [ ] template
- [ ] options页面可以自由添加template
- [ ] 尝试其他框架，轻量级如preact或svelte，如何配置能够支持hmr