<template>
    <div class="MySelect" :class="newClass" :style="{'height': height, 'width': width}">
        <el-select
                ref="elSelect"
                :disabled="ifDisable"
                v-model="input"
                :clearable="clearable"
                :placeholder="placeholder"
                value=""
                @input="sendInputToFather()">
            <el-option
                    :key="index"
                    v-for="(item, index) in options"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    import { Select, Option } from "element-ui"
    export default {
        name: "MySelect",
        components: {
            ElSelect: Select,
            ElOption: Option
        },
        props: {
            ifDisable: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: function () {
                    return []
                }
            },
            selectActiveItemColor: {
                type: String,
                default: ''
            },
            clearable: {
                type: Boolean,
                default: false
            },
            inputHoverBorderColor: {
                type: String,
                default: ''
            },
            initValue: [String, Number, Boolean],
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '48px'
            },
            paddingLeft: [Number],
            paddingRight: [Number],
            hideBorder: {
                type: Boolean,
                default: false
            },
            extraInfo: [String, Object, Array, Number]
        },
        data() {
            return {
                input: this.initValue === 0 ? 0 : (this.initValue || ''),
                info: this.extraInfo
            }
        },
        watch: {
            initValue() {
                this.input = this.initValue === 0 ? 0 : (this.initValue || '')
            }
        },
        computed: {
            newClass() {
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                if(inputHoverBorderColor) inputHoverBorderColor = 'a_' + inputHoverBorderColor;
                return ` ${inputHoverBorderColor}`
            }
        },
        mounted() {
            if(this.paddingLeft || this.paddingLeft === 0) this.$refs.elSelect.$children[0].$el.firstElementChild.style.paddingLeft = `${this.paddingLeft}px`;
            if(this.paddingRight || this.paddingRight === 0) this.$refs.elSelect.$children[0].$el.firstElementChild.style.paddingRight = `${this.paddingRight}px`;
            if(this.hideBorder) this.$refs.elSelect.$children[0].$el.firstElementChild.style.borderWidth = 0;
            this.setCssRules()
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let selectActiveItemColor = (this.selectActiveItemColor || '').replace(/#/g, '');
                let selectActiveItemColorRule = '';
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                let inputHoverBorderColorRule = '';
                if(inputHoverBorderColor) {
                    inputHoverBorderColorRule = `.MySelect.a_${inputHoverBorderColor} .el-select .el-input > input:hover`;
                }
                if(selectActiveItemColor) {
                    selectActiveItemColorRule = `.el-select-dropdown__item.selected`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === inputHoverBorderColorRule) inputHoverBorderColorRule = '';
                    })
                })
                if(selectActiveItemColorRule) {
                    document.styleSheets[length - 1].addRule(selectActiveItemColorRule, `color: ${this.selectActiveItemColor} !important`)
                }
                if(inputHoverBorderColorRule) {
                    document.styleSheets[length - 1].addRule(inputHoverBorderColorRule, `border-color: ${this.inputHoverBorderColor}`)
                }
            },
            sendInputToFather() {
                let info = this.info;
                let selectObj = this.options.filter(item => item.value === this.input)[0] || {};
                if(info) {
                    this.$emit('changeValue', {selectObj, info})
                }else {
                    this.$emit('changeValue', selectObj)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../css/mixins";
    .MySelect {
        /deep/ .el-popper[x-placement^="bottom"] {
            margin-top: 0;
            .popper__arrow {
                display: none;
            }
            .el-select-dropdown__list {
                padding: 0;

                .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
                    background-color: #F4F4F4;
                }
            }
        }
        /deep/ .el-select-dropdown__item {
            @include myBorder(top, #efefef);
            padding: 15px;
            height: auto;

            &:hover {
                background-color: #F4F4F4;
            }
        }
        /deep/ .el-select {
            height: inherit;
            width: inherit;

            .el-input{
                height: inherit;
                font-size: inherit;
                &>input {
                    /*&:hover {
                        border-color: $inputHoverBorderColor;
                    }*/
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
                .el-icon-arrow-up:before {
                    @include absolute_center();
                    @include triangle(top, 6px, #999999);
                    content: '';
                }
                .el-input__inner {
                    border-color: #cdcdcd;
                    color: #333333;
                    height: inherit;
                }
            }
        }
    }
</style>
