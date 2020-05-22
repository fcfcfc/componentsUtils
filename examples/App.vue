<template>
    <div id="app">
        <collapse-transition>
            <div>1.CollapseTransition</div>
        </collapse-transition>
        <component-fade-out-in>
            <div>2.ComponentFadeOutIn</div>
        </component-fade-out-in>
        <div>3.KeepOnRecordDom</div>
        <keep-on-record/>
        <div>4.MyAudio</div>
        <my-audio/>
        <div>5.MyBtn</div>
        <my-btn background-color-hover="red" :not-used="notUsed" @myClick="notUsed=true"/>
        <div>6.MyCheckbox</div>
        <my-checkbox :checkbox-list="[1,2,3]"
                     square-inner-border-size="1px"
                     square-inner-top="2px"
                     square-inner-left="5px"
                     square-inner-width="6px"
                     square-inner-height="10px"/>
        <div>7.MyDatePickerRange</div>
        <my-date-picker-range/>
        <div>8.MyFlowChart</div>
        <my-flow-chart/>
        <div>9.MyFlvVideo</div>
        <my-flv-video/>
        <div>10.MyMask</div>
        <my-mask v-show="false"/>
        <div>11.MyQRCode</div>
        <my-q-r-code/>
        <div>12.MyRate</div>
        <my-rate/>
        <div>13.MySaveToPDF</div>
        <my-save-to-p-d-f/>
        <div>14.MySendMessageBox</div>
        <my-send-message-box/>
        <div>15.MySwiper</div>
        <my-swiper/>
        <div>16.MyVideo</div>
        <MyVideo/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                notUsed: false
            }
        },
        methods: {}
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
