<template>
    <div class="myMask" flex="main-cross:center" :style="{'background-color':  bgcColor}">
        <div :class="{'hideShadow': hideShadow}" id="myMaskContent" class="myMaskContent" flex="dir:top box:first" :style="{'width': width, 'top': initTop}">
            <div :id="myMaskTitleDom" class="myMaskTitleDom" flex="main:between cross:center box:last">
                <div class="myMaskTitle" @mousedown="mousedown">
                    <slot name="title"/>
                </div>
                <slot name="closeBtn"/>
            </div>
            <slot name="content"/>
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
     * width:弹出框的宽度
     * minTop:允许拖拽的最大高度
     * initTop:自定义初始top值，默认为空，居中
     */
    /**
     * 组件的监听方法（无）
     */
    /**
     * 组件的方法（无）
     */
    /**
     * 需要注意的事项
     * 1.该组件共有3个插槽，分别为title:标题的dom；closeBtn:关闭按钮的dom；content:内容的dom。使用方法可参考如下：
     <my-mask :width="width" :min-top="62" class="projectMask">
     <div slot="title" class="projectMaskTitleText" flex="cross:center">{{title}}</div>
     <div slot="closeBtn" @click="closeBtnFn" class="closeBtn"></div>
     <slot slot="content"/>
     </my-mask>
     */
    require('scss-flex')
    export default {
        name: "MyMask",
        props: {
            width: {
                type: String,
                default: '450px'
            },
            minTop: {
                type: Number,
                default: 0
            },
            initTop: {
                type: String,
                default: ''
            },
            bgcColor: {
                type: String,
                default: 'rgba(#FFFFFF, .6)'
            },
            hideShadow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                myMaskTitleDom: `myMaskTitleDom${new Date().getTime()}`
            }
        },
        methods: {
            mousedown(event) {
                let selectElement = document.getElementById('myMaskContent');
                let myMaskTitleDom = document.getElementById(this.myMaskTitleDom);
                let distanceX = event.clientX - selectElement.offsetLeft;
                let distanceY = event.clientY - selectElement.offsetTop;
                document.onmousemove = ev => {
                    let myEvent = ev || event;
                    let myEventTop = myEvent.clientY - distanceY;
                    let myMaskTitleDomHeight = myMaskTitleDom.offsetHeight;
                    let screenHeight = window.innerHeight;
                    if(myEventTop >= this.minTop &&
                        myEventTop <= screenHeight - myMaskTitleDomHeight - 5) selectElement.style.top = myEventTop + 'px';
                    selectElement.style.left = myEvent.clientX - distanceX + 'px';
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "css/mixins";
    .myMask {
        @include maskDom(999, rgba(#FFFFFF, .6));
        .myMaskContent {
            @include setWebkit(box-shadow, rgba(0, 0, 0, .5) 0px 0px 10px);
            position: absolute;
            &.hideShadow {
                box-shadow: none;
            }
            .myMaskTitleDom {
                width: 100%;
                .myMaskTitle {
                    cursor: move;
                }
            }
        }
    }
</style>
