# vue-component-utils  
封装的vue组件和可自定义的elementui组件  
## 目录  
- [安装](#安装)  
- [使用](#使用)  
  - [全部引用](#全部引用)   
  - [按需引用](#按需引用)   
- [方法](#方法)  
  - [数组相关方法](#数组相关方法)   
    - [sliceArrByNum分割数组](#slicearrbynumarr-num)  
    - [getCountOccurrences获取数组中某一项出现的次数](#getcountoccurrencesarr-item-index)  
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
1. 安装babel-plugin-component插件
```sh
npm install babel-plugin-component -D
```  
2. 修改babel.config.js
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
3. 在main.js中按需引入你要用到的组件，比如MyAudio
```sh
import { MyAudio } from "vue-component-utils";
Vue.use(MyAudio);
```  
