<template>
    <div class="MyCascader" :class="newClass" :style="{'height': height, 'width': width}">
        <cascader
                v-model="value"
                :options="options"
                clearable
                filterable
                :disabled="ifDisable"
                :props="myProps"
                collapse-tags
                :placeholder="placeholder"
                @change="handleChange"/>
    </div>
</template>

<script>
    import { Cascader } from 'element-ui'
    export default {
        name: "MyCascade",
        components: {
            Cascader
        },
        props: {
            initVal: {
                type: Array,
                default: function () {
                    return []
                }
            },
            myProps: {
                type: Object,
                default: function () {
                    return {
                        expandTrigger: 'hover'
                    }
                }
            },
            options: {
                type: Array,
                default: function () {
                    return []
                }
            },
            inputHoverBorderColor: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '48px'
            },
            placeholder: {
                type: String,
                default: ''
            },
            ifDisable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value: this.initVal
            }
        },
        watch: {
            initVal: {
                handler(val) {
                    this.value = val;
                },
                deep: true
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
            this.setCssRules()
        },
        methods: {
            handleChange(val) {
                this.value = val;
                this.$emit('changeValue', val)
            },
            setCssRules() {
                let length = document.styleSheets.length;
                let inputHoverBorderColor = (this.inputHoverBorderColor || '').replace(/#/g, '');
                let inputHoverBorderColorRule = '';
                if(inputHoverBorderColor) {
                    inputHoverBorderColorRule = `.MyCascader.a_${inputHoverBorderColor} .el-cascader .el-input > input:hover, .MyCascader.a_${inputHoverBorderColor} .el-cascader .el-input.is-disabled .el-input__inner:hover`;
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../css/mixins";
    .MyCascader {
        /deep/ .el-cascader {
            height: inherit;
            width: inherit;
            .el-cascader__tags .el-tag {
                max-width: 70%;
            }
            .el-input{
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
            .el-input.is-disabled {
                .el-input__inner {
                    background-color: #FFFFFF;
                    border-color: #cdcdcd;
                    color: #333333;
                    cursor: not-allowed;
                }
            }
        }
    }
</style>
