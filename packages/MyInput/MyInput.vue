<template>
    <div class="myInput" :class="newClass">
        <el-input
                :autocomplete="autoComplete"
                :style="{
                    'height': (type === 'textarea' ? (textareaUseHeight ? height : 'auto') : height),
                    'width': width
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
                :type="type"
                :show-password="type === 'password'"
                :maxlength="maxlength"
                :disabled="ifDisabled"
                :clearable="!textCenterInput">
        </el-input>
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
     * initValue:初始值
     * ifDisabled:是否禁用,默认值为false
     * placeholder:input提示信息
     * width:自定义宽度(带单位)
     * height:自定义高度，默认为48px
     * paddingLeft:自定义input内的padding-left（带单位）
     * paddingRight:自定义input内的padding-right（带单位）
     * type:input类型，text，textarea 和其他 原生 input 的 type 值，默认为text
     * maxlength:原生属性，最大输入长度
     * rows:输入框行数，只对 type="textarea" 有效
     * textCenterInput:input内的文字是否居中显示，默认为false
     * fontColor:自定义字体颜色
     * disableEnterEvent:是否禁用回车监听，默认不禁用
     * autoComplete:设置为new-password可以解决Firefox上密码输入框会自动填充密码的问题
     * extraInfo:自定义扩展信息，设置后会和选中的 Radio label 值一起返回，如果设置了extraInfo，参数变为{value:选中值，info:extraInfo设置的值}
     * ifDisableBorder:是否不显示边框，默认显示
     * ifDisableClearIcon:是否禁用删除小图标，默认显示
     * textareaUseHeight:textarea也使用height参数控制高度，默认不使用
     * backgroundColor:自定义背景颜色，默认是#FFFFFF
     * inputHoverBorderColor:输入框在hover时的边框颜色
     * ifAutofocus:原生属性，自动获取焦点
     */
    /**
     * 组件的监听方法
     * changeValue:值改变时触发，参数为input中的值
     * enterEvent:监听键盘上的回车事件
     * blurEvent:监听失去焦点事件
     * focusEvent:监听获得焦点事件
     * changeEvent:仅在输入框失去焦点或用户按下回车时触发。注意！因为在该监听中做了trim处理后更新了input值，所以若要在此监听取input值，需要根据情况重新做trim处理
     */
    /**
     * 组件的方法
     * focusFn:使 input 获取焦点
     */
    /**
     * 需要注意的事项（无）
     */
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
            fontColor: {
                type: String,
                default: ''
            },
            extraInfo: [String, Object, Array, Number]
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
                if(inputHoverBorderColor) inputHoverBorderColor = 'a_' + inputHoverBorderColor;
                return ` ${inputHoverBorderColor} ${this.ifDisableBorder ? 'disableBorder': ''} ${this.ifDisableClearIcon ? 'disableClearIcon': ''}`
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
            if(this.fontColor) myInputDom.style.color = this.fontColor;
            myInputDom.style.backgroundColor = this.backgroundColor;
            this.setCssRules();
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                let inputHoverBorderColorRule = '';
                if(inputHoverBorderColor) {
                    inputHoverBorderColorRule = `.myInput.a_${inputHoverBorderColor} .el-textarea > textarea:hover, .myInput.a_${inputHoverBorderColor} .el-textarea.is-disabled .el-input__inner:hover, .myInput.a_${inputHoverBorderColor} .el-textarea.is-disabled .el-textarea__inner:hover, .myInput.a_${inputHoverBorderColor} .el-input.is-disabled .el-input__inner:hover, .myInput.a_${inputHoverBorderColor} .el-input.is-disabled .el-textarea__inner:hover, .myInput.a_${inputHoverBorderColor} .el-input > input:hover`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === inputHoverBorderColorRule) inputHoverBorderColorRule = '';
                    })
                })
                if(inputHoverBorderColorRule) {
                    document.styleSheets[length - 1].addRule(inputHoverBorderColorRule, `border-color: ${this.inputHoverBorderColor}`)
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
                this.$emit('blurEvent')
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
        &.disableBorder /deep/ .el-input__inner {
            border: none;
        }
        &.disableClearIcon /deep/ .el-input__suffix {
            display: none;
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
                border-radius: 0;
                border-color: #cdcdcd;
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
