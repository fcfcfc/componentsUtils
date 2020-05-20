<template>
    <div class="myDialog">
        <el-dialog @close="closeFn" :width="width" :title="title" :visible.sync="ifShowStatus">
            <slot/>
        </el-dialog>
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
     * width:自定义宽度，默认为100%
     * title:自定义标题
     * ifShow:是否显示
     */
    /**
     * 组件的监听方法
     * closeFn:关闭的监听
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项
     * 1.必须在父组件中监听closeFn，设置显示隐藏的flag
     */
    export default {
        name: "MyDialog",
        props: {
            ifShow: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '50%'
            },
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                ifShowStatus: this.ifShow
            }
        },
        methods: {
            closeFn() {
                this.$emit('closeFn')
            }
        },
        watch: {
            ifShow(val) {
                this.ifShowStatus = val
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myDialog {
        
    }
</style>