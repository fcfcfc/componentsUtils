<template>
    <div id="app">
        <collapse-transition>
            <div>1.CollapseTransition</div>
        </collapse-transition>
        <component-fade-out-in>
            <div>2.ComponentFadeOutIn</div>
        </component-fade-out-in>
        <div>3.MyAudio</div>
        <my-audio/>
        <div>4.MyBackTop</div>
        <my-back-top/>
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
        /////todo:<div>15.MySwiper</div>
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
        <div>23.MyProgress</div>
        <my-progress :percentage="20" color="blue"/>
        <div>24.MyRadio</div>
        <my-radio :label-arr="[{value:1,text:111},{value:2,text:222}]" radio-outer-background-color="black" circle-inner-background-color="red" circle-inner-size="1px"/>
        <div>25.MyTable</div>
        <my-table ref="myTable"
                  :set-title-border="true"
                  :if-not-left-border="true"
                  :if-not-right-border="true"
                  :table-column-num="8"
                  :stripe="true"
                  table-diy-stripe-color="yellow"
                  table-tr-background="blue"
                  table-header-background="red"
                  title-font-size="16px"
                  title-color="#FFFFFF"
                  cell-font-size="14px"
                  cell-height="50px"
                  title-line-height="1"
                  title-height="34px"
                  cell-font-color="#777777"
                  border-color="#e6e6e6"
                  title-border-color="#FFFFFF"
                  cell-new-font-color-key="isReadFontColor"
                  class="tableStyle"
                  :tableSerial="{
                      width: 42,
                      label: '序号',
                      ifCenter: true,
                      cellPadding: 'cellPadding0'
                  }"
                  :table-title="[
                            {
                                label: '病例名称',
                                showOverflowTooltip: true,
                                ifCenter: true,
                                propName: 'name'
                            },
                            {
                                label: '分类',
                                showOverflowTooltip: true,
                                ifCenter: true,
                                propName: 'caseTypeName',
                                width: 149
                            },
                            {
                                label: '作者',
                                showOverflowTooltip: true,
                                ifCenter: true,
                                propName: 'authorName',
                                width: 79
                            }
                        ]"
                  :table-data="[
                      {
                          id: '425872381732552704',
                          name: '教案数据完整性测试病例(治疗原则)',
                          authorName: '???',
                          caseTypeName: '内科/呼吸系统疾病'
                      },
                      {
                          id: '425872381732552704',
                          name: '教案数据完整性测试病例(治疗原则)',
                          authorName: '???',
                          caseTypeName: '内科/呼吸系统疾病'
                      }
                  ]">
        </my-table>
        <div>26.MyTimeline</div>
        <my-timeline :activities="[
            {
                width: '20px',
                content: '123'
            }
        ]"/>
        <my-tool-tip content="MyToolTip" position="left-end">
            <div>27.MyToolTip</div>
        </my-tool-tip>
        <div>28.VerticalNavMenu</div>
        <vertical-nav-menu width="260px"
                           item-height="44px"
                           icon-margin-right="6px"
                           item-padding-right="16px"
                           item-padding-left="24px"
                           sub-item-padding-left="40px"
                           :menu-list="[
                    {
                        toUrl: 'home',
                        label: '首页',
                        iconClass: 'icon-shouye'
                    },
                    {
                        label: '基础参数维护',
                        iconClass: '1',
                        children: [
                            {
                                toUrl: 'interrogation',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'aaa',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'interrogation3',
                                label: '问诊项目'
                            }
                        ]
                    },
                    {
                        toUrl: 'home2',
                        label: '首页2',
                        iconClass: '1'
                    },
                    {
                        label: '基础参数维护',
                        iconClass: '2',
                        children: [
                            {
                                toUrl: 'interrogation4',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'interrogation5',
                                label: '问诊项目'
                            },
                            {
                                toUrl: 'interrogation6',
                                label: '问诊项目'
                            }
                        ]
                    },
                ]"
                           arrow-icon-height="6px"
                           arrow-icon-width="11px"
                           :if-use-hover-bgc1="true"
                           :if-use-active-bgc1="true"

        />
        <div>29.MyTree</div>
        <my-tree active-item-bg-color="red"
                 active-item-font-color="blue"
                 items-hover-bgc="yellow"
                :show-left-triangle="true"
                 :not-triangle="true"
                 :tree-data="[
                    {
                        id: 1,
                        isSelected: false,
                        toUrl: 'home',
                        label: '首页',
                        iconUrl: '1',
                        children: [],
                    },
                    {
                        id: 2,
                        isSelected: false,
                        label: '基础参数维护',
                        iconUrl: '2',
                        children: [
                            {
                                id: 20,
                                isSelected: false,
                                toUrl: 'interrogation',
                                label: '问诊项目',
                                children: []
                            },
                            {
                                id: 21,
                                isSelected: false,
                                toUrl: 'physicalExamination',
                                label: '体格检查项目',
                                children: []
                            },
                            {
                                id: 22,
                                isSelected: false,
                                toUrl: 'auxiliary',
                                label: '辅助项目检查',
                                children: []
                            },
                            {
                                id: 23,
                                isSelected: false,
                                toUrl: 'treatment',
                                label: '治疗项目',
                                children: []
                            },
                            {
                                id: 24,
                                isSelected: false,
                                toUrl: 'case',
                                label: '病例分类',
                                children: []
                            }
                        ]
                    }
                ]"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
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
