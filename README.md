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
├── src                           # 程序源文件
│   ├── common                 
│   │     │
│   │     ├── css                   # resetCss,pxToRem方法
│   │     │
│   │     ├── img                   # 图片资源
│   │     │
│   │     └── js                    # 工具集
│   │
│   ├── components                  
│   │     │
│   │     ├──── detailActicle.vue	     # 详情页组件
│   │     │                
│   │     ├──── goTop.vue	             # 返回顶部组件
│   │     │
│   │     ├──── inputComment.vue	     # 底部输入框组件（详情，评论页面）
│   │     │
│   │     ├──── itemActicleList.vue      # 文章列表组件（每条）
│   │     │
│   │     ├──── itemAdList.vue	         # 首页广告组件 （每条）
│   │     │
│   │     ├──── itemCommentList.vue	     # 评论组件 （每条）
│   │     │
│   │     ├──── itemTabContent.vue	     # 首页其他tab滑块内容组件（除了头条首页tab）
│   │     │
│   │     ├──── search.vue	             # 搜索组件
│   │     │
│   │     └────  showToast.vue            # 提示toast组件 (已废弃) 
│   │ 
│   │  
│   │          
│   ├── container                  # 页面主组件   
│   │     │  
│   │     ├──── comment.vue         # 评论页面app组件
│   │     │  
│   │     ├──── detail.vue          # 详情页app组件
│   │     │  
│   │     ├──── index.vue           # 详情页app组件
│   │     │  
│   │     ├──── patent.vue          # 专栏页app组件
│   │     │  
│   │     ├──── search.vue          # 搜索页app组件
│   │     │  
│   │     └──── subject.vue         # 专题页app组件
│   │
│   │ 
│   ├── assets                     # 公共图片             
│   │
│   └── main.js           	       # 入口文件
│
│
├── build                          # webpack配置文件
│
├── config                         # webpack配置文件
│
├── index.html                     # 模板文件（数据均在模板全局对象下） 
│
├── server.json                    # 首页分页数据异步请求返回的数据格式
│
└── 其他文件参照 vue-cli说明

```

## 其他说明

1. 基于vue-cli脚手架生成
2. 多页需手动切换main.js中的渲染的app组件，同时切换index.html中的data数据。
