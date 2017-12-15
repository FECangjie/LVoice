# coco

__包含:__

+ [MVVM VueJs]
+ [构建工具 webpack]
+ [样式 mint-ui]

__how to work?__

1. 安装 依赖 `npm install`

2. npm mock启动项目 `npm start`

3. 打包静态资源 `npm run build`


__项目结构__

1.index.html 单页应用入口文件

2.src 说明

	assets 静态资源
	common js工具类
	components 公共组件
	page 主要开发文件

		routes.js 配置页面路由
		store.js vuex状态管理
		其他 模块化

__config__

1 可本地mock接口

2 代理rd api （暂无）

3 独立打包css （暂无）
