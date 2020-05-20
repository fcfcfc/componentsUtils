<template>
    <div class="myTree" :class="{
            'notTriangle': notTriangle,
            'showLeftTriangle': showLeftTriangle,
            'diyItemsHoverBgc': useDiyItemsHoverBgc,
            'diyItemsHoverBgc2': useDiyItemsHoverBgc2,
            'diyItemsHoverBgc3': useDiyItemsHoverBgc3,
            'activeItemFontColorDiy1': activeItemFontColorDiy1,
            'activeItemFontColorDiy2': activeItemFontColorDiy2,
            'activeItemBgColorDiy1': activeItemBgColorDiy1,
            'activeItemBgColorDiy2': activeItemBgColorDiy2,
            'activeItemBgColorDiy3': activeItemBgColorDiy3,
            'itemMarginLeft': itemMarginLeft,
            'itemPaddingLeft': itemPaddingLeft,
            'hideEmpty': hideEmpty
        }"
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
    /**
     * vue.config.js中需要的配置（无）
     */
    /**
     * 依赖的组件（无）
     */
    /**
     * 该组件的配置项
     * $treeBackgroundColor:选中菜单时的背景颜色（主题色）
     * notExpandOnClickNode:是否禁用点击展开或者收缩，默认值为false
     * defaultExpandAll：是否默认展开所有节点，默认值为false
     * width:自定义宽度（带单位）
     * treeData:展示数据的数组
     1.其中可定义ifDIYContent1属性：自定义显示内容，对应的插槽为<template v-slot:default="slotProps">，slotProps.childrenInfo为对应当前节点中的数据，slotProps.childrenLevel为对应当前节点的层数，初始是1
     2.通过disabled设置禁用状态。
     </template>
     * defaultProps:可配置的选项对象:{
                                        label:自定义节点名的数据的key的名称，默认为label
                                        children:自定义子节数组的数据的key的名称，默认为children
                                    }
     * indent:相邻级节点间的水平缩进数值
     * borderColor:自定义边框颜色
     * fontColor:自定义字体颜色
     * fontSize:自定义字体大小，默认为16px
     * notBorderLeft:是否禁用左边框，默认值为false
     * notBorderRight:是否禁用右边框，默认值为false
     * notBorderBottom:是否禁用下边框，默认值为false
     * notTriangle:是否隐藏右边的指示展开/收缩的箭头，默认值为false
     * leftTrianglePadding:自定义左边的展开/收缩箭头的padding（带单位），默认为6px
     * showLeftTriangle:是否显示左边的展开/收缩箭头，默认值为false
     * ifSetNoChildItemLeftTriangleNone:在设置了显示左边的展开/收缩箭头时，是否将没有子节点的元素的箭头隐藏，默认不隐藏
     * useDiyItemsHoverBgc:是否使用自定义的鼠标滑过颜色，默认值为false
     * useDiyItemsHoverBgc2:是否使用自定义的鼠标滑过颜色（自定义的第二种），默认值为false
     * useDiyItemsHoverBgc3:是否使用自定义的鼠标滑过颜色（自定义的第三种），默认值为false
     * itemsHeight:节点的高度（带单位），默认为45px
     * activeItemFontColorDiy1:选中后自定义的字体颜色方案1
     * activeItemFontColorDiy2:选中后自定义的字体颜色方案2
     * activeItemBgColorDiy1:选中后自定义的背景颜色方案1
     * activeItemBgColorDiy2:选中后自定义的背景颜色方案2
     * activeItemBgColorDiy3:选中后自定义的背景颜色方案3
     * itemMarginLeft:节点的左边距（带单位），不包括左边展开/折叠按钮，默认为15px
     * itemPaddingLeft:节点的padding左边距，默认为0
     * itemChildExtraPaddingLeft:子节点比父节点多的paddingLeft值，默认为15
     * ifAccordion:手风琴模式，默认不开启
     * changeStatusNameArr:选中后要修改的字段的名称，选中后设置为true，否则为false，需设置id
     * changeStatusNameExceptFather:设置为true时，选中后要修改的字段的名称，不会去修改父级，默认为false
     * defaultExpandedKeys:要展开的节点的id数组
     * defaultCheckedKeys:默认勾选的节点的id数组
     * ifItemChangePaddingLeftToMarginLeft:改变子元素的padding错位成margin错位，默认为false
     * itemMarginRight:自定义节点的margin-right（带单位），默认值为25px
     * draggable:是否开启拖拽功能，默认不开启
     * showCheckbox:是否开启可选择框功能，默认不开启
     * childCheckboxMarginLeft:子节点的选择框的左边距，默认为0
     * diyFilterFn:自定义过滤条件，返回值true为不过滤，false过滤。默认为根据label过滤，空值不过滤
     * hideEmpty:没有内容时，是否隐藏‘暂无数据’的dom，默认不隐藏
     * useRowReverse:是否使使用反向显示布局，默认不使用（主要在有箭头图标和复选框时使用）
     */
    /**
     * 组件的监听方法
     * lastNodeClick:节点被点击时的回调，参数为传递给 treeData 属性的数组中该节点所对应的对象，其中itemLevel为当前节点的层数，初始为1
     * allowDropFn:拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
     * checkChange:节点选中状态发生变化时的回调，参数为选中的节点data数组
     * nodeDropFn:拖拽成功完成时触发的事件，参数为{拖拽的节点的data，放置位置节点的data，放置方式(before、after、inner)}
     */
    /**
     * 组件的方法
     * setCurrentNodeFn:通过传入节点，设置某个节点的当前选中状态
     * goToFilter:通过关键字过滤树节点(defaultProps参数中的label字段)，参数为关键字，为空时不过滤
     * appendChild:为 Tree 中的一个节点追加一个子节点，(data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node
     * deleteItem:删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性，(data) 要删除的节点的 data 或者 node
     * getNode:根据 data 或者 key 拿到 Tree 组件中的 node，(data) 要获得 node 的 key 或者 data
     * setChecked:通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性,(key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false
     * getCheckedNodes:若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组,(leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
     * collapseAll:全部折叠
     * unFoldAll:全部展开
     * unFoldById:根据id展开
     * getNodeExpandedStatus:获取指定id节点的展开/收起状态，true为展开
     */
    /**
     * 需要注意的事项
     * 1.treeData中必须有id属性
     * 2.节点被点击时，如果是父节点，会有300ms的展开/收缩动画
     */
    export default {
        name: 'Tree',
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
            useDiyItemsHoverBgc: {
                type: Boolean,
                default: false
            },
            useDiyItemsHoverBgc2: {
                type: Boolean,
                default: false
            },
            useDiyItemsHoverBgc3: {
                type: Boolean,
                default: false
            },
            activeItemFontColorDiy1: {
                type: Boolean,
                default: false
            },
            activeItemFontColorDiy2: {
                type: Boolean,
                default: false
            },
            activeItemBgColorDiy1: {
                type: Boolean,
                default: false
            },
            activeItemBgColorDiy2: {
                type: Boolean,
                default: false
            },
            activeItemBgColorDiy3: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                treeDataArr: this.treeData,
                checkedKeys: this.defaultCheckedKeys
            }
        },
        computed: {
            myTreeDom() {
                return this.$refs.myTree.$children;
            }
        },
        mounted() {
            this.setOtherOptions()
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

                if(this.notTriangle) {
                    document.styleSheets[0].addRule('.myTree.notTriangle .el-tree-node__label::after', 'display: none');
                }

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
            background-color: $treeBackgroundColor;
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
        &.diyItemsHoverBgc /deep/ .el-tree-node__content {
            &:hover {
                background-color: $treeHoverBackgroundColor;
            }
        }
        &.diyItemsHoverBgc2 /deep/ .el-tree-node__content {
            &:hover {
                background-color: $treeHoverBackgroundColor2;
            }
        }
        &.diyItemsHoverBgc3 /deep/ .el-tree-node__content {
            &:hover {
                background-color: $treeHoverBackgroundColor3;
            }
        }
        &.hideEmpty /deep/ .el-tree__empty-block {
            display: none;
        }
        &.activeItemFontColorDiy1 /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            .el-tree-node__label{
                color: $treeItemActiveFontColor1 !important;
            }
        }
        &.activeItemFontColorDiy2 /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            .el-tree-node__label{
                color: $treeItemActiveFontColor2 !important;
            }
        }
        &.activeItemBgColorDiy1 /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            background-color: $treeBackgroundColor1;
        }
        &.activeItemBgColorDiy2 /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            background-color: $treeBackgroundColor2;
        }
        &.activeItemBgColorDiy3 /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            background-color: $treeBackgroundColor3;
        }
    }
</style>