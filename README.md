
# 家音 前端代码

* [构建工具 webpack]
* ES2015

## 使用

1. 安装 依赖 `npm install`

2. webpack 打包构建   `webpack`

3. npm 开发 `npm start`
   上线：`npm run build`

## 结构

```
|--- template // 页面文件 页面模板
|       |--- page1.html
|       |--- page2.html
|--- src // 页面css、js
|       |--- common // 公共模块
|       |       |--- index.js
|       |--- page1
|       |       |--- main.js
|       |       |--- style.css
|       |--- page2
|               |--- main.js
|               |--- style.css
|--- map.js // 页面对应js模块映射
|--- .babelrc // babel 配置文件
|--- webpack.config.js // webpack 配置文件
```

## 配置

修改 `map.js`:

```js
var path = require('path')
var ROOT = path.resolve(__dirname)

module.exports = {
    'page1/main': { // 模块名
        "src": ROOT + "/src/page1/main", // 对应页面主模块
        "tpl": "page1" // 对应模板名
    },
    'page2/main': {
        "src": ROOT + '/src/page2/main',
        "tpl": "page2"
    }
}
```

`page1/main`: `page1/main` 对应一个页面，模板对应 `pages/tpl/page1.html`，js 模块对应 `src/page1/main.js`。

在 `src/page1/main.js` 中：

```js
// 为了支持修改模板文件文件时页面自动刷新
if(ENV == 'DEV') {
    require('pages/page1.html')
}
[使用ProvidePlugin](./src/page3/main.js)
import style from './style.css' // 引入css
import common from 'src/common' // 引入common模块
```

## 示例

* [使用externals](./src/page1/main.js)
* [使用公共模块](./src/page2/main.js)
* [使用ProvidePlugin](./src/page3/main.js)
* [使用webpack-dev-server的代理](./src/page4/main.js)

## tips


* `externals` 可以让你正常使用全局 `script`
* 首次启动项目 建议`npm run bliud`下
* 构建后的目录 dist静态资源  pages页面模版
