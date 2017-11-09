# 活动页伪组件化项目


## 安装依赖

### install dependencies （安装依赖）
npm install

### serve with hot reload at localhost:8000 （进入开发环境）
npm run start --you project name(项目文件夹)

### build for production with minification （构建）
npm run build --you project name(项目文件夹)


## 项目结构

```
.
├── common   
│   │ 
│   │                      
│   ├── utils                       # 工具集
│   │                          
│   │
│   └── components                  
│         │
│         ├──── footer	            # 组件示例
│         │        │
│         │        ├──── dom.art	     # 组件dom
│         │        │
│         │        ├──── script.js       # 组件js
│         │        │
│         │        ├──── style.scss	     # 组件css         
│         │        │
│         │        └──── screenShot.png  # 组件样式截图
│         │ 
│         │ 
│         └──── header	             # 其他组件
│     
│      
│              
├── entry                           # 多项目开发资源入口   
│     │  
│     ├──── example                 # 项目结构举例
│     │       │ 
│     │       ├──── app             # 静态资源入口
│     │       │      │ 
│     │       │      ├──── modules       # 项目依赖组件（pageConfig.json）的css,js资源合并打包资源
│     │       │      │        │  
│     │       │      │        ├──── script.js  
│     │       │      │        │  
│     │       │      │        └───── style.css
│     │       │      │ 
│     │       │      └───── resourse 
│     │       │                 │ 
│     │       │                 ├──── css  # 项目css
│     │       │                 │      │
│     │       │                 │      ├──── index.css   # css 文件（sass编译后文件）
│     │       │                 │      │
│     │       │                 │      └──── style.scss  # sass 文件
│     │       │                 │ 
│     │       │                 ├──── img  # 项目图片
│     │       │                 │
│     │       │                 └──── js   # 项目js
│     │       │ 
│     │       │ 
│     │       │ 
│     │       ├──── index.art	   # 模板引擎渲染前的混编文件
│     │       │                 
│     │       ├──── index.html	    # 模板引擎渲染后的模板文件
│     │       │                 
│     │       └──── pageConfig.json # 配置文件，配置项目依赖组件，最终输出占位符替换等
│     │ 
│     └────  otherProject            # 其他项目文件 
│     
│
│
├── gulptask                         # gulp任务文件
│
├── config.js                        # 资源路径配置文件
│		
├── gulpfile.js                      # gulp运行文件
│ 
└── package.json                     # 依赖


```

## 其他说明

1. 该项目支持多项目开发，通过在npm指令中添加参数：`-- example` 来运行不同的项目。
2. 每个组件下拆分为html,css,js三块，css,js是通过项目下的 pageConfig.json 来拼接在一起，html采用腾讯的[arttemplate](https://www.awesomes.cn/repo/aui/arttemplate)模板引擎（依然是字符串模版引擎）,语法请自行百度。
3. art模板引擎引入模板碎片可通过一下方式(模板渲染数据直接通过括号内数据传递即可)：

		<%-include("../../common/components/header/dom.art",{data:"我是头部"})%>
4.  art模板引擎的数据占位类似{{ mustache }}，两个大括号进行占位
5.  构建工具的基本原理就是通过配置文件，匹配对象组件文件夹下的文件，分别将html进行处理，打入不同的文件内，
6.  最终输出文件可以实现占位替换和资源合并，同时可以将图片资源进行压缩
