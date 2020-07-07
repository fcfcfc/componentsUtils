# vue-component-utils  
适用于PC端项目的vue组件和可自定义的Element组件  
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
    - [MyCascade-级联选择器](#MyCascade)
    - [MyDialog-级联选择器](#MyDialog)
    - [MyInput-Input输入框](#MyInput)
    - [MyPagination-分页组件](#MyPagination)
    - [MySelect-Select组件](#MySelect)
    - [MyUpload-上传组件](#MyUpload)
    - [MyProgress-进度条组件](#MyProgress)
    - [MyRadio-Radio组件](#MyRadio)
    - [MyTable-Table组件](#MyTable)
    - [MyTimeline-可视化地呈现时间流信息](#MyTimeline)
    - [VerticalNavMenu-侧边垂直菜单，可内嵌子菜单](#VerticalNavMenu)
    - [MyTree-树形控件](#MyTree)
  - [其它组件](#其它组件)  
    - [CollapseTransition-折叠展开动画](#CollapseTransition)
    - [ComponentFadeOutIn-显示隐藏的Vue过渡状态](#ComponentFadeOutIn)
    - [MyAudio-html5的audio标签](#MyAudio)
    - [MyBtn-div组成的button](#MyBtn)
    - [MyFlowChart-可自定义的流程图（暂时为demo）](#MyFlowChart)
    - [MyFlvVideo-播放器组件，支持flv和mp4](#MyFlvVideo)
    - [MyVideo-播放器组件，支持m3u8、直播和mp4](#MyVideo)
    - [MyMask-可自定义的全屏遮罩](#MyMask)
    - [MyQRCode-可生成带有logo的二维码](#MyQRCode)
    - [MySaveToPDF-将指定DOM转为PDF后下载或者打印](#MySaveToPDF)
    - [MySendMessageBox-发送验证按钮，验证码发出后倒计时](#MySendMessageBox)
    - [MySwiper-封装的Swiper组件](#MySwiper)
- [写在最后](#写在最后)  
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
安装如下依赖
```sh
npm install sass-resources-loader
```
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
<my-checkbox :ifDisable="true" @getCheckboxValue="val=>{}"/>
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
**_getCheckboxValue_**：值改变时触发，参数为选中的勾选框的值数组；如果设置了extraInfo，参数变为{选中值数组，extraInfo}
#### MyDatePickerRange  
###### 示例
```sh
<my-date-picker-range input-hover-border-color="red" @changeValue="val=>{}"/>
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
**_changeValue_**：值改变时触发，参数为开始时间和结束时间数组，Date类型
#### MyRate  
###### 示例
```sh
<my-rate :value="0" @getValue="val=>{}"/>
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
**_getValue_**：分值改变时触发，返回值为改变后的分值
#### MyCascade  
###### 示例
```sh
<my-cascade :if-disable="true" input-hover-border-color="#000" @changeValue="val=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
initVal | Array | [] | 初始值
placeholder | String | '' | 输入框占位符
inputHoverBorderColor | String | '' | 输入框在hover时的边框颜色

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifDisable | Boolean | false（不禁用） | 是否禁用
options | Array | [] | 下拉选项数组，包含的对象为{label:显示的文字,value:对应的值,children:子节点数组}
width | String | '100%' | 宽度
height | String | '48px' | 高度
myProps | Object | {expandTrigger:'hover'} | 配置选项
###### myProps可设置参数  
```
{
     expandTrigger:次级菜单的展开方式，可选值为'click'和'hover'，默认'click'
     multiple:是否多选，默认为false
     checkStrictly:是否严格的遵守父子节点不互相关联，默认为false
     emitPath:在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值，默认为true
     lazy:是否动态加载子节点，需与 lazyLoad 方法结合使用，默认为false
     lazyLoad:加载动态数据的方法，仅在 lazy 为 true 时有效	function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)	-	-
     value:指定选项的值为选项对象的某个属性值，默认为'value'
     label:指定选项标签为选项对象的某个属性值，默认为'label'
     children:指定选项的子选项为选项对象的某个属性值，默认为'children'
     disabled:指定选项的禁用为选项对象的某个属性值，默认为'disabled'
     leaf:指定选项的叶子节点的标志位为选项对象的某个属性值，默认为'leaf'
}
```
###### 监听方法  
changeValue:值改变时触发，参数为options中选中的对象的value数组（级联的第一级，第二级...）
#### MyDialog  
###### 示例
```sh
<my-dialog width="50%" @closeFn="()=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '50%' | 宽度
title | String | '' | 标题
ifShow | Boolean | false（不显示） | 是否显示
###### 监听方法  
**_closeFn_**：关闭的监听
###### 注意事项  
1. 必须在父组件中监听closeFn，设置显示隐藏的flag
#### MyInput  
###### 示例
```sh
<my-input ref="myInput" type="text" @changeValue="val=>{}"/>
---
this.$refs.myInput.focusFn()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifDisabled | Boolean | false（不禁用） | 是否禁用
extraInfo | String, Object, Array, Number | - | 自定义扩展信息，设置后在监听中会和输入框的值一起返回
disableEnterEvent | Boolean | false（不禁用） | 是否禁用回车监听
autoComplete | String | '' | 原生属性，自动补全，设置为new-password可以解决Firefox上密码输入框会自动填充密码的问题
textareaUseHeight | Boolean | false（不使用） | textarea是否也使用height参数控制高度
textareaOverFlowHidden | Boolean | false（不显示） | 文本域是否显示滚动条
ifDisableBorder | Boolean | false（显示） | 是否不显示边框
textCenterInput | Boolean | false（不居中） | 输入框内的文字是否居中显示
ifDisableClearIcon | Boolean | false（不禁用） | 是否禁用删除小图标
textareaAutoHeightByContent | Boolean | false（不变化） | 文本域的高度是否随内容变化

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
type | String | 'text' | 原生 input 的 type 值
maxlength | Number | - | 原生属性，最大输入长度
ifAutofocus | Boolean | false（不自动获取焦点） | 原生属性，自动获取焦点
initValue | String, Number | - | 初始值
rows | Number | 2 | 输入框行数，只对 type="textarea" 有效
placeholder | String | '' | 输入框占位文本

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | - | 宽度
height | String | '48px' | 高度
textareaMinHeight | String | '46px' | 文本域的最低高度
paddingLeft | String | '' | 输入框的padding-left
paddingRight | String | '' | 输入框的padding-right
paddingTop | String | '' | 输入框的padding-top
paddingBottom | String | '' | 输入框的padding-bottom

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
fontColor | String | '' | 文字颜色
backgroundColor | String | '#FFFFFF' | 输入框背景颜色
inputHoverBorderColor | String | '' | 输入框在hover时的边框颜色
###### 监听方法  
1. **_changeValue_**：值改变时触发，参数为input中的值，如果设置了extraInfo，参数变为{value:输入框值，info:extraInfo设置的值}
2. **_enterEvent_**：监听键盘上的回车事件
3. **_blurEvent_**：监听失去焦点事件
4. **_focusEvent_**：监听获得焦点事件
5. **_changeEvent_**：仅在输入框失去焦点或用户按下回车时触发。注意！因为在该监听中做了trim处理后更新了input值，所以若要在此监听取input值，需要根据情况重新做trim处理
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
focusFn | 使 input 获取焦点 | - | - | -
#### MyPagination  
###### 示例
```sh
<my-pagination ref="myPagination" :total="0" @pageInfoChange="pageInfo=>{}"/>
---
this.$refs.myPagination.setFlagFalse()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
selectActiveItemColor | String | '' | 下拉框（选择每页条数）选中项目的字体颜色，建议设置为主题色，属于项目通用配置，会影响项目中其它下拉框组件
paginationBorderHoverColor | String | '' | 页签hover时边框的颜色
paginationBgcActiveColor | String | '' | 页签选中时的背景颜色
total | Number | 0 | 数据总条数
layout | String | 'prev, pager, next, sizes, jumper' | 自定义组件布局，子组件名用逗号分隔，可选'sizes', 'prev', 'pager', 'next', 'jumper', '->', 'total', 'slot'
myPageSizeArr | Array | [10, 20, 30, 50] | 每页条数数组，默认为
###### 监听方法  
**_pageInfoChange_**：分页信息改变时会触发，返回值为{currentPageSize,pageNumber}
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
setPaginationInfo | 设置当前的分页信息 | val | 需要传入{pageSizeIndex:1,pageNumber:1}这样的对象 | -
setFlagFalse | 调接口成功或者失败后调用此方法，否则无法调用接口（防止组件多次重复调接口） | - | - | -
goToAjax | 统一的调用ajax的方法 | callback | 回调函数，返回值为{pageSize:每页条数，pageNumber:当前页码} | -
#### MySelect  
###### 示例
```sh
<my-select audioSrc="src" @changeValue="val=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifDisable | Boolean | false（不禁用） | 是否禁用
options | Array | [] | 下拉选项数组，包含的对象为{label:显示的文字,value:对应的值}
initValue | String, Number, Boolean | '' | 初始值
extraInfo | String | String, Object, Array, Number | 自定义扩展信息，设置后会和选中的options一起返回
placeholder | String | '' | 占位符

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
clearable | Boolean | false（不禁用） | 是否显示可以清空选项的小图标
width | String | '100%' | 宽度
height | String | '48px' | 高度
paddingRight | Number | - | input的paddingRight
paddingLeft | Number | - | input的paddingLeft
hideBorder | Boolean | false（不隐藏） | 是否隐藏border
selectActiveItemColor | String | '' | 下拉框（选择每页条数）选中项目的字体颜色，建议设置为主题色，属于项目通用配置，会影响项目中其它下拉框组件
inputHoverBorderColor | String | '' | 输入框在hover时的边框颜色
###### 监听方法  
**_changeValue_**：值改变时触发，参数为选中的option的对象，如果设置了extraInfo，参数变为{value:option对象，info:extraInfo设置的值}
#### MyUpload  
###### 示例
```sh
<my-upload ref="myUpload" :ifDisable="false" @uploadError="()=>{}"/>
---
this.$refs.myUpload.cancelUpload()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
uploadUrl | String | '' | 上传的地址
accept | String | '' | 接受上传的文件类型（thumbnail-mode 模式下此参数无效），参考input的file类型
useDiySuccess | Boolean | false（不启用） | 启用后，上传成功的监听uploadComplete直接返回接口返回的内容，不做其它逻辑判断
ifDisable | Boolean | false（不禁用） | 是否禁用
autoUpload | Boolean | false（不自动上传） | 是否在选取文件后立即进行上传
ajaxPlugin | Function | function () {} | axios对象
fileToBase64 | Boolean | false（不转换） | 文件是否转base64
setDiyAjaxDataFn | Function | function () {return null} | 仅在fileToBase64设置为true时生效，获取接口所需data的方法，参数为转好的base64编码和上传文件的后缀，默认传给接口的data为的key为file和suffix

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
btnHeight | String | '48px' | 选择文件按钮的高度
btnWidth | String | '180px' | 选择文件按钮的宽度
color | String | '' | 选择文件按钮的文字颜色
backgroundColor | String | '' | 选择文件按钮的背景颜色
backgroundColorHover | String | '' | 选择文件按钮在hover时的背景颜色
###### setDiyAjaxDataFn参数示例  
```
<my-upload :setDiyAjaxDataFn="setDiyAjaxDataFn"/>
---
setDiyAjaxDataFn(file, suffix) {
    return {
        file: file
        suffix: suffix
    }
}
```
###### accept可选值 
[accept可选值](https://www.cnblogs.com/lgx5/p/5662472.html)
###### 监听方法  
1. **_uploadComplete_**：上传成功，如果设置了useDiySuccess，返回response，否则返回response.data
2. **_uploadError_**：上传失败
3. **_getFileName_**：文件变更的监听，参数为文件的名称
4. **_getCurrentFile_**：文件变更的监听，参数为当前文件
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
startUpload | 手动开始上传 | - | - | -
cancelUpload | 取消上传 | - | - | -
getFilesArr | 获取当前已选择的文件数组 | - | - | fileList文件数组
###### 注意事项  
1. 加载此组件，只显示一个选择文件的按钮，如不需要，可设置btnHeight和btnWidth为0px
2. 如需做文件的大小校验，可以将autoUpload设为false，在getCurrentFile这个监听中做完校验后调用startUpload方法
3. 该组件暂只支持单文件上传！
4. 该组件含有插槽，可在隐藏自带上传按钮后自己写上传按钮或者其它内容
#### MyProgress  
###### 示例
```sh
<my-progress :percentage="0"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
color | String | '' | 进度条背景色（会覆盖 status 状态颜色）
strokeWidth | Number | 6 | 进度条的宽度值，单位为px
percentage | Number | 0 | 百分比，可选值为0-100
showText | Boolean | true（显示） | 是否显示进度条文字内容
#### MyRadio  
###### 示例
```sh
<my-radio :ifDisable="false" @getRadioValue="val=>{}"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifDisable | Boolean | false（不禁用） | 是否禁用
initValue | String, Number, Boolean | - | 初始值
extraInfo | String, Object, Array | - | 自定义扩展信息，设置后会和选中的Radio的值一起返回
labelArr | Array | [] | radio数组，包含的对象为{value:radio的value,text:radio显示的文字}
ifVertical | Boolean | false（横向排列） | 是否改为竖向排列

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
circleSize | String | '' | radio的大小
circleInnerSize | String | '' | 选中时的内圈的大小
fontSize | String | '' | label的文字大小
marginRight | String | '30px' | radio的margin-right
paddingLeft | String | '6px' | label的padding-right
marginBottom | String | '0' | radio的margin-bottom

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
circleBorderColor | String | '' | radio的边框颜色
circleCheckedBorderColor | String | '' | 选中时的radio的边框颜色
radioOuterBackgroundColor | String | '' | 选中时外圈的背景颜色
circleBackgroundColor | String | 'mp4' | radio的背景颜色，需要配合circleCheckedBackgroundColor使用
circleInnerBackgroundColor | String | '' | 选中时内圈的背景颜色，不设置会在disable状态时变成灰色
circleCheckedBackgroundColor | String | '' | 选中时的radio的背景颜色
showCheckBackground | Boolean | false（不添加） | 选中时，是否给选中的元素添加背景颜色，突出显示
spanColor | String | '' | radio的label的文字颜色
spanColorChecked | String | '' | 选中时label的文字颜色，需要配合spanColor使用
###### 监听方法  
**_getRadioValue_**：radio值改变时触发，参数为选中的Radio值；如果设置了extraInfo，参数变为{val:选中值，info:extraInfo设置的值}
#### MyTable  
###### 示例
```sh
<my-table ref="myTable"
          :set-title-border="true"
          :if-not-left-border="true"
          :if-not-right-border="true"
          :table-column-num="8"
          :stripe="true"
          table-diy-stripe-color="yellow"
          table-tr-background="blue"
          table-header-background="red"
          title-font-size="16px"
          title-color="#FFFFFF"
          cell-font-size="14px"
          cell-height="50px"
          title-line-height="1"
          title-height="34px"
          cell-font-color="#777777"
          border-color="#e6e6e6"
          title-border-color="#FFFFFF"
          cell-new-font-color-key="isReadFontColor"
          class="tableStyle"
          :tableSerial="{
              width: 42,
              label: '序号',
              ifCenter: true,
              cellPadding: 'cellPadding0'
          }"
          :table-title="[
                    {
                        label: '名称',
                        showOverflowTooltip: true,
                        ifCenter: true,
                        propName: 'name'
                    },
                    {
                        label: '分类',
                        showOverflowTooltip: true,
                        ifCenter: true,
                        propName: 'caseTypeName',
                        width: 149
                    },
                    {
                        label: '作者',
                        showOverflowTooltip: true,
                        ifCenter: true,
                        propName: 'authorName',
                        width: 79
                    }
                ]"
          :table-data="[
              {
                  id: '425872381732552704',
                  name: '教案数据完整性测试',
                  authorName: '???',
                  caseTypeName: '呼吸系统'
              },
              {
                  id: '425872381732552704',
                  name: '教案数据完整性测试2',
                  authorName: '???',
                  caseTypeName: '内科'
              }
          ]">
</my-table>
---
this.$refs.myTable.getTableData()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
height | Number, String | （自动高度） | Table的高度。如果值为number类型，单位则为px
maxHeight | Number, String | - | Table的最大高度。如果值为number类型，单位则为px
ifUseDrag | Boolean | false（不启用） | 是否启用行拖拽
ifOpenHighlightCurrentRow | Boolean | false（不启用） | 是否要启用单选高亮当前行
stripe | Boolean | false（不启用） | 是否创建带斑马纹的表格
tableDiyStripeColor | String | '' | 斑马纹颜色
tableTrBackground | String | '' | 行背景颜色
tableData | Array | [] | table的数据数组，包含的对象为tableTitle中propName设置的列的数据名称
tableTitle | Array | [] | 表头数组，可设置参数参照下面文档
tableSerial | Object | null | 可添加一列索引列，在最左侧，索引值从1开始，可设置参数参照下面文档

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
setTitleBorder | Boolean | false（不显示） | 是否显示表头的右边框
tableHeaderBackground | String | '' | table表头的背景颜色
titleLineHeight | String | '' | 表头的line-height
titleBorderColor | String | '' | 表头的边框颜色
titleFontSize | String | '' | 表头的文字大小
titleColor | String | '' | 表头的文字颜色

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
tableSelectionWidth | Number | 0（默认不显示） | 选择框列的宽度值，选择框列在最左侧
useOriginalSelection | Boolean | false（不使用） | 是否使用插件自带的多选框样式
tableSelectionFlex | String | 'cross:center' | 选择框列中选择框的flex样式（使用的scss-flex插件）
tableSelectionBorder | Boolean | false（不显示） | 是否显示选择框列表头的上、左边框
tableSelectionBorderRightWidth | String | '' | 选择框列的右border宽度
ifNotTableSelectionBorderBottom | Boolean | false（显示） | 是否不显示选择框列的下border

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
tableSelectionBtnHeight | String | '31px' | 选择框列全选按钮的高度
tableSelectionBtnWidth | String | '41px' | 选择框列全选按钮的宽度
tableSelectionBtnFontSize | String | '16px' | 选择框列全选按钮的字体大小
tableSelectionBtnBgc | String | '' | 选择框列全选按钮的背景颜色
ifNotUseSelectAllNotUsed | Boolean | false（不设置） | 是否设置全选按钮不添加选中/未选中效果
tableSelectionBtnColor | String | '' | 选择框列全选按钮的文字颜色
tableSelectionBtnBorderColor | String | '' | 选择框列全选按钮的边框颜色

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
openSpanMethods_first | Boolean | false（不启用） | 是否启用第一列的行合并的方法。第一列的每行，如果有相同的spanMethodsKey_first的值，则进行合并处理
spanMethodsKey_first | String | 'projectName' | 合并时第一列依据的数据的key
openSpanMethods | Boolean | false（不启用） | 是否启用第二列行合并的方法。第二列的每行，如果有相同的spanMethodsKey的值，则进行合并处理
spanMethodsKey | String | 'product' | 合并时第二列依据的数据的key

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
ifNotBorder | Boolean | false（显示） | 是否不显示表格的纵向border
ifNotLeftBorder | Boolean | false（显示） | 是否不显示表格的左border
hideLastRowBorder | Boolean | false（不隐藏） | 是否隐藏表格的下边框
hideTitleBorderTop | Boolean | false（不隐藏） | 是否隐藏表格的上边框
borderColor | String | '' | 表格的边框颜色
tableColumnNum | Number | 0 | 表格有几列，配合ifNotRightBorder使用
ifNotRightBorder | Boolean | false（显示） | 是否不显示表格的右border，需设置tableColumnNum

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
cellFontSize | String | '' | 单元格的文字大小
cellFontColor | String | '#333333' | 单元格的文字颜色
cellNewFontColorKey | String | '' | tableData中的key名，根据该key的值设置单元格的文字颜色，改变颜色的优先级最高
cellHeight | String | '' | 单元格的高度
titleHeight | String | '' | 表头单元格的高度
###### tableTitle可设置参数  
```
{
    id:启用拖拽时一定要加此属性
    label: 显示的表头名
    showOverflowTooltip: 是否启用当内容过长被隐藏时显示tooltip，默认不启用
    ifCenter: 表格内容是否居中，默认不居中
    propName: 该列的数据名称
    width: 该列宽度值
    ifSortable: 对应列是否可以排序
    cellPadding:修改单元格的左右边距，暂时支持的选项为'cellPadding26'、'cellPadding11'和'cellPadding0'
    ifDIYTitle1:自定义显示表头，对应的插槽为<template v-slot:header="slotProps">，slotProps.childrenInfo为对应该表头的一些属性，不用使用div，有默认样式
                                            {{(slotProps.childrenInfo.id}}
                                          </template>
    ifDIYContent1:自定义显示列，对应的插槽为<template v-slot:default="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                            {{(slotProps.childrenInfo.id}}
                                          </template>
    ifDIYContent2:自定义显示列，对应的插槽为<template v-slot:other1="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                            {{(slotProps.childrenInfo.id}}
                                          </template>
    ifDIYContent3:自定义显示列，对应的插槽为<template v-slot:other3="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                            {{(slotProps.childrenInfo.id}}
                                          </template>
    ifDIYContent4:自定义显示列，对应的插槽为<template v-slot:other4="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                            {{(slotProps.childrenInfo.id}}
                                          </template>
    ifDIYContent5:自定义显示列，对应的插槽为<template v-slot:other5="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                            {{(slotProps.childrenInfo.id}}
                                          </template>
}
```
###### tableSerial可设置参数   
```
{
  width: 该列宽度值,
  label: 显示的表头名,
  ifCenter: 表格内容是否居中，默认不居中,
  cellPadding:修改单元格的左右边距，暂时支持的选项为'cellPadding26'、'cellPadding11'和'cellPadding0'
}
```
###### 监听方法  
1. **_dragEnd_**：拖拽结束
2. **_selectionChange_**：选择框选中的监听，参数为选中的tableData中的对象数组
3. **_selectCurrentVal_**：当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请设置ifOpenHighlightCurrentRow为true，参数为currentRow
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
getTableData | 获取当前table的tableData | - | - | tableData
#### MyTimeline  
###### 示例
```sh
<my-timeline :activities="[]"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
activities | Array | [] | 展示的数据数组,数组中的对象为{width:自定义宽度（带单位），默认为100%，content:显示的内容}
#### VerticalNavMenu  
###### 示例
```sh
<vertical-nav-menu width="260px"
                   item-height="44px"
                   icon-margin-right="6px"
                   item-padding-right="16px"
                   item-padding-left="24px"
                   sub-item-padding-left="40px"
                   :menu-list="[{
                        toUrl: 'home',
                        label: '首页',
                        iconClass: 'icon-shouye'
                    },
                    {
                        label: '基础参数维护',
                        iconClass: '1',
                        children: [
                            {
                                toUrl: 'interrogation',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'aaa',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'interrogation3',
                                label: '问诊项目'
                            }
                        ]
                    },
                    {
                        toUrl: 'home2',
                        label: '首页2',
                        iconClass: '1'
                    },
                    {
                        label: '基础参数维护',
                        iconClass: '2',
                        children: [
                            {
                                toUrl: 'interrogation4',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'interrogation5',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'interrogation6',
                                label: '问诊项目'
                            }
                        ]
                    }]"
                   arrow-icon-height="6px"
                   arrow-icon-width="11px"
                   :if-use-hover-bgc1="true"
                   :if-use-active-bgc1="true"/>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
menuList | Array | [] | 要显示的菜单的数组，对象中可设置的属性见下表
width | String | '' | 宽度
height | String | '100%' | 高度
subItemPaddingLeft | String | '20px' | 子菜单的左边距
bgcColor | String | '' | 背景颜色
fontColor | String | '' | 文字颜色
activeFontColor | String | '' | 选中的文字颜色
activeBgcColor | String | '' | 菜单被选中时的背景颜色
hoverBgcColor | String | '' | 菜单在hover时的背景颜色
itemHeight | String | '56px' | 菜单的高度
iconSize | String | '18px' | 图标的大小
iconMarginRight | String | '5px' | 图标和标题中间的间距
itemPaddingRight | String | '20px' | 菜单的padding-right
itemPaddingLeft | String | '20px' | 菜单的padding-left
arrowIconUrl | String | '' | 下拉箭头图标路径，尽量使用require
arrowIconWidth | String | '' | 下拉箭头图标宽度
arrowIconHeight | String | '' | 下拉箭头图标高度
###### menuList中对象可设置项
```
{
    ifDisable:是否禁用
    toUrl:vue-router中设置的对应的路由的name
    label:菜单显示的名称
    iconClass:菜单前的图标的class（阿里矢量库的class），不使用图标不设置此属性。例如el-icon-document
    children:有二级菜单时，子菜单数组，没有不设置此属性
}
```  
###### 注意事项  
1. 菜单的图标使用阿里巴巴矢量库的图标，font-family为font-family: "font_family" !important;
2. 菜单路径使用router中的name
#### MyTree  
###### 示例
```sh
<my-tree :treeData="[
            {
                id: 1,
                ifDIYContent1: true,
                ifFather: true,
                label: '影像',
                isSelected: false,
                children: [
                    {
                        id: 10,
                        ifFather: false,
                        ifDIYContent1: true,
                        label: '血液',
                        isSelected: false,
                        hasIcon: false,
                        children: []
                    },
                    {
                        id: 11,
                        ifFather: false,
                        ifDIYContent1: true,
                        label: '红细胞',
                        isSelected: false,
                        hasIcon: true,
                        children: []
                    }
                ]
            },
            {
                id: 2,
                ifFather: true,
                ifDIYContent1: true,
                label: '实验室',
                isSelected: false,
                children: [
                    {
                        id: 20,
                        ifFather: false,
                        ifDIYContent1: true,
                        label: '常规',
                        isSelected: false,
                        hasIcon: true,
                        children: []
                    }
                ]
            }
        ]"
         ref="myTree"
         :itemPaddingLeft="15"
         itemMarginRight="17px"
         :diyFilterFn="myFilterFn"
         itemMarginLeft="7px"
         activeItemBgColor="#eaeff0"
         :itemChildExtraPaddingLeft="29"
         leftTrianglePadding="0px"
         :changeStatusNameArr="['isSelected']"
         :showLeftTriangle="true"
         :notTriangle="true"
         :notBorderLeft="true"
         :notBorderRight="true">
    <template v-slot:default="slotProps">
        <div class="treeItem" flex="cross:center box:first">
            <div flex="cross:center">
                <div class="treeItemText">{{ slotProps.childrenInfo.label }}</div>
                <div v-if="slotProps.childrenInfo.hasIcon" class="treeItemIcon"></div>
            </div>
            <div class="operateDom" :class="{'isSelected': slotProps.childrenInfo.isSelected}">
                <div flex="cross:center main:right">
                    <div v-if="slotProps.childrenInfo.ifFather" flex="cross:center">
                        <div class="addIcon"></div>
                        <div class="addText">添加</div>
                    </div>
                    <div flex="cross:center">
                        <div class="editIcon"></div>
                        <div class="editText">编辑</div>
                    </div>
                    <div flex="cross:center">
                        <div class="deleteIcon"></div>
                        <div class="deleteText">删除</div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</my-tree>
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '' | 宽度
defaultProps | Object | {label: 'label',children: 'children'} | 可配置的选项对象{label:自定义节点名的数据的key的名称，默认为label,children:自定义子节数组的数据的key的名称，默认为children}
treeData | Array | [] | 展示数据的数组，具体设置参数参考下面文档
notExpandOnClickNode | Boolean | false（不禁用） | 是否禁用点击展开或者收缩
defaultExpandAll | Boolean | false（不展开） | 是否默认展开所有节点
ifAccordion | Boolean | false（不开启） | 手风琴模式
draggable | Boolean | false（不开启） | 是否开启拖拽功能
showCheckbox | Boolean | false（不开启） | 是否开启可选择框功能
diyFilterFn | Function | function (val, data) {if(!val) return true;return data[this.defaultProps.label].indexOf(val) !== -1} | 自定义过滤条件，返回值true为不过滤，false过滤。默认为根据label过滤，空值不过滤
hideEmpty | Boolean | false（不隐藏） | 没有内容时，是否隐藏‘暂无数据’的dom
useRowReverse | Boolean | false（不使用） | 是否使使用反向显示布局（主要在有箭头图标和复选框时使用）

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
itemsHeight | String | '45px' | 节点的高度
indent | Number | 0 | 相邻级节点间的水平缩进数值
activeItemBgColor | String | '' | 节点被选中后的背景颜色
itemMarginLeft | String | '15px' | 节点的margin-left，不包括左边展开/折叠按钮
itemMarginRight | String | '25px' | 节点的margin-right
itemPaddingLeft | Number | 0 | 节点的padding-left

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
childCheckboxMarginLeft | Number | 0 | 子节点的选择框的左边距
itemChildExtraPaddingLeft | Number | 15 | 子节点比父节点多的paddingLeft值
ifItemChangePaddingLeftToMarginLeft | Boolean | false | 设置true时子元素的padding-left改成margin-left，配合itemChildExtraPaddingLeft使用

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
borderColor | String | '' | 边框颜色
notBorderLeft | Boolean | false（不禁用） | 是否禁用左边框
notBorderRight | Boolean | false（不禁用） | 是否禁用右边框
notBorderBottom | Boolean | false（不禁用） | 是否禁用下边框

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
fontSize | String | '16px' | 文字大小
fontColor | String | '#333333' | 文字颜色
activeItemFontColor | String | '' | 节点被选中后文字的颜色
itemsHoverBgc | String | '' | 鼠标滑过时背景颜色

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
notTriangle | Boolean | false（不隐藏） | 是否隐藏右边的指示展开/收缩的箭头
showLeftTriangle | Boolean | false（不显示） | 是否显示左边的展开/收缩箭头
ifSetNoChildItemLeftTriangleNone | Boolean | false（不隐藏） | 在设置了显示左边的展开/收缩箭头时，是否将没有子节点的元素的箭头隐藏
leftTrianglePadding | String | '6px' | 左边的展开/收缩箭头的padding

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
changeStatusNameArr | Array | [] | 选中后要修改的字段的名称的数组，选中后会被设置为true，否则为false，treeData中需设置id
changeStatusNameExceptFather | Boolean | false（父级会被修改） | 设置为true时，不会去修改父级的changeStatusNameArr这些字段

参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
defaultExpandedKeys | Array | [] | 默认展开的节点的id数组
defaultCheckedKeys | Array | [] | 默认勾选的节点的id数组
###### treeData包含对象的具体参数配置
```
{
    ifDIYContent1:自定义显示内容，对应的插槽为<template v-slot:default="slotProps">，slotProps.childrenInfo为对应当前节点中的数据，slotProps.childrenLevel为对应当前节点的层数，初始是1
    disabled:设置是否禁用
    label:显示的内容，具体key名通过defaultProps配置
    children:子集的数组，具体key名通过defaultProps配置
}
```
###### 监听方法  
1. **_lastNodeClick_**：节点被点击时的回调，参数为传递给 treeData 属性的数组中该节点所对应的对象，其中itemLevel为当前节点的层数，初始为1
2. **_allowDropFn_**：拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
3. **_checkChange_**：节点选中状态发生变化时的回调，参数为选中的节点data数组
4. **_nodeDropFn_**：拖拽成功完成时触发的事件，参数为{拖拽的节点的data，放置位置节点的data，放置方式(before、after、inner)}
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 参数2 | 参数2含义 | 参数3 | 参数3含义 | 返回值
:------: | ----- | :------: | :-----: | :------: | :-----: | :------: | :-----: | ------
setCurrentNodeFn | 通过传入节点，设置某个节点的当前选中状态 | node | getNode方法得到的节点 | - | - | - | - | - 
goToFilter | 通过关键字过滤树节点(defaultProps参数中的label字段)，为空时不过滤 | key | 关键字 | - | - | - | - | - 
appendChild | 为 Tree 中的一个节点追加一个子节点 | data | 要追加的子节点的 data | parentNode | 子节点的 parent 的 data、key 或者 node | -| - | -  
deleteItem | 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性 | data | 要删除的节点的 data 或者 node | - | - | - | - | - 
getNode | 根据 data 或者 key 拿到 Tree 组件中的 node | data | 要获得 node 的 key 或者 data | - | - | node节点 | - | - 
setChecked | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 | key/data | 勾选节点的 key 或者 data | checked | boolean 类型，节点是否选中 | deep | boolean 类型，是否设同时置子节点 ，默认为 false | -  
getCheckedNodes | 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组 | leafOnly | boolean 类型，是否只是叶子节点，默认值为 false | includeHalfChecked | boolean 类型，是否包含半选节点，默认值为 false | - | - | - 
collapseAll | 全部折叠 | - | - | - | - | - | - | - 
unFoldAll | 全部展开 | - | - | - | - | -| - | -  
unFoldById | 根据id展开 | id | 节点对应的id | - | - | - | - | - 
getNodeExpandedStatus | 获取指定id节点的展开/收起状态 | id | 节点对应的id | - | - | -| - | true为展开  
###### 注意事项  
1. treeData中必须有id属性
2. 节点被点击时，如果是父节点，会有300ms的展开/收缩动画
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
this.$refs.myAudio.playAudio()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
audioSrc | String | '' | 音频地址
ifHide | Boolean | false（隐藏） | 是否隐藏音频播放控件的显示
###### 监听方法  
**_audioEnd_**：监听播放结束
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
**_myClick_**：点击了按钮
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
this.$refs.myFlvVideo.play()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '' | 播放器宽度
height | String | '' | 播放器高度
videoSrc | String | '' | 视频地址
type | String | 'mp4' | 加载的视频格式，可选'flv'或者'mp4'
###### 监听方法  
**_endedEvent_**：播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
start | 组件初始化 | notPlay | 设置true时初始化后不立即播放 | -
play | 播放 | - | - | -
pause | 暂停播放 | - | - | -
destroyFn | 组件的销毁 | - | - | -
###### 注意事项  
1. 在父组件中需要手动调用此组件的start方法进行初始化，初始化成功后将自动播放
#### MyVideo  
###### 示例
```sh
<my-video ref="myVideo" audioSrc="src" @endedEvent="()=>{}"/>
---
this.$refs.myVideo.play()
```  
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '' | 播放器宽度
height | String | '' | 播放器高度
videoSrc | String | '' | 视频地址
videoType | String | 'application/x-mpegURL' | 视频类型，还可设为video/mp4
###### 监听方法  
1. **_onPlayerReady_**：组件准备就绪的监听
2. **_endedEvent_**：播放结束
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
play | 播放 | - | - | -
pause | 暂停播放 | - | - | -
destroy | 组件的销毁 | - | - | -
###### 注意事项  
1. 需要在模版文件引入以下   
   ```sh
    <link href="https://unpkg.zhimg.com/video.js/dist/video-js.min.css" rel="stylesheet">
    <script src="https://unpkg.zhimg.com/video.js/dist/video.min.js"></script>
   ```    
2. 在vue.config.js中需要如下配置   
    ```sh
    configureWebpack: config => {
      config.externals = {
          'videojs': 'videojs'
      }
    }
    ```    
3. 在父组件中监听onPlayerReady成功后调用此组件的play方法进行播放
#### MyMask  
###### 示例
```sh
<my-mask width="450px"/>
```  
###### 插槽  
该组件共有3个插槽，分别为title（标题的dom），closeBtn（关闭按钮的dom），content（内容的dom）
```sh
<my-mask :width="width" :min-top="62" class="projectMask">
    <div slot="title" class="projectMaskTitleText" flex="cross:center">{{title}}</div>
    <div slot="closeBtn" @click="closeBtnFn" class="closeBtn"></div>
    <slot slot="content"/>
</my-mask>
``` 
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
width | String | '450px' | 弹出框的宽度
minTop | Number | 0 | 允许拖拽的最大高度
initTop | String | ''（居中） | 初始top值
bgcColor | String | 'rgba(#FFFFFF, .6)' | 遮罩背景颜色
hideShadow | Boolean | false（不取消） | 取消阴影
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
this.$refs.mySendMessageBox.sendSmsSuccess()
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
**_sendSms_**：点击了按钮
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 返回值
:------: | ----- | :------: | :-----: | ------
sendSmsSuccess | 调接口成功后调用此方法，开始倒计时并且不能点击 | - | - | -
sendSmsFail | 调接口失败后调用此方法，重置为初始状态 | - | - | -
###### 注意事项  
1. 此组件需要在父组件中手动调用组件内的方法使用
#### MySwiper  
###### 示例
```sh
<my-swiper ref="mySwiper" :slidesArr="[]" @getCurrentActiveIndex="activeIndex=>{}"/>
---
this.$refs.mySwiper.slideToIndex(index)
```  
###### 插槽
```sh
<template v-slot:default="slotProps"></template>
```  
其中slotProps.itemInfo.item为对应的数据，slotProps.itemInfo.index为对应的下标
###### 配置参数  
参数名 | 类型 | 默认值 | 含义
:------: | :-----: | :------: | -----
slidesArr | Array | [] | slide数组
slidesPerView | Number | 1 | 设置slider容器能够同时显示的slides数量，可设的值为number值或者auto
freeMode | Boolean | false（普通模式） | 普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
slideWidth | String | '' | 强制改变slide的宽度
###### 监听方法  
**_getCurrentActiveIndex_**：监听activeIndex值的变化，返回activeIndex
###### 组件方法  
方法名 | 方法功能 | 参数1 | 参数1含义 | 参数2 | 参数2含义 | 返回值
:------: | ----- | :------: | :-----: | :------: | :-----: | ------
slideToIndex | 滑动到指定index | index | 要滑动到的slide的index | - | - | -
updateSize | 这个方法会重新计算Swiper的尺寸。 | - | -| - | - | -
## 写在最后  
个人开发和维护，有需求或者bug请联系我的邮箱，看到后会第一时间回复   
Email：323247568@qq.com   
<img alt="支持一下！" src="https://raw.githubusercontent.com/fcfcfc/myImg/master/wx.jpg" width="150px"/>
<img alt="支持一下！" src="https://raw.githubusercontent.com/fcfcfc/myImg/master/zfb.jpg" width="150px"/>
