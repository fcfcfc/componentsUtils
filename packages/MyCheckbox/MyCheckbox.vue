<template>
    <div :class="newClass"
         :style="{'font-size': fontSize}"
         class="myCheckbox">
        <checkbox-group ref="myCheckbox" @change="valueChange" v-model="checkboxValue">
            <checkbox v-for="(item, index) in checkboxList"
                         :style="{'margin-bottom': marginBottom, 'margin-right': marginRight}"
                         :label="item"
                         :key="index"
                         :disabled="ifDisable"/>
        </checkbox-group>
    </div>
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件（无）
     */
    /**
     * 该组件的配置项
     * ifDisable:是否禁用,默认值为false
     * spanColor:自定义旁边label的文字颜色，设置后选中时文字颜色也不变
     * ifVertical:是否改为竖向排列，默认值为false
     * checkboxList:多选框组中每个checkbox的值的数组，比如[1,2,3]
     * initCheckbox:初始值，要默认选择的checkbox的值的数组
     * showCheckBackground:选中时，是否给选中的元素添加背景颜色，突出显示，默认值为false
     * squareSize:自定义checkbox的大小（带单位）
     * squareInnerBorderSize:自定义选中时内部对勾的厚度（带单位）
     * squareInnerHeight:自定义选中时内部对勾的高度（带单位）
     * squareInnerWidth:自定义选中时内部对勾的宽度（带单位）
     * squareInnerLeft:自定义选中时内部对勾在checkbox中的相对左位置（带单位）
     * squareInnerTop:自定义选中时内部对勾在checkbox中的相对上位置（带单位）
     * squareBorderColor:自定义checkbox的边框颜色
     * squareCheckedBorderColor:自定义选中时的checkbox的边框颜色
     * squareBackgroundColor:自定义checkbox的背景颜色
     * squareCheckedBackgroundColor:自定义选中时的checkbox的背景颜色
     * extraInfo:自定义扩展信息，设置后会和选中的checkbox值数组一起返回
     * fontSize:自定义字体大小，默认为18px
     * marginBottom:自定义的margin-bottom，默认值为0
     * marginRight:自定义的margin-right，默认值为43px
     */
    /**
     * 组件的监听方法
     * getCheckboxValue:值改变时触发，参数为选中的checkbox值数组；如果设置了extraInfo，参数变为{选中值数组，extraInfo}
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    import { Checkbox, CheckboxGroup } from "element-ui"
    export default {
        name: "MyCheckbox",
        components: {
          Checkbox,
          CheckboxGroup
        },
        props: {
            ifDisable: {
                type: Boolean,
                default: false
            },
            spanColor: {
                type: String,
                default: ''
            },
            ifVertical: {
                type: Boolean,
                default: false
            },
            checkboxList: {
                type: Array,
                default: function () {
                    return []
                }
            },
            initCheckbox: {
                type: Array,
                default: function () {
                    return []
                }
            },
            showCheckBackground: {
                type: Boolean,
                default: false
            },
            squareSize: {
                type: String,
                default: ''
            },
            squareInnerHeight: {
                type: String,
                default: ''
            },
            squareInnerBorderSize: {
                type: String,
                default: ''
            },
            squareInnerWidth: {
                type: String,
                default: ''
            },
            squareInnerLeft: {
                type: String,
                default: ''
            },
            squareInnerTop: {
                type: String,
                default: ''
            },
            squareBorderColor: {
                type: String,
                default: ''
            },
            squareCheckedBorderColor: {
                type: String,
                default: ''
            },
            squareBackgroundColor: {
                type: String,
                default: ''
            },
            squareCheckedBackgroundColor: {
                type: String,
                default: ''
            },
            extraInfo: [String, Object, Array],
            fontSize: {
                type: String,
                default: '18px'
            },
            marginBottom: {
                type: String,
                default: '0'
            },
            marginRight: {
                type: String,
                default: '43px'
            }
        },
        data () {
            return {
                info: this.extraInfo,
                checkboxValue: this.initCheckbox
            };
        },
        computed: {
            myCheckbox() {
                return this.$refs.myCheckbox.$children
            },
            newClass() {
                let squareInnerHeight = this.squareInnerHeight || '';
                let squareInnerWidth = this.squareInnerWidth || '';
                let squareInnerLeft = this.squareInnerLeft || '';
                let squareInnerTop = this.squareInnerTop || '';
                let squareInnerBorderSize = this.squareInnerBorderSize || '';
                if(squareInnerHeight) squareInnerHeight = 'a_' + squareInnerHeight;
                if(squareInnerWidth) squareInnerWidth = 'b_' + squareInnerWidth;
                if(squareInnerLeft) squareInnerLeft = 'c_' + squareInnerLeft;
                if(squareInnerTop) squareInnerTop = 'd_' + squareInnerTop;
                if(squareInnerBorderSize) squareInnerBorderSize = 'e_' + squareInnerBorderSize;
                return ` ${squareInnerHeight} ${squareInnerWidth} ${squareInnerLeft} ${squareInnerTop} ${squareInnerBorderSize}`
            }
        },
        mounted() {
            this.setCssRules();
            if(this.ifVertical || this.spanColor || this.squareSize) {
                this.myCheckbox.forEach(e => {
                    let labelDom = e.$el;
                    let spanSquareDom = labelDom.firstElementChild.firstElementChild;
                    let spanTextDom = labelDom.lastElementChild;

                    if(this.squareSize) {
                        spanSquareDom.style.height = this.squareSize;
                        spanSquareDom.style.width = this.squareSize;
                        labelDom.firstElementChild.style.height = this.squareSize;
                    }
                    if(this.squareBorderColor) spanSquareDom.style.borderColor = this.squareBorderColor;
                    if(this.squareBackgroundColor) spanSquareDom.style.backgroundColor = this.squareBackgroundColor;
                    if(this.ifVertical) {
                        labelDom.style.display = 'block';
                        labelDom.style.whiteSpace = 'unset';
                        labelDom.style.marginRight = 0;
                        spanTextDom.style.lineHeight = 1.5;
                        spanTextDom.style.display = 'inline';
                        labelDom.style.padding = '4px 9px';
                    }
                    if(this.spanColor) spanTextDom.style.color = this.spanColor;
                });
            }
            this.valueChangeStyle(this.initCheckbox);
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let squareInnerHeight = this.squareInnerHeight || '';
                let squareInnerWidth = this.squareInnerWidth || '';
                let squareInnerLeft = this.squareInnerLeft || '';
                let squareInnerTop = this.squareInnerTop || '';
                let squareInnerBorderSize = this.squareInnerBorderSize || '';
                let squareInnerHeightRule = '';
                let squareInnerWidthRule = '';
                let squareInnerLeftRule = '';
                let squareInnerTopRule = '';
                let squareInnerBorderSizeRule = '';
                if(squareInnerHeight) {
                    squareInnerHeightRule = `.myCheckbox.a_${squareInnerHeight} .el-checkbox__input>.el-checkbox__inner::after`;
                }
                if(squareInnerWidth) {
                    squareInnerWidthRule = `.myCheckbox.b_${squareInnerWidth} .el-checkbox__input>.el-checkbox__inner::after`;
                }
                if(squareInnerLeft) {
                    squareInnerLeftRule = `.myCheckbox.c_${squareInnerLeft} .el-checkbox__input>.el-checkbox__inner::after`;
                }
                if(squareInnerTop) {
                    squareInnerTopRule = `.myCheckbox.d_${squareInnerTop} .el-checkbox__input>.el-checkbox__inner::after`;
                }
                if(squareInnerBorderSize) {
                    squareInnerBorderSizeRule = `.myCheckbox.e_${squareInnerBorderSize} .el-checkbox__input>.el-checkbox__inner::after`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === squareInnerHeightRule) squareInnerHeightRule = '';
                        if(rule.selectorText === squareInnerWidthRule) squareInnerWidthRule = '';
                        if(rule.selectorText === squareInnerLeftRule) squareInnerLeftRule = '';
                        if(rule.selectorText === squareInnerTopRule) squareInnerTopRule = '';
                        if(rule.selectorText === squareInnerBorderSizeRule) squareInnerBorderSizeRule = '';
                    })
                })
                if(squareInnerHeightRule) {
                    document.styleSheets[length - 1].addRule(squareInnerHeightRule, `height: ${this.squareInnerHeight} !important`);
                }
                if(squareInnerWidthRule) {
                    document.styleSheets[length - 1].addRule(squareInnerWidthRule, `width: ${this.squareInnerWidth} !important`);
                }
                if(squareInnerLeftRule) {
                    document.styleSheets[length - 1].addRule(squareInnerLeftRule, `left: ${this.squareInnerLeft} !important`);
                }
                if(squareInnerTopRule) {
                    document.styleSheets[length - 1].addRule(squareInnerTopRule, `top: ${this.squareInnerTop} !important`);
                }
                if(squareInnerBorderSizeRule) {
                    document.styleSheets[length - 1].addRule(squareInnerBorderSizeRule, `border-width: ${this.squareInnerBorderSize} !important`);
                }
            },
            valueChangeStyle(val) {
                if(!val) return;
                let indexArr = val.map(item => this.checkboxList.findIndex(e => item === e));
                if(this.showCheckBackground || this.squareCheckedBorderColor || this.squareCheckedBackgroundColor) {
                    this.myCheckbox.forEach(e => {
                        let labelDom = e.$el;
                        let spanSquareDom = labelDom.firstElementChild.firstElementChild;
                        if(this.showCheckBackground) labelDom.style.backgroundColor = 'unset';
                        if(this.ifDisable) labelDom.style.cursor = 'not-allowed';
                        if(this.squareCheckedBorderColor) spanSquareDom.style.borderColor = this.squareBorderColor || '#DCDFE6';
                        if(this.squareCheckedBackgroundColor) spanSquareDom.style.backgroundColor = this.squareBackgroundColor || '#FFFFFF';
                    });
                    indexArr.forEach(e => {
                        let labelDom = this.myCheckbox[e].$el;
                        let spanSquareDom = labelDom.firstElementChild.firstElementChild;
                        if(this.showCheckBackground) labelDom.style.backgroundColor = '#f4f4f4';
                        if(this.squareCheckedBorderColor) spanSquareDom.style.borderColor = this.squareCheckedBorderColor;
                        if(this.squareCheckedBackgroundColor) spanSquareDom.style.backgroundColor = this.squareCheckedBackgroundColor;
                    });
                }
            },
            valueChange(val) {
                let info = this.info;
                this.valueChangeStyle(val);
                if(info) {
                    this.$emit('getCheckboxValue', {val, info})
                }else {
                    this.$emit('getCheckboxValue', val)
                }
            }
        },
        watch: {
            initCheckbox: {
                handler() {
                    this.checkboxValue = this.initCheckbox
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myCheckbox {
        /deep/ .el-checkbox-group {
            font-size: inherit;
        }
        /deep/ .el-checkbox {
            font-size: inherit;
        }
        /deep/ .el-checkbox__label {
            padding-left: 6px;
            font-size: inherit;
            color: #333333;
            vertical-align: middle;
        }
        /deep/ .el-checkbox__inner {
            border-radius: 4px;
            height: 20px;
            width: 20px;

            &::after {
                border-width: 2px;
                height: 10px;
                width: 7px;
                border-color: #FFFFFF !important;
            }
        }
    }
</style>
