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
        <my-btn background-color-hover="red" :not-used="notUsed" @myClick="btnClick"/>
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
        <my-swiper ref="mySwiperDom" style="width:50%"
                   :free-mode="true"
                   slide-width="auto"
                   class="swiperStyle"
                   :use-scrollbar="true"
                   scrollbar-drag-bgc="red"
                   :slidesArr="[{}]"
                   :slidesPerView="'auto'">
            <div flex="cross:center">
                <div v-for="(item, index) in caseStatusList"
                     flex="cross:center"
                     :key="item.id">
                    <div class="caseStatusItem" flex="main-cross:center" :class="{'ifSelected':selectedStatusId===item.id}">
                        <div class="itemIndex" flex="main-cross:center">{{index}}</div>
                        <div class="itemText">{{item.label}}</div>
                    </div>
                    <div v-if="index!==caseStatusList.length-1" class="caseStatusLine"></div>
                </div>
            </div>
        </my-swiper>
        <my-swiper ref="mySwiperDom" style="width:50%"
                   :free-mode="true"
                   slide-width="auto"
                   class="swiperStyle"
                   :use-scrollbar="true"
                   scrollbar-drag-bgc="red"
                   :slidesArr="[{}]"
                   :slidesPerView="'auto'">
            <div flex="cross:center">
                <div v-for="(item, index) in caseStatusList"
                     flex="cross:center"
                     :key="item.id">
                    <div class="caseStatusItem" flex="main-cross:center" :class="{'ifSelected':selectedStatusId===item.id}">
                        <div class="itemIndex" flex="main-cross:center">{{index}}</div>
                        <div class="itemText">{{item.label}}</div>
                    </div>
                    <div v-if="index!==caseStatusList.length-1" class="caseStatusLine"></div>
                </div>
            </div>
        </my-swiper>
        <div>16.MyVideo</div>
        <my-video/>
        <div>17.MyCascade</div>
        <my-cascade :if-disable="true" input-hover-border-color="#000"/>
        <my-dialog :if-show="false" title="MyDialog" :closeFn="()=>{}">
            <div>18.MyDialog</div>
        </my-dialog>
        <div>19.MyInput</div>
        <div style="border:1px solid #000;width: 50%;">
            <my-input :ifDisableClearIcon="true"
                      :disableEnterEvent="true"
                      paddingLeft="15px"
                      fontColor="#666666"
                      :maxlength="500"
                      paddingRight="15px"
                      paddingTop="9px"
                      paddingBottom="9px"
                      textareaMinHeight="40px"
                      :textareaAutoHeightByContent="true"
                      :ifDisableBorder="true"/>
        </div>
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
        <div>27.VerticalNavMenu</div>
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
        <div>28.MyTree</div>
        <my-tree :treeData="treeData"
                 ref="myTree"
                 :itemPaddingLeft="15"
                 itemMarginRight="17px"
                 :diyFilterFn="myFilterFn"
                 itemMarginLeft="7px"
                 activeItemBgColor="#eaeff0"
                 :itemChildExtraPaddingLeft="29"
                 leftTrianglePadding="0px"
                 :changeStatusNameArr="['isSelected']"
                 :showLeftTriangle="true"
                 :notTriangle="true"
                 :notBorderLeft="true"
                 :notBorderRight="true">
            <template v-slot:default="slotProps">
                <div class="treeItem" flex="cross:center box:first">
                    <div flex="cross:center">
                        <div class="treeItemText">{{ slotProps.childrenInfo.label }}</div>
                        <div v-if="slotProps.childrenInfo.hasIcon" class="treeItemIcon"></div>
                    </div>
                    <div class="operateDom" :class="{'isSelected': slotProps.childrenInfo.isSelected}">
                        <div flex="cross:center main:right">
                            <div v-if="slotProps.childrenInfo.ifFather" flex="cross:center">
                                <div class="addIcon"></div>
                                <div class="addText">添加</div>
                            </div>
                            <div flex="cross:center">
                                <div class="editIcon"></div>
                                <div class="editText">编辑</div>
                            </div>
                            <div flex="cross:center">
                                <div class="deleteIcon"></div>
                                <div class="deleteText">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </my-tree>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                selectedStatusId: '',
                caseStatusList: [
                    {
                        id: 1,
                        label: '初始状态初始状态初始'
                    },
                    {
                        id: 2,
                        label: '开始穿刺'
                    },
                    {
                        id: 3,
                        label: '穿刺过程'
                    },
                    {
                        id: 4,
                        label: '穿刺中断'
                    },
                    {
                        id: 5,
                        label: '穿刺过程'
                    },
                    {
                        id: 6,
                        label: '穿刺中断'
                    }
                ],
                myFilterFn: (val, data) => {
                    let flag;
                    if(data.ifFather) {
                        flag = data.label.indexOf(val) !== -1 || data.children.filter(item => item.label.indexOf(val) !== -1).length > 0;
                    } else {
                        flag = data.label.indexOf(val) !== -1;
                    }
                    return flag;
                },
                notUsed: false,
                treeData: [
                    {
                        id: 1,
                        ifDIYContent1: true,
                        ifFather: true,
                        label: '影像',
                        isSelected: false,
                        children: [
                            {
                                id: 10,
                                ifFather: false,
                                ifDIYContent1: true,
                                label: '血液',
                                isSelected: false,
                                hasIcon: false,
                                children: []
                            },
                            {
                                id: 11,
                                ifFather: false,
                                ifDIYContent1: true,
                                label: '红细胞',
                                isSelected: false,
                                hasIcon: true,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        ifFather: true,
                        ifDIYContent1: true,
                        label: '实验室',
                        isSelected: false,
                        children: [
                            {
                                id: 20,
                                ifFather: false,
                                ifDIYContent1: true,
                                label: '常规',
                                isSelected: false,
                                hasIcon: true,
                                children: []
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            btnClick() {
                this.caseStatusList.push({
                    id: new Date().getTime(),
                    label: '哈哈哈'
                })
            }
        }
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
    .swiperStyle {
        width: 100%;
        padding-left: 20px;
        .caseStatusItem {
            position: relative;
            border-radius: 0 4px 4px 0;
            width: 181px;
            height: 32px;
            cursor: pointer;
            background-color: #f1f4f3;
            &:hover {
                background-color: #e1e9e6;
                .itemIndex {
                    background-color: #e1e9e6;
                }
            }
            .itemIndex {
                font-size: 14px;
                color: #333333;
                position: absolute;
                left: -15px;
                height: 30px;
                width: 30px;
                border-radius: 100%;
                background-color: #f1f4f3;
            }
            .itemText {
                max-width: 140px;
                font-size: 14px;
                color: #333333;
            }
        }
        .caseStatusLine {
            width: 32px;
            height: 1px;
            background-color: #cccccc;
        }
    }
</style>
