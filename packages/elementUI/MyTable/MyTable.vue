<template>
    <div class="myTable" :class="newClass">
        <div v-if="tableSelectionWidth && !useOriginalSelection"
             :style="{'width': `${tableSelectionWidth}px`, 'border-color': borderColor, 'border-right-width': tableSelectionBorderRightWidth}"
             :flex="tableSelectionFlex"
             ref="selectionDiv"
             class="selectionDiv">
            <my-btn
                    :always-use="true"
                    :not-used="selectAllNotUsed"
                    text="全选"
                    :border-color="tableSelectionBtnBorderColor"
                    :color="tableSelectionBtnColor"
                    :width="tableSelectionBtnWidth"
                    :height="tableSelectionBtnHeight"
                    :font-size="tableSelectionBtnFontSize"
                    :background-color="tableSelectionBtnBgc"
                    @myClick="selectAll()"/>
        </div>
        <el-table
                @current-change="handleCurrentChange"
                :highlight-current-row="ifOpenHighlightCurrentRow"
                :height="height"
                :max-height="maxHeight"
                :row-key="(ifUseDrag ? 'id' : '')"
                ref="myTable"
                :cell-style="cellStyleFn"
                :stripe="stripe"
                @select-all="clearSelection"
                @selection-change="handleSelectionChange"
                :data="dataArr"
                @row-click="selectOne"
                :header-cell-style="headerCellStyleFn"
                :span-method="objectSpanMethod"
                :header-cell-class-name="headerCellClassNameFn"
                :border="!ifNotBorder"
                style="width: 100%;">
            <el-table-column
                    align="center"
                    v-if="tableSelectionWidth"
                    type="selection"
                    :width="tableSelectionWidth"
                    :class-name="(ifNotTableSelectionBorderBottom ? 'selectionStyle setTitleHeightFlag notBorderBottom' : 'selectionStyle setTitleHeightFlag')">
            </el-table-column>
            <el-table-column
                    v-if="tableSerial"
                    :width="tableSerial.width"
                    :label="tableSerial.label"
                    header-align="center"
                    type="index"
                    :class-name="[(tableSerial.ifCenter ? 'textCenter titleStyle setTitleHeightFlag serialTh' : 'titleStyle setTitleHeightFlag serialTh'), `${tableSerial.cellPadding}`].join(' ')">
            </el-table-column>
            <el-table-column
                    :sortable="item.ifSortable"
                    :width="item.width"
                    v-for="(item, index) in tableTitle"
                    :key="index"
                    :label="item.label"
                    header-align="center"
                    :show-overflow-tooltip="item.showOverflowTooltip"
                    :class-name="[(item.ifCenter ? 'textCenter titleStyle setTitleHeightFlag' : 'titleStyle setTitleHeightFlag'), `${item.cellPadding} setTitleHeightFlag`].join(' ')"
                    :prop="item.propName">
                <template slot="header" slot-scope="scope">
                    <slot name="header" :childrenInfo="scope.column" v-if="item.ifDIYTitle1"/>
                    <span v-else>{{scope.column.label}}</span>
                </template>
                <template slot-scope="scope">
                    <slot :childrenInfo="scope.row" v-if="item.ifDIYContent1"/>
                    <slot name="other1" :childrenInfo="scope.row" v-else-if="item.ifDIYContent2"/>
                    <slot name="other3" :childrenInfo="scope.row" v-else-if="item.ifDIYContent3"/>
                    <slot name="other4" :childrenInfo="scope.row" v-else-if="item.ifDIYContent4"/>
                    <slot name="other5" :childrenInfo="scope.row" v-else-if="item.ifDIYContent5"/>
                    <span v-else>{{scope.row[item.propName]}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件
     * @/utils/js/main
     * @/utils/components/MyBtn
     */
    /**
     * 该组件的配置项
     * tableHeaderBackground:自定义table表头的背景颜色
     * height:Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
     * maxHeight:Table 的最大高度。合法的值为数字或者单位为 px 的高度。
     * tableData:table的数据数组，包含的对象为tableTitle中propName设置的列的数据名称
     * tableTitle:表头数组，包含的对象为{
                                            id:启用拖拽时一定要加此属性
                                            label: 显示的表头名
                                            showOverflowTooltip: 是否启用当内容过长被隐藏时显示tooltip，默认不启用
                                            ifCenter: 表格内容是否居中，默认不居中
                                            propName: 该列的数据名称
                                            width: 该列宽度值
                                            ifSortable: 对应列是否可以排序
                                            cellPadding:修改单元格的左右边距，暂时支持的选项为'cellPadding26'、'cellPadding11'和'cellPadding0'
                                            ifDIYTitle1:自定义显示表头，对应的插槽为<template v-slot:header="slotProps">，slotProps.childrenInfo为对应该表头的一些属性，不用使用div，有默认样式
                                                                                    {{(slotProps.childrenInfo.id}}
                                                                                  </template>
                                            ifDIYContent1:自定义显示列，对应的插槽为<template v-slot:default="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                                                                    {{(slotProps.childrenInfo.id}}
                                                                                  </template>
                                            ifDIYContent2:自定义显示列，对应的插槽为<template v-slot:other1="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                                                                    {{(slotProps.childrenInfo.id}}
                                                                                  </template>
                                            ifDIYContent3:自定义显示列，对应的插槽为<template v-slot:other3="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                                                                    {{(slotProps.childrenInfo.id}}
                                                                                  </template>
                                            ifDIYContent4:自定义显示列，对应的插槽为<template v-slot:other4="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                                                                    {{(slotProps.childrenInfo.id}}
                                                                                  </template>
                                            ifDIYContent5:自定义显示列，对应的插槽为<template v-slot:other5="slotProps">，slotProps.childrenInfo为对应行的tableData中的数据
                                                                                    {{(slotProps.childrenInfo.id}}
                                                                                  </template>
                                      }
     * tableSerial:可添加一列索引列，在最左侧，索引值从1开始，包含的对象为{
                                                  width: 该列宽度值,
                                                  label: 显示的表头名,
                                                  ifCenter: 表格内容是否居中，默认不居中,
                                                  cellPadding:修改单元格的左右边距，暂时支持的选项为'cellPadding26'、'cellPadding11'和'cellPadding0'
                                              }
     * tableSelectionWidth:选择框列的宽度值，默认为0不显示，选择框列在最左侧
     * useOriginalSelection:是否使用插件原生的多选框样式，默认为false
     * tableSelectionFlex:自定义选择框列中选择框的flex样式，默认为cross:center
     * tableSelectionBorder:是否显示选择框列表头的上、左边框，默认不显示
     * tableSelectionBorderRightWidth:自定义选择框列的右border宽度（带单位）
     * tableSelectionBtnHeight:选择框列全选按钮的高度（带单位），默认为31px
     * tableSelectionBtnWidth:选择框列全选按钮的宽度（带单位），默认为41px
     * tableSelectionBtnFontSize:选择框列全选按钮的字体大小（带单位），默认为16px
     * tableSelectionBtnBgc:自定义选择框列全选按钮的背景颜色
     * ifNotUseSelectAllNotUsed:是否设置全选按钮不添加选中/未选中效果
     * tableSelectionBtnColor:自定义选择框列全选按钮的字体颜色
     * tableSelectionBtnBorderColor:自定义选择框列全选按钮的边框颜色
     * ifNotTableSelectionBorderBottom:是否不显示选择框列的下border，默认显示
     * openSpanMethods_first:是否启用第一列行合并的方法，默认不启用。第二列的每行，如果有相同值，则进行合并处理
     * spanMethodsKey_first:第一列的数据key，默认为projectName
     * openSpanMethods:是否启用第二列行合并的方法，默认不启用。第二列的每行，如果有相同值，则进行合并处理
     * spanMethodsKey:第二列的数据key，默认为product
     * ifNotBorder:是否不显示表格的纵向border，默认显示
     * ifNotLeftBorder:是否不显示表格的左border，默认显示
     * setTitleBorder:是否显示表头的右边框，默认不显示
     * hideLastRowBorder:是否隐藏表格的下边框，默认不隐藏
     * hideTitleBorderTop:是否隐藏表格的上边框，默认不隐藏
     * titleLineHeight:自定义表头的line-height
     * ifUseDrag:是否启用行拖拽，默认不启用
     * borderColor:自定义表格的边框颜色
     * titleBorderColor:自定义表头的边框颜色
     * titleFontSize:自定义表头的字体大小（带单位）
     * titleColor:自定义表头的字体颜色
     * cellFontSize:自定义单元格的字体大小（带单位）
     * cellFontColor:自定义单元格的字体颜色，默认#333333
     * cellNewFontColorKey:自定义单元格的字体颜色，data中定义的key，渲染表格时将指定的单元格改成该颜色
     * cellHeight:自定义单元格的高度
     * titleHeight:自定义表头单元格的高度
     * ifOpenHighlightCurrentRow:是否要开始单选高亮当前行
     * stripe:是否创建带斑马纹的表格，默认不启用
     * tableTrBackground:自定义行背景颜色
     * tableDiyStripeColor:自定义的斑马纹颜色
     * tableColumnNum:表格有几列，配合ifNotRightBorder使用
     * ifNotRightBorder:是否不显示表格的右border，默认显示，需设置tableColumnNum
     */
    /**
     * 组件的监听方法
     * dragEnd:拖拽结束
     * selectionChange:选择框选中的监听，参数为选中的tableData中的对象数组
     * selectCurrentVal:当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请设置ifOpenHighlightCurrentRow为true，参数为currentRow
     */
    /**
     * 组件的方法
     * getTableData:获取当前table的tableData
     */
    /**
     * 需要注意的事项（无）
     */
    import Main from 'js-utils-common'
    import MyBtn from "../../MyBtn";
    import { Table, TableColumn } from "element-ui"
    export default {
        name: "MyTable",
        components: {
            MyBtn,
            ElTable: Table,
            ElTableColumn: TableColumn
        },
        props: {
            height: [Number, String],
            maxHeight: [Number, String],
            tableData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            tableTitle: {
                type: Array,
                default: function () {
                    return []
                }
            },
            tableSerial: {
                type: Object,
                default: function () {
                    return null
                }
            },
            tableSelectionWidth: {
                type: Number,
                default: 0
            },
            tableColumnNum: {
                type: Number,
                default: 0
            },
            tableSelectionFlex: {
                type: String,
                default: 'cross:center'
            },
            cellNewFontColorKey: {
                type: String,
                default: ''
            },
            tableHeaderBackground: {
                type: String,
                default: ''
            },
            titleBorderColor: {
                type: String,
                default: ''
            },
            titleLineHeight: {
                type: String,
                default: ''
            },
            tableSelectionBorder: {
                type: Boolean,
                default: false
            },
            ifNotRightBorder: {
                type: Boolean,
                default: false
            },
            tableDiyStripeColor: {
                type: String,
                default: ''
            },
            stripe: {
                type: Boolean,
                default: false
            },
            openSpanMethods: {
                type: Boolean,
                default: false
            },
            tableTrBackground: {
                type: String,
                default: ''
            },
            spanMethodsKey: {
                type: String,
                default: 'product'
            },
            openSpanMethods_first: {
                type: Boolean,
                default: false
            },
            spanMethodsKey_first: {
                type: String,
                default: 'projectName'
            },
            ifNotBorder: {
                type: Boolean,
                default: false
            },
            ifNotLeftBorder: {
                type: Boolean,
                default: false
            },
            setTitleBorder: {
                type: Boolean,
                default: false
            },
            hideLastRowBorder: {
                type: Boolean,
                default: false
            },
            hideTitleBorderTop: {
                type: Boolean,
                default: false
            },
            ifNotTableSelectionBorderBottom: {
                type: Boolean,
                default: false
            },
            ifUseDrag: {
                type: Boolean,
                default: false
            },
            useOriginalSelection: {
                type: Boolean,
                default: false
            },
            ifNotUseSelectAllNotUsed: {
                type: Boolean,
                default: false
            },
            ifOpenHighlightCurrentRow: {
                type: Boolean,
                default: false
            },
            borderColor: {
                type: String,
                default: ''
            },
            titleFontSize: {
                type: String,
                default: ''
            },
            titleColor: {
                type: String,
                default: ''
            },
            cellFontSize: {
                type: String,
                default: ''
            },
            cellFontColor: {
                type: String,
                default: '#333333'
            },
            cellHeight: {
                type: String,
                default: ''
            },
            titleHeight: {
                type: String,
                default: ''
            },
            tableSelectionBorderRightWidth: {
                type: String,
                default: ''
            },
            tableSelectionBtnBgc: {
                type: String,
                default: ''
            },
            tableSelectionBtnFontSize: {
                type: String,
                default: '16px'
            },
            tableSelectionBtnHeight: {
                type: String,
                default: '31px'
            },
            tableSelectionBtnWidth: {
                type: String,
                default: '41px'
            },
            tableSelectionBtnColor: {
                type: String,
                default: ''
            },
            tableSelectionBtnBorderColor: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                //合并规则：数组中的每一项，代表该行要合并的行数，1为不合并，显示1行，3为将3行合并，0代表被合并的行
                spanMethodArr: [], //第二列的合并规则
                spanMethodArr_first: [], //第一列的合并规则
                selectArr: [],
                dataArr: this.tableData,
                ifDrag: false,
                sortableObj: null
            };
        },
        computed: {
            newClass() {
                let tableTrBackground = (this.tableTrBackground || '').replace(/#/g, '');
                let tableHeaderBackground = (this.tableHeaderBackground || '').replace(/#/g, '');
                let tableDiyStripeColor = (this.tableDiyStripeColor || '').replace(/#/g, '');
                if(tableHeaderBackground) tableHeaderBackground = 'a_' + tableHeaderBackground;
                if(tableTrBackground) tableTrBackground = 'b_' + tableTrBackground;
                if(tableDiyStripeColor) tableDiyStripeColor = 'c_' + tableDiyStripeColor;
                return ` ${tableHeaderBackground} ${tableTrBackground} ${tableDiyStripeColor}`
            },
            myTableComponents() {
                return this.$refs.myTable;
            },
            selectAllNotUsed() {
                return !this.ifNotUseSelectAllNotUsed && ((this.selectArr.length !== this.dataArr.length) || this.selectArr.length === 0)
            }
        },
        mounted() {
            let empty_block = this.myTableComponents.$el.getElementsByClassName('el-table__empty-block')[0];
            if(this.titleHeight) this.$nextTick(() => {
                let tableTitles = this.myTableComponents.$el.children[1].children[0].getElementsByClassName('setTitleHeightFlag');
                for(let i = 0; i < tableTitles.length; i++) {
                    tableTitles[i].style.padding = '0';
                    tableTitles[i].style.height = this.titleHeight;
                }
            });
            this.setCssRules();
            this.$nextTick(() => {
                this.setDiyBorderColor();
                this.serialThStyle();
            });
            if(this.ifUseDrag) Main.initMySortable('el-table__body-wrapper tbody', (newIndex, oldIndex) => {
                this.ifDrag = false;
                const currRow = this.dataArr.splice(oldIndex, 1)[0];
                this.dataArr.splice(newIndex, 0, currRow);
                this.$nextTick(() => this.$emit('dragEnd'))
            }, () => this.ifDrag = true);
            if(this.hideLastRowBorder && empty_block) empty_block.style.borderBottom = 'none';
            if(this.cellHeight && empty_block) empty_block.firstElementChild.style.lineHeight = this.cellHeight;
            if(this.tableSelectionWidth && !this.useOriginalSelection) {
                this.$nextTick(() => this.$refs.selectionDiv.style.height = `${this.myTableComponents.$el.children[1].offsetHeight - (this.ifNotTableSelectionBorderBottom ? 0 : 1)}px`)
            }
            if(this.tableSelectionBorder && !this.useOriginalSelection) {
                this.$refs.selectionDiv.style.borderLeft = `1px solid ${this.borderColor}`;
                this.$refs.selectionDiv.style.borderTop = `1px solid ${this.borderColor}`;
            }
            if(this.ifNotLeftBorder) this.myTableComponents.$el.style.borderLeft = 'none'
        },
        watch: {
            ifUseDrag() {
                if(!this.sortableObj) return;
                let state = this.sortableObj.option("disabled");
                this.sortableObj.option("disabled", !state);
            },
            dataArr: {
                handler(val) {
                    if(this.openSpanMethods) this.spanMethodArr = this.getSpanMethodArr(val, this.spanMethodsKey);
                    if(this.openSpanMethods_first) this.spanMethodArr_first = this.getSpanMethodArr(val, this.spanMethodsKey_first);
                    this.$nextTick(() => {
                        this.setDiyBorderColor();
                        this.serialThStyle();
                    });
                },
                deep: true
            },
            tableData: {
                handler(val) {
                    this.dataArr = val;
                    if(this.hideLastRowBorder && val.length === 0) {
                        this.$nextTick(() => {
                            let empty_block = this.myTableComponents.$el.getElementsByClassName('el-table__empty-block')[0];
                            empty_block.style.border = 'none';
                        })
                    }
                },
                deep: true
            }
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let tableHeaderBackground = (this.tableHeaderBackground || '').replace(/#/g, '');
                let tableTrBackground = (this.tableTrBackground || '').replace(/#/g, '');
                let tableDiyStripeColor = (this.tableDiyStripeColor || '').replace(/#/g, '');
                let tableHeaderBackgroundRule = '';
                let tableTrBackgroundRule = '';
                let tableDiyStripeColorRule = '';
                if(tableHeaderBackground) {
                    tableHeaderBackgroundRule = `.myTable.a_${tableHeaderBackground} table th.titleStyle, .myTable.a_${tableHeaderBackground} table th.selectionStyle`;
                }
                if(tableTrBackground) {
                    tableTrBackgroundRule = `.myTable.b_${tableTrBackground} .el-table tr`;
                }
                if(tableDiyStripeColor) {
                    tableDiyStripeColorRule = `.myTable.c_${tableDiyStripeColor} .el-table--striped .el-table__body tr.el-table__row--striped td`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === tableHeaderBackgroundRule) tableHeaderBackgroundRule = '';
                        if(rule.selectorText === tableTrBackgroundRule) tableTrBackgroundRule = '';
                        if(rule.selectorText === tableDiyStripeColorRule) tableDiyStripeColorRule = '';
                    })
                })
                if(tableHeaderBackgroundRule) {
                    document.styleSheets[length - 1].addRule(tableHeaderBackgroundRule, `background-color: ${this.tableHeaderBackground}`)
                }
                if(tableTrBackgroundRule) {
                    document.styleSheets[length - 1].addRule(tableTrBackgroundRule, `background-color: ${this.tableTrBackground}`)
                }
                if(tableDiyStripeColorRule) {
                    document.styleSheets[length - 1].addRule(tableDiyStripeColorRule, `background-color: ${this.tableDiyStripeColor}`)
                }
            },
            //根据table数据，得到合并规则数组spanMethodArr
            getSpanMethodArr(arr, keyName) {
                let productNameArr = arr.map(item => item[keyName]);
                let productNumArr = productNameArr.map((item, index) => Main.getCountOccurrences(productNameArr, item, index));
                let flag = 0;

                //将相邻项的第一项数字保留，之后的变为0
                return productNumArr.map(item => {
                    let num = item;
                    if(item > 1) {
                        if(flag === 0) {
                            num = item;
                            flag = item - 1;
                        }else if(flag > 0){
                            num = 0;
                            flag --;
                        }
                    }
                    return num;
                })
            },
            objectSpanMethod({rowIndex, columnIndex }) {
                if(this.ifDrag) return {
                    rowspan: 1,
                    colspan: 1
                };
                if(this.spanMethodArr.length === 0 && this.spanMethodArr_first.length === 0) return {
                    rowspan: 1,
                    colspan: 1
                };
                //根据合并规则，对第二列的每行进行合并处理
                if (columnIndex === 1 && this.spanMethodArr.length > 0) {
                    const _row = this.spanMethodArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
                //根据合并规则，对第二列的每行进行合并处理
                if (columnIndex === 0 && this.spanMethodArr_first.length > 0) {
                    const _row = this.spanMethodArr_first[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            getTableData() {
                return this.dataArr
            },
            headerCellClassNameFn() {
                if(this.setTitleBorder) return 'titleBorderStyle'
            },
            headerCellStyleFn() {
                let style = '';
                if(this.borderColor) {
                    let borderColor = this.borderColor;
                    if(this.titleBorderColor) borderColor = this.titleBorderColor;
                    style += `border-color: ${borderColor};`;
                }
                if(this.titleFontSize) style += `font-size: ${this.titleFontSize};`;
                if(this.titleColor) style += `color: ${this.titleColor};`;
                if(this.hideTitleBorderTop) style += `border-top: none;`;
                if(this.titleLineHeight) style += `line-height: ${this.titleLineHeight};`;

                return style
            },
            handleSelectionChange(tableArr) {
                this.selectArr = tableArr;
                this.$emit('selectionChange', tableArr)
            },
            selectAll() {
                this.myTableComponents.toggleAllSelection()
            },
            clearSelection() {
                if(this.tableData.length === 0) this.myTableComponents.clearSelection()
            },
            selectOne(row) {
                this.myTableComponents.toggleRowSelection(row);
            },
            cellStyleFn({row, rowIndex, columnIndex}) {
                let style = '';

                if(this.ifNotRightBorder) style += parseInt(columnIndex) === this.tableColumnNum ? 'border-right: none;' : '';
                if(this.borderColor) style += `border-color: ${this.borderColor};`;
                if(this.cellFontSize) style += `font-size: ${this.cellFontSize};`;
                if(this.cellNewFontColorKey) {
                    style += `color: ${row[this.cellNewFontColorKey]};`;
                } else if(this.cellFontColor) style += `color: ${this.cellFontColor};`;
                if(this.cellHeight) style += `height: ${this.cellHeight}; padding: 0;`;
                if(rowIndex === this.dataArr.length - 1 && this.hideLastRowBorder) style += 'border-bottom: none;';

                return style
            },
            setDiyBorderColor() {
                if(this.borderColor) {
                    let empty_block = this.myTableComponents.$el.getElementsByClassName('el-table__empty-block')[0];
                    if(empty_block) {
                        if(!this.ifNotBorder && !this.ifNotRightBorder) empty_block.style.borderRight = `1px solid ${this.borderColor}`;
                        empty_block.style.borderColor = this.borderColor;
                    }
                    this.myTableComponents.$el.style.borderColor = this.borderColor;
                }
            },
            serialThStyle() {
                if(this.tableSelectionWidth && this.useOriginalSelection) {
                    let dom = this.myTableComponents.$el.getElementsByClassName('serialTh');
                    let selectionDom = this.myTableComponents.$el.getElementsByClassName('selectionStyle');
                    for(let i = 0; i < dom.length; i++) {
                        dom[i].children[0].style.paddingRight = '20px'
                    }
                    for(let i = 0; i < selectionDom.length; i++) {
                        selectionDom[i].style.borderRight = 'none';
                        selectionDom[i].children[0].style.paddingRight = 0;
                    }
                }
            },
            handleCurrentChange(val) {
                this.$emit('selectCurrentVal', val);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .myTable {
        position: relative;

        /deep/ .el-tooltip {
            &>div {
                overflow-x: hidden;
            }
        }
        /deep/ .el-table {
            overflow-y: unset;
            .gutter {
                border-top: 1px solid #FFFFFF;
            }
        }
        /deep/ .el-table .caret-wrapper {
            height: 14px;
            width: 0;
        }
        /deep/ .el-table .sort-caret.descending {
            bottom: 2px;
            border-bottom: 0;
        }
        /deep/ .el-table .sort-caret.ascending {
            top: 0;
            border-top: 0;
        }
        /deep/ .titleBorderStyle {
            border-right-width: 1px;
            border-right-style: solid;
            border-top-width: 1px;
            border-top-style: solid;
        }
        /deep/ table {
            font-size: 16px;
            .cellPadding26 {
                & > .cell {
                    padding-left: 26px;
                    padding-right: 26px;
                }
            }
            .cellPadding11 {
                & > .cell {
                    padding-left: 11px;
                    padding-right: 11px;
                }
            }
            .cellPadding0 {
                & > .cell {
                    padding-left: 0;
                    padding-right: 0;
                }
            }
            .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
                top: 0;
                bottom: 0;
                margin: auto;
            }
            .el-checkbox__inner {

                height: 20px;
                width: 20px;

                &::after {
                    border-width: 2px;
                    height: 10px;
                    width: 7px;
                }
            }
            .selectionStyle.notBorderBottom {
                border-bottom: none;
            }
            th.titleStyle {
                border-color: #FFFFFF;
               /* background-color: $tableHeaderBackground;*/
                color: #333333;
                font-weight: unset;
            }
            th.selectionStyle {
                border-right: none;
               /* background-color: $tableHeaderBackground !important;*/
                &>.cell {
                    padding-right: 0;
                }
            }
            td.titleStyle {
                color: #333333;
            }
            th.selectionStyle {
                border-color: #FFFFFF;
                background-color: #FFFFFF;
            }
            td.selectionStyle {
                padding-right: 13px;
            }
            td.textCenter{
                text-align: center;
            }
        }
        /deep/ .el-table--border {
            border-top: none;
        }
        /deep/ .el-table--group::after, /deep/ .el-table--border::after {
            width: 0;
        }
        /deep/ .el-table__empty-block {
            border-bottom: 1px solid #EBEEF5;
            min-height: unset;
        }
        /deep/ .el-table::before {
            height: 0;
        }
        .selectionDiv {
            border-width: 0;
            border-style: solid;
            height: 50px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 997;
            background-color: #FFFFFF;
        }
        /*解决Firefox选择框全选时会向左移动的问题*/
        /deep/ .selectionStyle .cell {
            overflow: unset;
        }
        /*&.useTrBgc1 /deep/ .el-table tr {
            background-color: $tableTrBackground1;
        }*/
        /*&.diyStripeColor /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
            background-color: $tableDiyStripeColor;
        }*/
    }
</style>
