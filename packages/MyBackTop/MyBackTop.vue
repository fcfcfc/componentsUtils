<template>
    <el-backtop>
        <div class="iconStyle"></div>
    </el-backtop>
</template>

<script>
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
