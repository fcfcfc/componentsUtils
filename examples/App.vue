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
        <my-date-picker-range input-hover-border-color="red"/>
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
        <my-video/>
        <div>17.MyCascader</div>
        <my-cascader :if-disable="true" input-hover-border-color="#000"/>
        <div>18.MyDialog</div>
        <my-dialog :if-show="false" title="MyDialog" :closeFn="()=>{}">
            <div>18.MyDialog</div>
        </my-dialog>
        <div>19.MyInput</div>
        <my-input :if-disabled="true" input-hover-border-color="red"/>
        <div>20.MyPagination</div>
        <my-pagination :total="25" select-active-item-color="yellow" pagination-bgc-active-color="blue" pagination-border-hover-color="red"/>
        <div>21.MySelect</div>
        <my-select input-hover-border-color="#000" select-active-item-color="red" :options="[{value:1,label:123123}]"/>
        <div>22.MyUpload</div>
        <my-upload color="red" background-color-hover="green" background-color="gray"/>
    </div>
</template>

<script>
    import MyUpload from "../packages/MyUpload/MyUpload";
    export default {
        name: 'App',
        components: {MyUpload},
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
