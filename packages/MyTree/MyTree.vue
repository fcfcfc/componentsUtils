<template>
    <div class="myTree" :class="newClass"
         :style="{'width': width}">
        <el-tree ref="myTree"
                 :data="treeDataArr"
                 :indent="indent"
                 :highlight-current="true"
                 :props="defaultProps"
                 :default-expand-all="defaultExpandAll"
                 :expand-on-click-node="!notExpandOnClickNode"
                 :accordion="ifAccordion"
                 :default-checked-keys="checkedKeys"
                 node-key="id"
                 :default-expanded-keys="defaultExpandedKeys"
                 :draggable="draggable"
                 :allow-drop="allowDropFn"
                 :filter-node-method="filterNodeFn"
                 :show-checkbox="showCheckbox"
                 @node-expand="item=>nodeStatusChange(item)"
                 @check="handleCheckChange"
                 @node-drop="nodeDrop"
                 @node-click="handleNodeClick">
            <div class="el-tree-node__label" slot-scope="{ node, data }">
                <slot :childrenInfo="data" :childrenLevel="node.level" v-if="data.ifDIYContent1"/>
                <span v-else>{{ node.label }}</span>
            </div>
        </el-tree>
    </div>
</template>
<script>
    import { Tree } from "element-ui"
    export default {
        name: 'MyTree',
        components: {
            ElTree: Tree
        },
        props: {
            hideEmpty: {
                type: Boolean,
                default: false
            },
            showCheckbox: {
                type: Boolean,
                default: false
            },
            ifSetNoChildItemLeftTriangleNone: {
                type: Boolean,
                default: false
            },
            ifItemChangePaddingLeftToMarginLeft: {
                type: Boolean,
                default: false
            },
            ifAccordion: {
                type: Boolean,
                default: false
            },
            notExpandOnClickNode: {
                type: Boolean,
                default: false
            },
            defaultExpandAll: {
                type: Boolean,
                default: false
            },
            draggable: {
                type: Boolean,
                default: false
            },
            itemMarginRight: {
                type: String,
                default: '25px'
            },
            leftTrianglePadding: {
                type: String,
                default: '6px'
            },
            width: {
                type: String,
                default: ''
            },
            treeData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            defaultExpandedKeys: {
                type: Array,
                default: function () {
                    return []
                }
            },
            defaultCheckedKeys: {
                type: Array,
                default: function () {
                    return []
                }
            },
            changeStatusNameExceptFather: {
                type: Boolean,
                default: false
            },
            changeStatusNameArr: {
                type: Array,
                default: function () {
                    return []
                }
            },
            diyFilterFn: {
                type: Function,
                default: function (val, data) {
                    if(!val) return true;
                    return data[this.defaultProps.label].indexOf(val) !== -1
                }
            },
            defaultProps: {
                type: Object,
                default: function () {
                    return {
                        label: 'label',
                        children: 'children'
                    }
                }
            },
            indent: {
                type: Number,
                default: 0
            },
            childCheckboxMarginLeft: {
                type: Number,
                default: 0
            },
            itemChildExtraPaddingLeft: {
                type: Number,
                default: 15
            },
            borderColor: {
                type: String,
                default: ''
            },
            fontColor: {
                type: String,
                default: '#333333'
            },
            fontSize: {
                type: String,
                default: '16px'
            },
            itemsHeight: {
                type: String,
                default: '45px'
            },
            itemMarginLeft: {
                type: String,
                default: '15px'
            },
            itemPaddingLeft: {
                type: Number,
                default: 0
            },
            notBorderLeft: {
                type: Boolean,
                default: false
            },
            notBorderRight: {
                type: Boolean,
                default: false
            },
            notBorderBottom: {
                type: Boolean,
                default: false
            },
            notTriangle: {
                type: Boolean,
                default: false
            },
            showLeftTriangle: {
                type: Boolean,
                default: false
            },
            useRowReverse: {
                type: Boolean,
                default: false
            },
            itemsHoverBgc: {
                type: String,
                default: ''
            },
            activeItemFontColor: {
                type: String,
                default: ''
            },
            activeItemBgColor: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                treeDataArr: this.treeData,
                checkedKeys: this.defaultCheckedKeys
            }
        },
        computed: {
            newClass() {
                let itemsHoverBgc = (this.itemsHoverBgc || '').replace(/#/g, '');
                let activeItemFontColor = (this.activeItemFontColor || '').replace(/#/g, '');
                let activeItemBgColor = (this.activeItemBgColor || '').replace(/#/g, '');
                if(itemsHoverBgc) itemsHoverBgc = 'a_' + itemsHoverBgc;
                if(activeItemFontColor) activeItemFontColor = 'b_' + activeItemFontColor;
                if(activeItemBgColor) activeItemBgColor = 'c_' + activeItemBgColor;
                return ` ${activeItemBgColor} ${activeItemFontColor} ${itemsHoverBgc} ${this.notTriangle ? 'notTriangle': ''} ${this.showLeftTriangle ? 'showLeftTriangle': ''} ${this.hideEmpty ? 'hideEmpty': ''}`
            },
            myTreeDom() {
                return this.$refs.myTree.$children;
            }
        },
        mounted() {
            this.setOtherOptions();
            this.setCssRules()
        },
        watch: {
            treeData: {
                handler(val) {
                    this.treeDataArr = val;
                    this.$nextTick(() => this.setOtherOptions())
                },
                deep: true
            },
            defaultCheckedKeys: {
                handler(val) {
                    this.checkedKeys = val;
                },
                deep: true
            },
        },
        methods: {
            setCssRules() {
                let length = document.styleSheets.length;
                let itemsHoverBgc = (this.itemsHoverBgc || '').replace(/#/g, '');
                let activeItemFontColor = (this.activeItemFontColor || '').replace(/#/g, '');
                let activeItemBgColor = (this.activeItemBgColor || '').replace(/#/g, '');
                let itemsHoverBgcRule = '';
                let notTriangleRule = '';
                let activeItemFontColorRule = '';
                let activeItemBgColorRule = '';
                if(itemsHoverBgc) {
                    itemsHoverBgcRule = `.myTree.a_${itemsHoverBgc} .el-tree-node__content:hover`;
                }
                if(this.notTriangle) {
                    notTriangleRule = '.myTree.notTriangle .el-tree-node__label::after'
                }
                if(activeItemFontColor) {
                    activeItemFontColorRule = `.myTree.b_${activeItemFontColor} .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content .el-tree-node__label`;
                }
                if(activeItemBgColor) {
                    activeItemBgColorRule = `.myTree.c_${activeItemBgColor} .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content`;
                }
                document.styleSheets.forEach(item => {
                    //防止取到引用链接的样式，会跨域
                    if(!item.href) item.rules.forEach(rule => {
                        if(rule.selectorText === notTriangleRule) notTriangleRule = '';
                        if(rule.selectorText === itemsHoverBgcRule) itemsHoverBgcRule = '';
                        if(rule.selectorText === activeItemFontColorRule) activeItemFontColorRule = '';
                        if(rule.selectorText === activeItemBgColorRule) activeItemBgColorRule = '';
                    })
                })
                if(notTriangleRule) {
                    document.styleSheets[length - 1].addRule(notTriangleRule, 'display: none')
                }
                if(itemsHoverBgcRule) {
                    document.styleSheets[length - 1].addRule(itemsHoverBgcRule, `background-color: ${this.itemsHoverBgc}`)
                }
                if(activeItemFontColorRule) {
                    document.styleSheets[length - 1].addRule(activeItemFontColorRule, `color: ${this.activeItemFontColor} !important`)
                }
                if(activeItemBgColorRule) {
                    document.styleSheets[length - 1].addRule(activeItemBgColorRule, `background-color: ${this.activeItemBgColor}`)
                }
            },
            allowDropFn(draggingNode, dropNode, type) {
                let draggingNodeLevel = draggingNode.level;
                let dropNodeLevel = dropNode.level;
                let flag = false;
                if((draggingNodeLevel - dropNodeLevel === 1)
                    && type === 'inner'
                    && draggingNode.data[this.defaultProps.children].length === 0) flag = true;
                if(draggingNodeLevel === dropNodeLevel && type !== 'inner') flag = true;
                return flag;
            },
            nodeStatusChange(data) {
                if(this.changeStatusNameArr.length > 0) {
                    if((data.itemLevel === 1 && !this.changeStatusNameExceptFather) || data.itemLevel !== 1) this.setStatusById(this.treeDataArr, data.id);
                }
                this.$nextTick(() => this.setOtherOptions());
            },
            handleNodeClick(data, node) {
                let item = data;
                item.itemLevel = node.level;
                if(this.showCheckbox && !node.disabled) {
                    this.setChecked(data, !node.checked);
                    this.$nextTick(() => this.$emit('checkChange', this.$refs.myTree.getCheckedNodes()))
                }
                this.nodeStatusChange(item);
                this.$emit('lastNodeClick', item);
            },
            handleCheckChange(data, node) {
                this.$emit('checkChange', node.checkedNodes)
            },
            setStatusById(arr, id) {
                for (let i = 0; i < arr.length; i++) {
                    let childrenName = this.defaultProps.children;
                    for (let j = 0; j < this.changeStatusNameArr.length; j++) {
                        arr[i][this.changeStatusNameArr[j]] = false;
                    }
                    if(arr[i][childrenName].length > 0) {
                        this.setStatusById(arr[i][childrenName], id)
                    }
                    if(arr[i].id === id) {
                        for (let k = 0; k < this.changeStatusNameArr.length; k++) {
                            arr[i][this.changeStatusNameArr[k]] = true;
                        }
                    }
                }
            },
            /**
             * 设置子元素的paddingLeft和有选择框时的选择框margin-left
             * @param item
             * @param padding 额外的值
             * @param initPadding 每层默认比父节点多15px
             */
            setChildrenStyle(item, padding = 0, initPadding = this.itemChildExtraPaddingLeft) {
                if(item[0]) {
                    let styleName = this.ifItemChangePaddingLeftToMarginLeft ? 'marginLeft' : 'paddingLeft';
                    let arr = item[0].childNodes;
                    for (let i = 0; i < arr.length; i++) {
                        let newPadding = padding + initPadding;
                        let el_tree_node_children = arr[i].getElementsByClassName('el-tree-node__children');
                        if(el_tree_node_children[0]) {
                            arr[i].firstElementChild.style[styleName] = newPadding + 'px';
                            if(this.childCheckboxMarginLeft) arr[i].firstElementChild.getElementsByClassName('el-checkbox')[0].style.marginLeft = this.childCheckboxMarginLeft + 'px';
                            if(el_tree_node_children[0].childNodes.length > 0) {
                                this.setChildrenStyle(el_tree_node_children, newPadding);
                                if(this.showLeftTriangle) arr[i].firstElementChild.getElementsByClassName('el-icon-caret-right')[0].style.display = 'block';
                            } else {
                                if(this.showLeftTriangle) arr[i].firstElementChild.getElementsByClassName('el-icon-caret-right')[0].style.display = 'none';
                            }
                        } else {
                            arr[i].firstElementChild.style[styleName] = newPadding + 'px';
                            if(this.showLeftTriangle) arr[i].firstElementChild.getElementsByClassName('el-icon-caret-right')[0].style.display = 'none';
                            if(this.childCheckboxMarginLeft) arr[i].firstElementChild.getElementsByClassName('el-checkbox')[0].style.marginLeft = this.childCheckboxMarginLeft + 'px';
                        }
                    }
                }
            },
            setOtherOptions() {
                let myTreeDom = this.myTreeDom;

                if(this.borderColor
                    || this.fontColor
                    || this.itemsHeight
                    || this.notBorderLeft
                    || this.notBorderRight
                    || this.notBorderBottom
                    || this.fontSize
                    || this.itemMarginLef
                    || this.leftTrianglePadding
                    || this.itemChildExtraPaddingLeft
                    || this.itemMarginRight
                    || (this.itemPaddingLeft || this.itemPaddingLeft === 0)) myTreeDom.forEach(e => {
                    let el_tree_node_content = e.$el.getElementsByClassName('el-tree-node__content');
                    let el_tree_node_children = e.$el.getElementsByClassName('el-tree-node__children');
                    for (let i = 0; i < el_tree_node_content.length; i++) {
                        let label = el_tree_node_content[i].getElementsByClassName('el-tree-node__label')[0];
                        let leftTriangle = el_tree_node_content[i].getElementsByClassName('el-icon-caret-right')[0];
                        if(this.itemMarginRight) label.style.marginRight = this.itemMarginRight;
                        if(this.borderColor) el_tree_node_content[i].style.borderColor = this.borderColor;
                        if(this.leftTrianglePadding) leftTriangle.style.padding = this.leftTrianglePadding;
                        if(this.fontSize) {
                            leftTriangle.style.fontSize = this.fontSize;
                            label.style.fontSize = this.fontSize;
                        }
                        if(this.itemPaddingLeft || this.itemPaddingLeft === 0) el_tree_node_content[i].style.paddingLeft = this.itemPaddingLeft + 'px';
                        if(this.fontColor) label.style.color = this.fontColor;
                        if(this.itemsHeight) label.style.height = this.itemsHeight;
                        if(this.itemMarginLeft) label.style.marginLeft = this.itemMarginLeft;
                        if(this.notBorderLeft) el_tree_node_content[i].style.borderLeftWidth = 0;
                        if(this.notBorderRight) el_tree_node_content[i].style.borderRightWidth = 0;
                        if(this.notBorderBottom) el_tree_node_content[i].style.borderBottomWidth = 0;
                        if(this.useRowReverse) el_tree_node_content[i].style.flexDirection = 'row-reverse';
                    }
                    if(el_tree_node_children[0] && el_tree_node_children[0].childNodes.length > 0) {
                        this.setChildrenStyle(el_tree_node_children, this.itemPaddingLeft);
                        // if((this.itemPaddingLeft || this.itemMarginLeft === 0) || this.itemChildExtraPaddingLeft !== 15) this.setChildrenStyle(el_tree_node_children, this.itemPaddingLeft);
                    } else {
                        if(el_tree_node_content[0].getElementsByClassName('is-leaf').length > 0
                            && this.showLeftTriangle
                            && this.ifSetNoChildItemLeftTriangleNone) el_tree_node_content[0].getElementsByClassName('el-icon-caret-right')[0].style.display = 'none';
                    }
                })
            },
            //通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
            setCurrentNodeFn(node) {
                if(node) {
                    this.$refs.myTree.setCurrentNode(node);
                } else {
                    this.$refs.myTree.setCurrentKey(node)
                }
                if(node) this.$nextTick(() => this.nodeStatusChange(node));
            },
            filterNodeFn(val, data) {
                return this.diyFilterFn(val, data);
            },
            goToFilter(val) {
                this.$refs.myTree.filter(val);
                this.$nextTick(() => this.setOtherOptions());
            },
            appendChild(childData, fatherId) {
                this.$refs.myTree.append(childData, fatherId);
            },
            deleteItem(itemId) {
                this.$refs.myTree.remove(itemId);
            },
            getNode(itemId) {
                return this.$refs.myTree.getNode(itemId);
            },
            setChecked(id, checked, deep = false) {
                this.$refs.myTree.setChecked(id, checked, deep);
            },
            getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
                return this.$refs.myTree.getCheckedNodes(leafOnly, includeHalfChecked);
            },
            nodeDrop(current, to, position) {
                let currentObj = current.data;
                let toObj = to.data;
                this.$emit('nodeDropFn', {currentObj, toObj, position})
            },
            getNodeExpandedStatus(id) {
                return this.$refs.myTree.store.nodesMap[id].expanded
            },
            collapseAll() {
                let self = this;
                let treeList = this.treeDataArr;
                for (let i = 0; i < treeList.length; i++) {
                    self.$refs.myTree.store.nodesMap[treeList[i].id].expanded = false
                }
            },
            unFoldById(id) {
                this.$refs.myTree.store.nodesMap[id].expanded = true
            },
            unFoldAll() {
                let self = this;
                let treeList = this.treeDataArr;
                for (let i = 0; i < treeList.length; i++) {
                    self.$refs.myTree.store.nodesMap[treeList[i].id].expanded = true
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../css/mixins";
    @keyframes myRotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-90deg);
        }
    }
    .myTree {
        /deep/ .el-tree {
            background-color: unset;
        }
        /deep/ .el-tree-node:focus > .el-tree-node__content {
            background-color: #FFFFFF;
        }
        /deep/ .el-tree-node__content {
            @include myBorder(all, #EDEDED);
            border-top: none;
            height: auto;
            position: relative;
            &:hover{
                background-color: #f3f3f3;
            }

            .el-tree-node__expand-icon.is-leaf + .el-tree-node__label:after {
                display: none;
            }
            .expanded.el-tree-node__expand-icon + .el-tree-node__label:after {
                animation: myRotate 0.3s forwards 0s 1;
            }
            .el-tree-node__label {
                @include ellipsisByLineNumber(1);
                display: flex;
                align-items: center;
                width: 100%;
                &:after {
                    @include triangle(bottom, 6px, #999999);
                    @include absolute_center();
                    content: '';
                    right: 12px;
                    left: unset;
                }
            }
        }
        /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            padding-left: 15px;
            transition: background-color .5s linear;
            .el-tree-node__label{
                color: #FFFFFF !important; //不强制的话选中不会变成白色
            }
        }
        /deep/ .el-tree-node.is-drop-inner > .el-tree-node__content .el-tree-node__label {
            background-color: unset;
        }
        /deep/ .el-icon-caret-right{
            display: none;
        }
        /deep/ .is-leaf.el-tree-node__expand-icon {
            background: none;
        }
        &.showLeftTriangle /deep/ .el-icon-caret-right {
            display: unset;
        }
        &.hideEmpty /deep/ .el-tree__empty-block {
            display: none;
        }
    }
</style>
