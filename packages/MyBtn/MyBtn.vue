<template>
    <div class="myBtn">
        <div :class="newClass" ref="myBtn" :style="{
            'border': (borderColor ? `1px solid ${borderColor}` : ''),
            'width': width,
            'height': height,
            'font-size': fontSize,
            'border-radius': borderRadius
            }" @click="sendInputToFather()" class="myBtnStyle" flex="main-cross:center">
            {{text}}
        </div>
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
     * $btnHoverBackgroundColor:主题背景颜色（主题色）
     * $btnBackgroundColor:hover时的主题背景颜色（主题色）
     * color:自定义按钮文字颜色
     * backgroundColor:自定义按钮背景颜色
     * backgroundColorHover:自定义按钮在hover时的背景颜色
     * notUsed:是否禁用按钮，默认不禁用
     * alwaysUse:是否在notUsed设置为true时还启用按钮的点击事件，默认不启用，比如全选按钮，有禁用状态但是点击事件可用
     * text:按钮的文字
     * width:自定义宽度，默认为100%
     * height:自定义高度，默认为48px
     * fontSize:自定义字体大小，默认为18px
     * borderRadius:自定义四边圆角大小，默认为4px
     * borderColor:自定义边框颜色，不设置不显示边框
     */
    /**
     * 组件的监听方法
     * myClick:点击了按钮
     */
    /**
     * 组件的方法（无）
     */
    import Main from "js-utils-common";

    /**
     * 需要注意的事项（无）
     */
    require('scss-flex')
    export default {
        name: "MyBtn",
        props: {
            color: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: ''
            },
            backgroundColorHover: {
                type: String,
                default: ''
            },
            notUsed: {
                type: Boolean,
                default: false
            },
            alwaysUse: {
                type: Boolean,
                default: false
            },
            text: {
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
            fontSize: {
                type: String,
                default: '18px'
            },
            borderRadius: {
                type: String,
                default: '4px'
            },
            borderColor: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            }
        },
        computed: {
            newClass() {
                let backgroundColorHover = (this.backgroundColorHover || '').replace(/#/g, '');
                if(backgroundColorHover) backgroundColorHover = 'a_' + backgroundColorHover;
                return `${this.notUsed ? 'notUsed' : ''} ${backgroundColorHover}`
            }
        },
        mounted() {
            this.setCssRules();
            let myBtnDom = this.$refs.myBtn;

            if(this.backgroundColor) myBtnDom.style.backgroundColor = this.backgroundColor;
            if(this.color) myBtnDom.style.color = this.color;
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let backgroundColorHover = (this.backgroundColorHover || '').replace(/#/g, '');
                let backgroundColorHoverRule = '';
                if(backgroundColorHover) {
                    backgroundColorHoverRule = `.myBtnStyle.a_${backgroundColorHover}:hover`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === backgroundColorHoverRule) backgroundColorHoverRule = '';
                    })
                })
                if(backgroundColorHoverRule) {
                    document.styleSheets[length - 1].addRule(backgroundColorHoverRule, `background-color: ${this.backgroundColorHover} !important`)
                }
            },
            sendInputToFather() {
                if(this.notUsed) {
                    if(!this.alwaysUse) return;
                }
                this.$emit('myClick')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myBtnStyle {
        overflow: hidden;
        line-height: 1;
        color: #FFFFFF;
        cursor: pointer;
    }
    .myBtnStyle.notUsed {
        background-color: #e2e2e2 !important;
    }
</style>
