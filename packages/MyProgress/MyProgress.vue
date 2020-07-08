<template>
    <div class="myProgress">
        <el-progress
            :color="color"
            :stroke-width="strokeWidth"
            :percentage="percentage"
            :show-text="showText"></el-progress>
    </div>
</template>
<script>
    import {Progress} from "element-ui"
    export default {
        name: 'MyProgress',
        components: {
            ElProgress: Progress
        },
        props: {
            color: {
                type: String,
                default: ''
            },
            strokeWidth: {
                type: Number,
                default: 6
            },
            percentage: {
                type: Number,
                default: 0
            },
            showText: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
</style>
