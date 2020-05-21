# vue-component-utils  
封装的vue组件和可自定义的elementui组件  
## 目录  
- [安装](#安装)  
- [使用](#使用)  
  - [全部引用](#全部引用)   
  - [按需引用](#按需引用)   
- [常用的scss的mixins](#常用的scss的mixins)  
- [引用的scss-flex插件](#引用的scss-flex插件)  
  - [安装](#安装)  
  - [引用](#引用)  
  - [示例](#示例)
  - [使用说明](#使用说明)  
    - [写在父项目的属性](#写在父项目的属性)  
    - [写在子项目的属性](#写在子项目的属性)  
- [组件介绍](#组件介绍)  
  - [eCharts组件](#echarts组件)  
  - [elementUI组件](#elementui组件)  
  - [其它组件](#其它组件)  
## 安装  
```sh
$ npm install --save vue-component-utils
```  
## 使用  
#### 全部引用
在main.js中设置如下
```sh
import componentsUtils from 'vue-component-utils'
Vue.use(componentsUtils)
```  
#### 按需引用  
1.安装babel-plugin-component插件
```sh
npm install babel-plugin-component -D
```  
2.修改babel.config.js
```sh
plugins: [
//其它插件
[
  "component",
  {
    libraryName: "vue-component-utils",
    "camel2Dash": false,
    "style": true
  }
]
]
```  
3.在main.js中按需引入你要用到的组件，比如MyAudio
```sh
import { MyAudio } from "vue-component-utils";
Vue.use(MyAudio);
```  
## 常用的scss的mixins
## 引用的scss-flex插件
#### 安装
```sh
npm install --save scss-flex
```  
#### 引用
在需要的地方引用即可
```sh
require('scss-flex');
```  
#### 示例
```
<div flex="main:center cross:center dir:top item:end">
```
#### 使用说明
##### 写在父项目的属性
###### dir：主轴方向  
- top：从上到下  
- right：从右到左
- bottom：从下到上
- left：从左到右（默认）  
###### wrap: 换行方式  
- nowrap：不换行（默认）
- wrap：换行，第一行在上方
- reverse：换行，第一行在下方
###### flow: 布局方式  
- left-nowrap: 从左到右且不换行(默认)  
- left-wrap: 从左到右且换行，第一行在上方  
- left-reverse: 从左到右且换行，第一行在下方  
- right-nowrap: 从右到左且不换行  
- right-wrap: 从右到左且换行，第一行在上方  
- right-reverse: 从右到左且换行，第一行在下方  
- top-nowrap: 从上到下且不换行  
- top-wrap: 从上到下且换行，第一行在上方  
- top-reverse: 从上到下且换行，第一行在下方  
- bottom-nowrap: 从下到上且不换行  
- bottom-wrap: 从下到上且换行，第一行在上方  
- bottom-reverse: 从下到上且换行，第一行在下方  
###### main：主轴对齐方式  
- right：从右到左  
- left：从左到右（默认）  
- between：两端对齐  
- around: 分散对齐  
- center：居中对齐  
###### cross：交叉轴对齐方式  
- top：从上到下（默认）  
- bottom：从上到下  
- baseline：基线对齐  
- center：居中对齐  
- stretch：高度并排铺满  
###### main-cross: 主轴交叉轴对齐方式  
- center: 居中  
###### content: 多根轴线的对齐方式  
- stretch: 轴线占满整个交叉轴（默认）  
- start: 与交叉轴的起点对齐  
- end: 与交叉轴的终点对齐  
- center: 与交叉轴的中点对齐  
- between: 与交叉轴两端对齐，轴线之间的间隔平均分布  
- around: 每根轴线两侧的间隔都相等  
###### box：子元素设置  
- mean：子元素平分空间  
- first：第一个子元素不要多余空间，其他子元素平分多余空间  
- last：最后一个子元素不要多余空间，其他子元素平分多余空间  
- justify：两端第一个元素不要多余空间，其他子元素平分多余空间  
##### 写在子项目的属性
###### item: 允许单个项目有与其他项目不一样的对齐方式  
- auto: 继承父元素的 align-items 属性（默认）  
- start: 居于轴顶部对齐  
- end: 居于轴尾部对齐  
- center：居于轴中心对齐  
- baseline：居于基线对齐  
- stretch：充满整个轴  
###### order: 定义项目的排列顺序。数值越小，排列越靠前，默认为0    
- 0~12  
- -1~-12  
###### flex-box: 自定义项目的放大或者缩小比例    
- 0~10  
## 组件介绍  
### eCharts组件  

---
### elementUI组件  

---
### 其它组件  

---
