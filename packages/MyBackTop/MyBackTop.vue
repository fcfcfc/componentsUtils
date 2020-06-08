<template>
    <el-backtop>
        <div class="iconStyle"></div>
    </el-backtop>
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件（无）
     */
    /**
     * 该组件的配置项（无）
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项（无）
     */
    import { Backtop } from "element-ui"
    export default {
        components: {
            ElBacktop: Backtop
        },
        name: "MyBackTop"
    }
</script>

<style lang="scss" scoped>
    @import "../../css/mixins";
    .iconStyle {
        @include ub-img();
        height: 100%;
        width: 100%;
        background-image: url(fh_n.png);
        &:hover {
            background-image: url(fh_p.png);
        }
    }
</style>
