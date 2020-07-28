<template>
    <div class="myInput" :style="textareaAutoHeightByContent?'position: relative;':''" :class="newClass">
        <pre v-if="textareaAutoHeightByContent" class="preDom" :style="{
            'padding-top': paddingTop,
            'padding-Bottom': paddingBottom,
            'padding-left': paddingLeft,
            'padding-right': paddingRight,
            'min-height': textareaMinHeight
        }">{{input}}</pre>
        <el-input
                :autocomplete="autoComplete"
                :style="{
                    'height': textareaAutoHeightByContent ? '100%' : (type === 'textarea' ? (textareaUseHeight ? height : 'auto') : height),
                    'width': textareaAutoHeightByContent ? '100%' : width,
                    'position': textareaAutoHeightByContent ? 'absolute' : '',
                    'top': textareaAutoHeightByContent ? '0' : 'unset',
                    'left': textareaAutoHeightByContent ? '0' : 'unset',
                }"
                :autofocus="ifAutofocus"
                ref="myInput"
                :rows="rows"
                v-model="input"
                :placeholder="placeholder"
                @blur="blurEvent"
                @focus="focusEvent"
                @input="sendInputToFather()"
                @keyup.enter.native="enterEvent()"
                @change="changeEvent"
                :type="textareaAutoHeightByContent ? 'textarea' : type"
                :show-password="type === 'password'"
                :maxlength="maxlength"
                :disabled="ifDisabled"
                :clearable="!textCenterInput">
        </el-input>
    </div>
</template>

<script>
    import { Input } from "element-ui"
    export default {
        name: "MyInput",
        components: {
            ElInput: Input
        },
        props: {
            autoComplete: {
                type: String,
                default: ''
            },
            paddingLeft: {
                type: String,
                default: ''
            },
            paddingRight: {
                type: String,
                default: ''
            },
            paddingTop: {
                type: String,
                default: ''
            },
            paddingBottom: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: '#FFFFFF'
            },
            textareaUseHeight: {
                type: Boolean,
                default: false
            },
            ifDisabled: {
                type: Boolean,
                default: false
            },
            ifAutofocus: {
                type: Boolean,
                default: false
            },
            disableEnterEvent: {
                type: Boolean,
                default: false
            },
            ifDisableBorder: {
                type: Boolean,
                default: false
            },
            ifDisableClearIcon: {
                type: Boolean,
                default: false
            },
            initValue: [String, Number],
            placeholder: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            maxlength: [Number],
            rows: {
                type: Number,
                default: 2
            },
            textCenterInput: {
                type: Boolean,
                default: false
            },
            width: [String],
            height: {
                type: String,
                default: '48px'
            },
            inputHoverBorderColor: {
                type: String,
                default: ''
            },
            textareaMinHeight: {
                type: String,
                default: '46px'
            },
            textareaOverFlowHidden: {
                type: Boolean,
                default: false
            },
            fontColor: {
                type: String,
                default: ''
            },
            extraInfo: [String, Object, Array, Number],
            textareaAutoHeightByContent: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                input: this.initValue,
                info: this.extraInfo
            }
        },
        computed: {
            newClass() {
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                let textareaMinHeight = 'b_' + this.textareaMinHeight;
                if(inputHoverBorderColor) inputHoverBorderColor = 'a_' + inputHoverBorderColor;
                return `${textareaMinHeight} ${inputHoverBorderColor} ${this.ifDisableBorder ? 'disableBorder': ''} ${this.ifDisableClearIcon ? 'disableClearIcon': ''}`
            }
        },
        mounted() {
            let myInputDom = this.$refs.myInput.$el.firstElementChild;

            if(this.textCenterInput) {
                myInputDom.style.paddingRight = '15px';
                myInputDom.style.textAlign = 'center';
            }
            if(this.paddingLeft) myInputDom.style.paddingLeft = this.paddingLeft;
            if(this.paddingRight) myInputDom.style.paddingRight = this.paddingRight;
            if(this.paddingTop) myInputDom.style.paddingTop = this.paddingTop;
            if(this.paddingBottom) myInputDom.style.paddingBottom = this.paddingBottom;
            if(this.textareaOverFlowHidden || this.textareaAutoHeightByContent) myInputDom.style.overflow = 'hidden';
            if(this.fontColor) myInputDom.style.color = this.fontColor;
            myInputDom.style.backgroundColor = this.backgroundColor;
            this.setCssRules();
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let textareaMinHeight = this.textareaMinHeight;
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                let inputHoverBorderColorRule = '';
                let textareaMinHeightRule = `.myInput.b_${textareaMinHeight} .el-textarea .el-textarea__inner`;
                if(inputHoverBorderColor) {
                    inputHoverBorderColorRule = `.myInput.a_${inputHoverBorderColor} .el-textarea > textarea:hover, .myInput.a_${inputHoverBorderColor} .el-textarea.is-disabled .el-input__inner:hover, .myInput.a_${inputHoverBorderColor} .el-textarea.is-disabled .el-textarea__inner:hover, .myInput.a_${inputHoverBorderColor} .el-input.is-disabled .el-input__inner:hover, .myInput.a_${inputHoverBorderColor} .el-input.is-disabled .el-textarea__inner:hover, .myInput.a_${inputHoverBorderColor} .el-input > input:hover`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === inputHoverBorderColorRule) inputHoverBorderColorRule = '';
                        if(rule.selectorText === textareaMinHeightRule) textareaMinHeightRule = '';
                    })
                })
                if(inputHoverBorderColorRule) {
                    document.styleSheets[length - 1].addRule(inputHoverBorderColorRule, `border-color: ${this.inputHoverBorderColor}`)
                }
                if(textareaMinHeightRule) {
                    document.styleSheets[length - 1].addRule(textareaMinHeightRule, `min-height: ${textareaMinHeight} !important`)
                }
            },
            sendInputToFather() {
                let info = this.info;
                let value = this.input;
                if(info) {
                    this.$emit('changeValue', {value, info})
                }else {
                    this.$emit('changeValue', this.input)
                }
            },
            enterEvent() {
                if(!this.disableEnterEvent) this.$refs.myInput.blur();
                this.$emit('enterEvent')
            },
            blurEvent() {
                this.$emit('blurEvent', this.info)
            },
            focusEvent() {
                this.$emit('focusEvent')
            },
            changeEvent() {
                if(typeof this.input === 'string') {
                    this.input = this.input.trim();
                    this.$nextTick(() => this.sendInputToFather())
                }
                this.$emit('changeEvent')
            },
            focusFn() {
                this.$refs.myInput.focus()
            }
        },
        watch: {
            initValue() {
                this.input = this.initValue
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myInput {
        &.disableBorder /deep/ .el-input__inner, &.disableBorder /deep/ .el-textarea__inner {
            border: none;
        }
        &.disableClearIcon /deep/ .el-input__suffix {
            display: none;
        }
        .preDom {
            line-height: 1.6;
            margin: 0;
            word-break: break-all; /*解决火狐不自动换行的问题*/
            white-space: pre-wrap; /*解决火狐不自动换行的问题*/
        }
        /deep/ .el-textarea {
            font-size: inherit;
            &>textarea {
                resize: none;
                &::-webkit-input-placeholder { /* WebKit browsers */
                    color: #999999;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #999999;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #999999;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                    color: #999999;
                }
            }

            .el-textarea__inner {
                height: 100%;
                color: #333333;
                padding: 12px 15px;
                line-height: 1.6;
                border-color: #cdcdcd;
                margin: 0; /*去掉火狐下的默认样式*/
            }
        }
        /deep/ .el-textarea.is-disabled,
        /deep/ .el-input.is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #FFFFFF;
                border-color: #cdcdcd;
                color: #333333;
                cursor: not-allowed;
            }
        }
        /deep/ .el-input{
            height: inherit;
            font-size: inherit;
            &>input {
                &::-webkit-input-placeholder { /* WebKit browsers */
                    color: #999999;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #999999;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #999999;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                    color: #999999;
                }
            }

            .el-input__inner {
                border-color: #cdcdcd;
                color: #333333;
                height: inherit;
                margin: 0; /*去掉火狐下的默认样式*/
            }
        }
        /deep/ input::-webkit-outer-spin-button,
        /deep/ input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        /deep/ input[type="number"]{
            -moz-appearance: textfield;
        }
    }
</style>
