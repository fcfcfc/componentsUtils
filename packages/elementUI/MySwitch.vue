<template>
    <div class="mySwitch">
        <el-switch
                @change="valueChange"
                style="display: block"
                v-model="value2"
                active-color="#48b442"
                inactive-color="#c7c7c7"
                active-text="已启用"
                inactive-text="已禁用">
        </el-switch>
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
     * initVal:初始值
     * extraInfo:自定义扩展信息
     */
    /**
     * 组件的监听方法
     * switchVal:值改变时触发，参数为{选中值，extraInfo}
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    export default {
        name: "MySwitch",
        props: {
            initVal: [String, Boolean, Number],
            extraInfo: [String, Object, Array]
        },
        data() {
            return {
                value2: this.initVal
            }
        },
        methods: {
            valueChange(val) {
                let info = this.extraInfo;
                this.$emit('switchVal', {val, info})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mySwitch {
        /deep/ .el-switch__core {
            height: 24px;
            width: 80px !important;
            border-radius: 24px;
            &::after{
                top: 3px;
                left: 2px;
            }
        }
        /deep/ .el-switch.is-checked .el-switch__core::after {
            margin-left: -18px;
        }
        /deep/ .el-switch__label {
            font-size: 14px;
            line-height: 1;
            position: absolute;
            display: none;
            color: #fff;
        }
        /deep/ .el-switch__label.is-active {
            display: block;
        }
        /deep/ .el-switch__label--left {
            z-index: 9;
            left: 27px;
            top: 5px;
        }
        /deep/ .el-switch__label--right {
            z-index: 1001;
            left: 12px;
            top: 5px;
            margin-left: 0;
        }
    }
</style>