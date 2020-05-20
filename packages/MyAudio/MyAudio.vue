<template>
    <audio ref="myAudio"
           preload
           :src="audioSrc"
           :class="{'ifHide': ifHide}"
           controls
           controlslist="nodownload"
           oncontextmenu="return false;"
           @ended="audioEnd">
        您的浏览器不支持 audio 标签。
    </audio>
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
     * audioSrc:音频地址
     * ifHide:是否隐藏音频播放控件的显示，默认隐藏
     */
    /**
     * 组件的监听方法
     * audioEnd:监听播放结束
     */
    /**
     * 组件的方法
     * playAudio:播放
     * pauseAudio:暂停
     */
    /**
     * 需要注意的事项（无）
     */
    export default {
        name: "MyAudio",
        props: {
            audioSrc: {
                type: String,
                default: ''
            },
            ifHide: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {

            }
        },
        mounted() {
            //禁用迅雷的视频下载
            if(document.getElementsByClassName('xl-chrome-ext-bar') && document.getElementsByClassName('xl-chrome-ext-bar')[0]) document.getElementsByClassName('xl-chrome-ext-bar')[0].remove();
        },
        methods: {
            playAudio() {
                this.$refs.myAudio.play()
            },
            pauseAudio() {
                this.$refs.myAudio.pause()
            },
            audioEnd() {
                this.$emit('audioEnd')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ifHide {
        display: none;
    }
</style>