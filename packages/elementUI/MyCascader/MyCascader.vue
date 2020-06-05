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
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件（无）
     */
    /**
     * 该组件的配置项
     * $inputHoverBorderColor:input在hover时的border颜色
     * options:下拉选项数组，包含的对象为{
                                           label:显示的文字
                                           value:对应的值
                                           children:子节点数组
                                       }
     * width:自定义宽度，默认为100%
     * height:自定义高度，默认为48px
     * placeholder:输入框提示信息
     * initVal:初始值，数组形式
     * ifDisable:是否禁用
     * inputHoverBorderColor:输入框在hover时的边框颜色
     * myProps:配置选项，默认配置为{expandTrigger: 'hover'}，具体为：{
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
     */
    /**
     * 组件的监听方法
     * changeValue:值改变时触发，参数为options中选中的对象的value数组（级联的第一级，第二级...）
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    import { Cascader } from 'element-ui'
    export default {
        name: "MyCascader",
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
    @import "../../../css/mixins";
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
