# vue-component-utils  
封装的vue组件和可自定义的elementui组件  
## 目录  
- [安装](#安装)  
- [使用](#使用)  
  - [全部引用](#全部引用)   
  - [按需引用](#按需引用)   
- [常用的scss的mixins](#常用的scss的mixins)  
- [scss-flex](#引用的scss-flex插件)  
  - [安装](#安装)  
  - [引用](#引用)  
  - [示例](#示例)
  - [使用说明](#使用说明)  
    - [写在父项目的属性](#写在父项目的属性)  
    - [写在子项目的属性](#写在子项目的属性)  
- [组件介绍](#组件介绍)  
  - [elementUI组件](#elementui组件)  
    - [MyBackTop-返回页面顶部的操作按钮](#MyBackTop)
    - [MyCheckbox-在一组备选项中进行多选](#MyCheckbox)
    - [MyDatePickerRange-用于选择或输入日期](#MyDatePickerRange)
    - [MyRate-评分组件](#MyRate)
  - [其它组件](#其它组件)  
    - [CollapseTransition-折叠展开动画](#CollapseTransition)
    - [ComponentFadeOutIn-显示隐藏的Vue过渡状态](#ComponentFadeOutIn)
    - [MyAudio-html5的audio标签](#MyAudio)
    - [MyBtn-div组成的button](#MyBtn)
    - [MyFlowChart-可自定义的流程图（暂时为demo）](#MyFlowChart)
    - [MyFlvVideo-基于flv.js的播放器](#MyFlvVideo)____
    - [MyMask-可自定义的全屏遮罩](#MyMask)
    - [MyQRCode-可生成带有logo的二维码](#MyQRCode)
    - [MySaveToPDF-将指定DOM转为PDF后下载或者打印](#MySaveToPDF)
    - [MySendMessageBox-发送验证按钮，验证码发出后倒计时](#MySendMessageBox)
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
#### 全局引入
在vue.config.js中设置如下
```sh
chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
        item
            .use('sass-resources-loader')
            .loader('sass-resources-loader')
            .options({
                resources: [
                    './node_modules/vue-component-utils/css/mixins.scss'
                ]
            })
            .end()
    })
}
```  
#### 使用
参考文件内的注释
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
### elementUI组件  
#### MyBackTop  
###### 示例
```sh
<my-back-top/>
```  
#### MyCheckbox  
###### 示例
```sh
<my-checkbox :ifDisable="true" @getCheckboxValue="()=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifDisable | Boolean | false（不禁用） | 是否禁用
ifVertical | Boolean | false（横向） | 是否改为竖向排列
showCheckBackground | Boolean | false（不添加） | 选中时，是否给选中的元素添加背景颜色以突出显示
extraInfo | String, Object, Array | - | 自定义扩展信息，设置后在监听中会和被选中的勾选框值数组一起返回
checkboxList | Array | [] | 备选框组中每个勾选框的值的数组，例如[1,2,3]
initCheckbox | Array | [] | 初始为选中状态的的勾选框的值的数组

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
spanColor | String | '' | 勾选框旁的文字颜色，设置后勾选框选中时文字颜色也不变
fontSize | String | '18px' | 勾选框旁的文字字体大小
marginBottom | String | '0' | 每个勾选框的下边距
marginRight | String | '43px' | 每个勾选框的右边距
squareSize | String | '' | 勾选框的大小
squareBackgroundColor | String | '' | 勾选框的背景颜色
squareCheckedBackgroundColor | String | '' | 勾选框被选中时的背景颜色
squareBorderColor | String | '' | 勾选框的边框颜色
squareCheckedBorderColor | String | '' | 勾选框被选中时的边框颜色

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
squareInnerBorderSize | String | '' | 勾选框选中时内部对勾的厚度
squareInnerHeight | String | '' | 勾选框选中时内部对勾的高度
squareInnerWidth | String | '' | 勾选框选中时内部对勾的宽度
squareInnerLeft | String | '' | 勾选框选中时内部对勾在勾选框中的相对左位置
squareInnerTop | String | '' | 勾选框选中时内部对勾在勾选框中的相对上位置
###### 监听方法  
getCheckboxValue:值改变时触发，参数为选中的勾选框的值数组；如果设置了extraInfo，参数变为{选中值数组，extraInfo}
#### MyDatePickerRange  
###### 示例
```sh
<my-date-picker-range input-hover-border-color="red" @changeValue="()=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
format | String | 'yyyy-MM-dd' | 显示在输入框中的格式
initValue | Array | [] | 初始值，开始时间和结束时间数组，Date，例如[new Date(), new Date()]
disableMaxDate | String | '' | 禁用的最大日期，默认不禁用，需要禁用时传入new Date()可以解析的字符串
disableMinDate | String | '' | 禁用的最小日期，默认不禁用，需要禁用时传入new Date()可以解析的字符串
width | String | '' | 宽度
height | String | '48px' | 高度
inputHoverBorderColor | String | '' | 输入框在hover时的边框颜色
###### 监听方法  
changeValue:值改变时触发，参数为开始时间和结束时间数组，Date类型
#### MyRate  
###### 示例
```sh
<my-rate :value="0" @getValue="()=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
value | Number | 0 | 评分初始值
disabled | Boolean | false（不只读） | 是否为只读
disabledVoidColor | String | '#EFF2F7' | 只读时未选中 icon 的颜色
color | String | '#F7BA2A' | icon 的颜色
allowHalf | Boolean | false（不允许） | 是否允许半选
###### 监听方法  
getValue:分值改变时触发，返回值为改变后的分值

----
### 其它组件  
#### CollapseTransition  
###### 示例
```sh
<collapse-transition dimension="width">
    <div>内容</div>
</collapse-transition>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
dimension | String | 纵向 | 横向收缩还是纵向收缩，设置为'width'时变为横向
duration | Number | 300 | 动画时长，毫秒
#### ComponentFadeOutIn  
###### 示例
```sh
<component-fade-out-in>
    <div>内容</div>
</component-fade-out-in>
```  
#### MyAudio  
###### 示例
```sh
<my-audio ref="myAudio" audioSrc="src" @audioEnd="()=>{}"/>
---
this.$ref.myAudio.playAudio()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
audioSrc | String | '' | 音频地址
ifHide | Boolean | false（隐藏） | 是否隐藏音频播放控件的显示
###### 监听方法  
audioEnd:监听播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
playAudio | 播放 | - | - | -
pauseAudio | 暂停 | - | - | -
#### MyBtn  
###### 示例
```sh
<my-btn background-color-hover="red" :not-used="notUsed" @myClick="notUsed=true"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
text | String | '' | 按钮的文字
color | String | '' | 自定义按钮文字颜色
borderColor | String | '' | 按钮的边框颜色，不设置时不显示边框
backgroundColor | String | '' | 自定义按钮背景颜色
backgroundColorHover | String | '' | 自定义按钮在hover时的背景颜色
width | String | '100%' | 按钮的宽度
height | String | '48px' | 按钮的高度
fontSize | String | '18px' | 按钮的字体大小
borderRadius | String | '4px' | 按钮的四边圆角大小
notUsed | Boolean | false（不禁用） | 是否禁用按钮
alwaysUse | Boolean | false（不启用） | 是否在notUsed设置为true时还启用按钮的点击事件
###### 监听方法  
myClick:点击了按钮
#### MyFlowChart  
###### 示例
```sh
<my-flow-chart/>
```  
#### MyFlvVideo  
###### 示例
```sh
<my-flv-video ref="myFlvVideo" audioSrc="src" @endedEvent="()=>{}"/>
---
this.$ref.myFlvVideo.play()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '' | 播放器宽度
height | String | '' | 播放器高度
videoSrc | String | '' | 视频地址
type | String | 'mp4' | 加载的视频格式，可选'flv'或者'mp4'
###### 监听方法  
endedEvent:播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
start | 组件初始化 | notPlay | 设置true时初始化后不立即播放 | -
play | 播放 | - | - | -
pause | 暂停播放 | - | - | -
destroyFn | 组件的销毁 | - | - | -
###### 注意事项  
1. 在父组件中需要手动调用此组件的start方法进行初始化，初始化成功后将自动播放
#### MyMask  
###### 示例
```sh
<my-mask v-show="false" width="450px"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '450px' | 弹出框的宽度
minTop | Number | 0 | 允许拖拽的最大高度
initTop | String | ''（居中） | 初始top值
###### 注意事项  
1. 该组件共有3个插槽，分别为title（标题的dom），closeBtn（关闭按钮的dom），content（内容的dom）。使用方法可参考如下：
```sh
<my-mask :width="width" :min-top="62" class="projectMask">
    <div slot="title" class="projectMaskTitleText" flex="cross:center">{{title}}</div>
    <div slot="closeBtn" @click="closeBtnFn" class="closeBtn"></div>
    <slot slot="content"/>
</my-mask>
``` 
#### MyQRCode  
###### 示例
```sh
<my-q-r-code :logoScale="0.2"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
logoScale | Number | 0.2 | 用于计算 LOGO 大小的值, 过大将导致解码失败, LOGO 尺寸计算公式 logoScale*(size-2*margin)
logoSrc | String | '' | 嵌入至二维码中心的logo图片地址
text | String | '' | 欲编码的内容
size | Number | 0 | 尺寸, 正方形, 包含外边距
###### 注意事项  
1. logoScale不要设置的过大，否则识别不了
#### MySaveToPDF  
###### 示例
```sh
import { MySaveToPDF } from "vue-component-utils";
MySaveToPDF.methods.saveToPDFFn('我的模拟实践训练成绩', this.$refs.myTable)
MySaveToPDF.methods.printPDFFn(this.$refs.myTable)
```  
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | :------: | :-----: |------
saveToPDFFn | 将指定DOM转为PDF后下载 | pdfName | PDF文档名称 | dom | 要转换的dom | -
printPDFFn | 将指定DOM转为PDF后打印 | dom | 要转换的dom | - | - | -
###### 注意事项  
1. printPDFFn方法只能在弹出的新窗口打印
#### MySendMessageBox  
###### 示例
```sh
<my-send-message-box ref="mySendMessageBox" audioSrc="src" @endedEvent="()=>{}"/>
---
this.$ref.mySendMessageBox.sendSmsSuccess()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifCheckPwd | Boolean | false（不检查） | 是否检查密码
password | String | '' | 密码
phoneNumber | String | '' | 手机号
fontSize | String | '18px' | 按钮的字体大小
height | String | '48px' | 高度
###### 监听方法  
sendSms:点击了按钮
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
sendSmsSuccess | 调接口成功后调用此方法，开始倒计时并且不能点击 | - | - | -
sendSmsFail | 调接口失败后调用此方法，重置为初始状态 | - | - | -
###### 注意事项  
1. 此组件需要在父组件中手动调用组件内的方法使用
