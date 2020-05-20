<template>
    <el-radio-group :class="`abc_${circleInnerSize}_${bgcText}`" @change="valueChange" v-model="radio">
        <el-radio
                :style="{'margin-right': marginRight, 'margin-bottom': marginBottom}"
                ref="myRadio"
                v-for="(item, index) in labelArr"
                :key="index"
                :disabled="ifDisable"
                :label="item.value">
            {{item.text}}
        </el-radio>
    </el-radio-group>
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
     * $radioInnerBackgroundColor:选中时内圈的背景颜色（主题色）
     * $radioOuterBackgroundColor:选中时外圈的背景颜色（主题色）
     * ifDisable:是否禁用,默认值为false
     * circleSize:自定义radio的大小（带单位）
     * circleInnerSize:自定义选中时内圈的大小（带单位）
     * circleBorderColor:自定义radio的边框颜色
     * circleCheckedBorderColor:自定义选中时的radio的边框颜色
     * circleInnerBackgroundColor:自定义选中时内圈的背景颜色，不设置会在disable状态时变成灰色
     * circleBackgroundColor:自定义radio的背景颜色，需要配合circleCheckedBackgroundColor使用
     * circleCheckedBackgroundColor:自定义选中时的radio的背景颜色
     * showCheckBackground:选中时，是否给选中的元素添加背景颜色，突出显示，默认值为false
     * spanColor:自定义旁边label的文字颜色
     * spanColorChecked:自定义选中时旁边label的文字颜色，需要配合spanColor使用
     * fontSize:自定义旁边label的文字大小（带单位）
     * ifVertical:是否改为竖向排列，默认值为false
     * marginRight:自定义radio的margin-right，默认值为30px
     * paddingLeft:自定义label的padding-right，默认值为6px
     * marginBottom:自定义radio的margin-bottom，默认值为0
     * extraInfo:自定义扩展信息，设置后会和选中的 Radio label 值一起返回
     * initValue:设定一个初始值
     * labelArr:radio数组，包含的对象为{
                                        value:radio的value
                                        text:radio显示的文字
                                      }
     */
    /**
     * 组件的监听方法
     * getRadioValue:radio值改变时触发，参数为选中的 Radio label 值；如果设置了extraInfo，参数变为{val:选中值，info:extraInfo设置的值}
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    export default {
        name: "Radio",
        props: {
            ifDisable: {
                type: Boolean,
                default: false
            },
            circleInnerSize: {
                type: String,
                default: ''
            },
            circleInnerBackgroundColor: {
                type: String,
                default: ''
            },
            circleBorderColor: {
                type: String,
                default: ''
            },
            circleCheckedBorderColor: {
                type: String,
                default: ''
            },
            circleBackgroundColor: {
                type: String,
                default: ''
            },
            circleCheckedBackgroundColor: {
                type: String,
                default: ''
            },
            spanColorChecked: {
                type: String,
                default: ''
            },
            circleSize: {
                type: String,
                default: ''
            },
            showCheckBackground: {
                type: Boolean,
                default: false
            },
            spanColor: {
                type: String,
                default: ''
            },
            fontSize: {
                type: String,
                default: ''
            },
            ifVertical: {
                type: Boolean,
                default: false
            },
            marginRight: {
                type: String,
                default: '30px'
            },
            marginBottom: {
                type: String,
                default: '0'
            },
            paddingLeft: {
                type: String,
                default: '6px'
            },
            extraInfo: [String, Object, Array],
            initValue: [String, Number, Boolean],
            labelArr: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data () {
            return {
                info: this.extraInfo,
                radio: this.initValue,
                bgcText: ''
            };
        },
        computed: {
            myRadioDom() {
                return this.$refs.myRadio
            }
        },
        mounted() {
            this.bgcText = (this.circleInnerBackgroundColor || '').substring(1);
            if(this.circleInnerSize) {
                document.styleSheets[0].addRule(`.abc_${this.circleInnerSize}_${this.bgcText} .el-radio__input > .el-radio__inner::after`, `height: ${this.circleInnerSize} !important`);
                document.styleSheets[0].addRule(`.abc_${this.circleInnerSize}_${this.bgcText} .el-radio__input > .el-radio__inner::after`, `width: ${this.circleInnerSize} !important`)
            }
            if(this.circleInnerBackgroundColor) {
                document.styleSheets[0].addRule(`.abc_${this.circleInnerSize}_${this.bgcText} .el-radio__input > .el-radio__inner::after`, `background-color: ${this.circleInnerBackgroundColor} !important`);
            }
            if(this.circleBorderColor || this.circleBackgroundColor || this.circleSize || this.ifVertical || this.spanColor || this.fontSize) {
                this.myRadioDom.forEach(e => {
                    let labelDom = e.$el;
                    let spanCircleDom = labelDom.firstElementChild.firstElementChild;
                    let spanTextDom = labelDom.lastElementChild;

                    if(this.circleSize) {
                        spanCircleDom.style.height = this.circleSize;
                        spanCircleDom.style.width = this.circleSize;
                        labelDom.firstElementChild.style.height = this.circleSize;
                    }
                    if(this.circleBorderColor) spanCircleDom.style.borderColor = this.circleBorderColor;
                    if(this.circleBackgroundColor) spanCircleDom.style.backgroundColor = this.circleBackgroundColor;
                    if(this.ifVertical) {
                        labelDom.style.display = 'block';
                        labelDom.style.whiteSpace = 'unset';
                        labelDom.style.marginRight = 0;
                        labelDom.style.lineHeight = 1.5;
                        labelDom.style.padding = '4px 9px';
                    }
                    if(this.spanColor) spanTextDom.style.color = this.spanColor;
                    if(this.fontSize) spanTextDom.style.fontSize = this.fontSize;
                    if(this.paddingLeft) spanTextDom.style.paddingLeft = this.paddingLeft;
                });
            }
            this.valueChangeStyle(this.initValue);
        },
        methods: {
            valueChangeStyle(val) {
                let index = this.labelArr.findIndex(e => e.value === val);
                if(this.showCheckBackground || this.circleCheckedBorderColor || this.circleCheckedBackgroundColor || this.spanColorChecked) {
                    this.myRadioDom.forEach(e => {
                        let labelDom = e.$el;
                        let spanCircleDom = labelDom.firstElementChild.firstElementChild;
                        let spanTextDom = labelDom.lastElementChild;
                        if(this.ifDisable) labelDom.style.cursor = 'not-allowed';
                        if(this.showCheckBackground) labelDom.style.backgroundColor = 'unset';
                        if(this.circleCheckedBorderColor) spanCircleDom.style.borderColor = this.circleBorderColor;
                        if(this.spanColorChecked) spanTextDom.style.color = this.spanColor;
                        if(this.circleCheckedBackgroundColor) spanCircleDom.style.backgroundColor = this.circleBackgroundColor;
                    });
                }
                if(index < 0) return;
                let labelDom = this.myRadioDom[index].$el;
                let spanCircleDom = labelDom.firstElementChild.firstElementChild;
                let spanTextDom = labelDom.lastElementChild;
                if(this.spanColorChecked) spanTextDom.style.color = this.spanColorChecked;
                if(this.showCheckBackground) labelDom.style.backgroundColor = '#f4f4f4';
                if(this.circleCheckedBorderColor) spanCircleDom.style.borderColor = this.circleCheckedBorderColor;
                if(this.circleCheckedBackgroundColor) spanCircleDom.style.backgroundColor = this.circleCheckedBackgroundColor;
            },
            valueChange(val) {
                let info = this.info;
                this.valueChangeStyle(val);
                if(info) {
                    this.$emit('getRadioValue', {val, info})
                }else {
                    this.$emit('getRadioValue', val)
                }
            }
        },
        watch: {
            initValue(val) {
                this.radio = val;
                this.valueChangeStyle(val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-radio {
        &:last-child {
            margin-right: 0 !important;
        }

        .el-radio__label {
            font-size: 18px;
            color: #333333;
            vertical-align: middle;
        }
        .el-radio__inner {
            height: 17px;
            width: 17px;
            &::after {
                height: 8.5px;
                width: 8.5px;
                background-color: $radioInnerBackgroundColor;
            }
        }
        .el-radio__input.is-checked .el-radio__inner {
            border-color: $radioOuterBackgroundColor;
            background-color: $radioOuterBackgroundColor;
        }
    }
</style>