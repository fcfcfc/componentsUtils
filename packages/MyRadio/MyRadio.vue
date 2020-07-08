<template>
    <el-radio-group class="myRadio" :class="newClass" @change="valueChange" v-model="radio">
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
    import { RadioGroup, Radio } from "element-ui"
    export default {
        name: "MyRadio",
        components: {
            ElRadioGroup: RadioGroup,
            ElRadio: Radio
        },
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
            radioOuterBackgroundColor: {
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
            },
            newClass() {
                let circleInnerSize = this.circleInnerSize || '';
                let circleInnerBackgroundColor = (this.circleInnerBackgroundColor || '').replace(/#/g, '');
                let radioOuterBackgroundColor = (this.radioOuterBackgroundColor || '').replace(/#/g, '');
                if(circleInnerBackgroundColor) circleInnerBackgroundColor = 'a_' + circleInnerBackgroundColor;
                if(circleInnerSize) circleInnerSize = 'b_' + circleInnerSize;
                if(radioOuterBackgroundColor) radioOuterBackgroundColor = 'c_' + radioOuterBackgroundColor;
                return ` ${circleInnerBackgroundColor} ${circleInnerSize} ${radioOuterBackgroundColor}`
            }
        },
        mounted() {
            this.setCssRules();
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
            setCssRules() {
                let length = document.styleSheets.length;
                let circleInnerSize = this.circleInnerSize || '';
                let circleInnerBackgroundColor = (this.circleInnerBackgroundColor || '').replace(/#/g, '');
                let radioOuterBackgroundColor = (this.radioOuterBackgroundColor || '').replace(/#/g, '');
                let circleInnerSizeRule = '';
                let circleInnerBackgroundColorRule = '';
                let radioOuterBackgroundColorRule = '';
                if(radioOuterBackgroundColor) {
                    radioOuterBackgroundColorRule = `.myRadio.c_${radioOuterBackgroundColor} .el-radio__input.is-checked .el-radio__inner`;
                }
                if(circleInnerSize) {
                    circleInnerSizeRule = `.myRadio.b_${circleInnerSize} .el-radio__input > .el-radio__inner::after`;
                }
                if(circleInnerBackgroundColor) {
                    circleInnerBackgroundColorRule = `.myRadio.a_${circleInnerBackgroundColor} .el-radio__input > .el-radio__inner::after`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === circleInnerSizeRule) circleInnerSizeRule = '';
                        if(rule.selectorText === circleInnerBackgroundColorRule) circleInnerBackgroundColorRule = '';
                        if(rule.selectorText === radioOuterBackgroundColorRule) radioOuterBackgroundColorRule = '';
                    })
                })
                if(circleInnerSizeRule) {
                    document.styleSheets[length - 1].addRule(circleInnerSizeRule, `height: ${this.circleInnerSize} !important`);
                    document.styleSheets[length - 1].addRule(circleInnerSizeRule, `width: ${this.circleInnerSize} !important`)
                }
                if(circleInnerBackgroundColorRule) {
                    document.styleSheets[length - 1].addRule(circleInnerBackgroundColorRule, `background-color: ${this.circleInnerBackgroundColor} !important`);
                }
                if(radioOuterBackgroundColorRule) {
                    document.styleSheets[length - 1].addRule(radioOuterBackgroundColorRule, `border-color: ${this.radioOuterBackgroundColor} !important`);
                    document.styleSheets[length - 1].addRule(radioOuterBackgroundColorRule, `background-color: ${this.radioOuterBackgroundColor} !important`);
                }
            },
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
            }
        }
    }
</style>
