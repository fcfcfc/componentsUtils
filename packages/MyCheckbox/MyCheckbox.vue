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
