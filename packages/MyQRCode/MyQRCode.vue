<template>
    <vue-qr
            :logoCornerRadius="10"
            :logoScale="logoScale"
            :dotScale="1"
            :margin="0"
            :logoSrc="logoSrc"
            :text="qrText"
            :size="size">
    </vue-qr>
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
     * logoScale:用于计算 LOGO 大小的值, 过大将导致解码失败, LOGO 尺寸计算公式 logoScale*(size-2*margin), 默认 0.2
     * logoSrc:嵌入至二维码中心的 LOGO 地址
     * text:欲编码的内容
     * size:尺寸, 长宽一致, 包含外边距，不带单位的数值
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项
     * 1.logoScale不要设置的过大，否则识别不了
     * 2.需要安装以下依赖
     npm install --save vue-qr
     */
    import VueQr from 'vue-qr'
    export default {
        name: "MyQRCode",
        props: {
            logoScale: {
                type: Number,
                default: 0.2
            },
            logoSrc: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            size: {
                type: Number,
                default: 0
            }
        },
        components: {
            VueQr
        },
        data() {
            return {
                qrText: this.text
            }
        },
        watch: {
            text(n) {
                this.qrText = n;
            }
        }
    }
</script>

<style scoped>

</style>