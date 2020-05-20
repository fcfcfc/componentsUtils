<template>
    <div class="myFlvVideo">
        <video ref="videoElement" controls controlslist="nodownload" :width="width" :height="height">
            Your browser is too old which doesn't support HTML5 video.
        </video>
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
     * width:播放器宽度（带单位）
     * height:播放器高度（带单位）
     * videoSrc:视频地址
     * type:加载的视频格式，可选'flv'或者'mp4'，默认mp4
     */
    /**
     * 组件的监听方法
     * endedEvent:播放结束
     */
    /**
     * 组件的方法
     * start:组件初始化，参数为notPlay:设置true时初始化后不立即播放
     * play:播放
     * pause:暂停播放
     * destroyFn:组件的销毁
     */
    /**
     * 需要注意的事项
     * 1.npm install --save flv.js
     * 2.在父组件中需要手动调用此组件的start方法进行初始化，初始化成功后将自动播放
     */
    import flvJs from 'flv.js/dist/flv.min'
    export default {
        name: "MyFlvVideo",
        props: {
            width: {
                type: String,
                default: ''
            },
            height: {
                type: String,
                default: ''
            },
            videoSrc: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'mp4'
            }
        },
        data() {
            return {
                flvPlayer: null
            }
        },
        mounted() {
            if(document.getElementsByClassName('xl-chrome-ext-bar') && document.getElementsByClassName('xl-chrome-ext-bar')[0]) document.getElementsByClassName('xl-chrome-ext-bar')[0].remove(); //禁用迅雷的视频下载
        },
        methods: {
            start(notPlay) {
                if(flvJs.isSupported()) {
                    this.flvPlayer = flvJs.createPlayer({
                        type: this.type,
                        url: this.videoSrc
                    }, {
                        lazyLoad: false
                    });
                    this.flvPlayer.attachMediaElement(this.$refs.videoElement);
                    this.flvPlayer.load(); //加载
                    window.removeEventListener('ended', this.endedEventFn);
                    document.getElementsByTagName("video")[0].addEventListener("ended", this.endedEventFn, true);
                    document.getElementsByTagName("video")[0].oncontextmenu = () => false;
                    if(!notPlay) setTimeout(() => this.play(), 100)
                }
            },
            //监听播放结束
            endedEventFn() {
                this.$emit('endedEvent')
            },
            play() {
                this.flvPlayer.play();
            },
            pause() {
                this.flvPlayer.pause();
            },
            destroyFn() {
                if(this.flvPlayer) {
                    this.pause();
                    this.flvPlayer.unload();
                    this.flvPlayer.detachMediaElement();
                    this.flvPlayer.destroy();
                    this.flvPlayer = null;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>