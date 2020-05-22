<template>
    <div class="MySelect" :style="{'height': height, 'width': width}">
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
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件（无）
     */
    /**
     * 该组件的配置项
     * $inputHoverBorderColor:input在hover时的border颜色
     * ifDisable:是否禁用,默认值为false
     * placeholder:input提示信息
     * options:下拉选项数组，包含的对象为{
                                           label:显示的文字
                                           value:对应的值
                                       }
     * clearable:是否显示可以清空选项的小图标，默认值为false
     * initValue:初始值
     * width:自定义宽度，默认为100%
     * height:自定义高度，默认为48px
     * paddingRight:自定义input中的右边距值,
     * paddingLeft:自定义input中的左边距值
     * hideBorder:是否隐藏border
     * extraInfo:自定义扩展信息，设置后会和选中的 Radio label 值一起返回
     */
    /**
     * 组件的监听方法
     * changeValue:值改变时触发，参数为options中选中的对象，如果设置了extraInfo，参数变为{selectObj:选中值，info:extraInfo设置的值}
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    export default {
        name: "MySelect",
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
            clearable: {
                type: Boolean,
                default: false
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
        mounted() {
            if(this.paddingLeft || this.paddingLeft === 0) this.$refs.elSelect.$children[0].$el.firstElementChild.style.paddingLeft = `${this.paddingLeft}px`;
            if(this.paddingRight || this.paddingRight === 0) this.$refs.elSelect.$children[0].$el.firstElementChild.style.paddingRight = `${this.paddingRight}px`;
            if(this.hideBorder) this.$refs.elSelect.$children[0].$el.firstElementChild.style.borderWidth = 0;
        },
        methods: {
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
                    &:hover {
                        border-color: $inputHoverBorderColor;
                    }
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